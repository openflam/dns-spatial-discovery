import math

import s2sphere as s2

from .config import CONFIG

# Table from http://s2geometry.io/resources/s2cell_statistics
# Dictionary from area (m^2) to resolution
area_to_resolution = {
    0.000093: 30,
    0.000371: 29,
    0.001485: 28,
    0.005939: 27,
    0.023756: 26,
    0.095023: 25,
    0.38: 24,
    1.52: 23,
    6.08: 22,
    24.33: 21,
    97.30: 20,
    389.21: 19,
    1556.86: 18,
    6227.43: 17,
    24909.73: 16,
    99638.93: 15,
    400000: 14,
    1590000: 13,
    6380000: 12,
    25510000: 11,
    102030000: 10,
    408120000: 9,
    1632450000: 8,
    6529090000: 7,
    26113300000: 6,
    104297910000: 5,
    413918150000: 4,
    1646455500000: 3,
    6026521160000: 2,
    21252753050000: 1,
}


def _get_level_from_error(error_m):
    error_area_m2 = math.pi * error_m**2
    areas = sorted(area_to_resolution.keys())
    level = None

    # Get the last level with area smaller than the error
    for area in areas:
        if area <= error_area_m2:
            level = area_to_resolution[area]
        else:
            break

    if level is None:
        level = 30
    return level


def get_s2cell_id(latitude, longitude, level):
    latlng = s2.LatLng.from_degrees(latitude, longitude)
    cell = s2.CellId.from_lat_lng(latlng).parent(level)
    return cell


def digits_from_s2cell_id(cell):
    bits = cell.id()
    level = cell.level()
    sub_bits = bits >> (61 - level * 2)

    base_domain_list = []
    for i in range(level):
        base_domain_list.append((sub_bits >> (2 * i)) & 0x3)

    base_domain_list.append(cell.face())
    return list(map(str, base_domain_list))


def get_base_geo_domain_digits(latitude, longitude, error_m):
    level = _get_level_from_error(error_m)
    cell = get_s2cell_id(latitude, longitude, level)
    return digits_from_s2cell_id(cell)


def _form_domains_from_digits(domain_digits, suffix):
    return ".".join([str(d) for d in domain_digits]) + "." + suffix


def get_geo_domains(lat, lon, error_m, suffix=CONFIG["GEO_DOMAIN_SUFFIX"]):
    """
    Convert a location to a geo domains based on s2 cell ID.

    Parameters
    ----------
    lat : float
        Latitude of the location.
    lon : float
        Longitude of the location.
    error_m : float
        Error of the address in meters.
    """
    base_geo_domain_digits = get_base_geo_domain_digits(lat, lon, error_m)
    geo_domains = []

    # Add sibling domains
    for i in range(4):
        sub_domain_digits = base_geo_domain_digits[1:]
        sub_domain_digits.insert(0, i)
        geo_domains.append(_form_domains_from_digits(sub_domain_digits, suffix))

    # Add parent domains
    for i in range(1, len(base_geo_domain_digits)):
        sub_domain_digits = base_geo_domain_digits[i:]
        geo_domains.append(_form_domains_from_digits(sub_domain_digits, suffix))

    return geo_domains

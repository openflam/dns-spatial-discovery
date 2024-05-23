import s2sphere as s2

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
    85011012190000: 0
}

# Convert the table to a dictionary from radius to resolution
radius_to_resolution = {
    (area / 3.1415)**(1/2): area_to_resolution[area] for area in area_to_resolution
}


def _get_resolution_from_accuracy(accuracy_m):
    for radius in sorted(radius_to_resolution.keys()):
        if radius > accuracy_m:
            return radius_to_resolution[radius]
    return 0


def get_s2cell_id(latitude, longitude, level):
    latlng = s2.LatLng.from_degrees(latitude, longitude)
    cell = s2.CellId.from_lat_lng(latlng).parent(level)
    return cell


def get_address_from_s2cell_id(cell, suffix):
    # http://s2geometry.io/devguide/s2cell_hierarchy
    bits = cell.id()
    level = cell.level()
    sub_bits = bits >> (61 - level * 2)

    addr = ""
    for i in range(level):
        addr = addr + str((sub_bits >> (2 * i)) & 0x3) + "."

    addr += str(cell.face()) + "." + suffix
    return addr


def loc_to_addr(lat, lon, accuracy_m, suffix="loc"):
    """
    Convert a location to an s2 address.

    Parameters
    ----------
    lat : float
        Latitude of the location.
    lon : float
        Longitude of the location.
    accuracy_m : float
        Accuracy of the address in meters.
    """
    resolution = _get_resolution_from_accuracy(accuracy_m)
    answer = {}

    # Add 'parent' addresses
    answer["parent"] = []
    for res in range(0, resolution + 1):
        cell = get_s2cell_id(lat, lon, res)
        answer["parent"].append(get_address_from_s2cell_id(cell, suffix))

    # Add 'child' addresses
    this_res_s2 = get_s2cell_id(lat, lon, resolution)
    parent = get_address_from_s2cell_id(this_res_s2, suffix)
    answer["children"] = []
    for i in range(4):
        child = str(i) + "." + parent
        answer["children"].append(child)

    return answer

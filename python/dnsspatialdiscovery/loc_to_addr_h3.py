import h3.api.numpy_int as h3


# Table from https://h3geo.org/docs/core-library/restable
# Dictionary from area (m^2) to resolution
area_to_resolution = {
    0.895: 15,
    6.267: 14,
    43.870: 13,
    307.092: 12,
    2149.643: 11,
    15047.502: 10,
    105332.513: 9,
    737327.598: 8,
    5161293.360: 7,
    36129062.164: 6,
    252903858.182: 5,
    1770347654.491: 4,
    12393434655.088: 3,
    86801780398.997: 2,
    609788441794.134: 1,
    4357449416078.392: 0
}

# Convert the table to a dictionary from radius to resolution
radius_to_resolution = {
    (area / 3.1415)**(1/2): area_to_resolution[area] for area in area_to_resolution
}

# Bit layout from https://h3geo.org/docs/library/index/cell
# Mapping from component to start and end indices of the bit index
components_info = {
    "reserved1": (63, 63),
    "mode": (62, 59),
    "reserved2": (58, 56),
    "resolution": (55, 52),
    "base_cell": (51, 45),
}


def _get_resolution_from_accuracy(accuracy_m):
    for radius in sorted(radius_to_resolution.keys()):
        if radius > accuracy_m:
            return radius_to_resolution[radius]
    return 0

def _get_mask(start, end):
    """Given start and end positions of 1s, returns a mask that can be used to extract those
    bits from a number
    """
    num_ones = (end - start) + 1
    result = 2**num_ones - 1
    return (result << start)

def _mask_num(num, start, end):
    """Extract binary bits between start and end from num
    """
    mask = _get_mask(start, end)
    return (num & mask) >> start


for res in range(1, 16):
    start = 44 - (res-1) * 3
    components_info[f"res_{res}"] = (start, start - 2)

def get_h3_components(h3_index):
    components = {}
    for comp in components_info:
        end, start = components_info[comp]
        components[comp] = _mask_num(h3_index, start, end)
    return components

def get_address_from_components(components, suffix):
    address = ""
    for i in range(15, 0, -1):
        this_res_val = components[f"res_{i}"]
        if this_res_val != 7:
            address += str(this_res_val) + "."
    address += str(components["base_cell"]) + "."
    address += suffix
    return address

def _loc_to_addr_res(lat, lon, resolution, suffix):
    h3_index = h3.latlng_to_cell(lat, lon, resolution)
    components = get_h3_components(h3_index)
    return get_address_from_components(components, suffix)

        
def loc_to_addr(lat, lon, accuracy_m, suffix="loc"):
    """
    Convert a location to an H3 address.
    
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
    for res in range(0, resolution+1):
        answer["parent"].append(_loc_to_addr_res(lat, lon, res, suffix))
    
    # Add 'child' addresses
    this_res_h3 = h3.latlng_to_cell(lat, lon, resolution)
    this_res_components = get_h3_components(this_res_h3)
    answer["children"] = []
    for i in range(7):
        this_res_components[f"res_{resolution + 1}"] = i
        answer["children"].append(
            get_address_from_components(this_res_components, suffix)
        )

    return answer

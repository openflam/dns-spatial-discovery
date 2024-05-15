from dnsspatialdiscovery.loc_to_addr_h3 import loc_to_addr
from dnsspatialdiscovery.dns_addr import addr_to_ip

def loc_to_ip(lat, lon, accuracy_m, suffix="loc"):
    """
    Convert a location to a list of IP address
    of localization servers.
    
    Parameters
    ----------
    lat : float
        Latitude of the location.
    lon : float
        Longitude of the location.
    accuracy_m : float
        Accuracy of the address in meters.
    """
    
    addr_list = loc_to_addr(lat, lon, accuracy_m, suffix)
    return addr_to_ip(addr_list)

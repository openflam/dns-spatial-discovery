import socket

def addr_to_ip(addr_list):
    """
    Convert a list of addresses to IP addresses.
    
    Parameters
    ----------
    addr_list : dict
        Dictionary with parent and child addresses.
    """
    ip_addresses = {}

    for key in addr_list:
        ip_addresses[key] = []
        for add in addr_list[key]:
            try:
                this_res = socket.getaddrinfo(add, 'https', proto=socket.IPPROTO_TCP)
                ip_addresses[key].append(this_res[0][4][0])
            except socket.gaierror as gaierror:
                ip_addresses[key].append(str(gaierror))
    
    return ip_addresses

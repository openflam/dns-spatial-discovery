from .config import CONFIG
from .dns import DNS
from .loc_to_geo_domains import get_geo_domains


class LocToServers:
    def __init__(self):
        self.dns = DNS()

    def loc_to_servers(self, lat, lon, error_m, suffix=CONFIG["GEO_DOMAIN_SUFFIX"]):
        geo_domains = get_geo_domains(lat, lon, error_m, suffix)
        server_addrs = []
        for domain in geo_domains:
            dns_answers = self.dns.dns_lookup(domain, "TXT")
            if dns_answers is not None:
                server_addrs.extend(dns_answers)
        return server_addrs

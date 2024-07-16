import socket

import dns.resolver


class DNS:
    """
    A class to perform DNS lookups.
    """

    def __init__(self):
        self.resolver = dns.resolver.Resolver()
        self.cache = dns.resolver.LRUCache()

        self.resolver.cache = self.cache

    def dns_lookup(self, address, type):
        """
        Perform a DNS lookup of a given address and record type.
        """
        answer_records = None
        try:
            answer_records = self.resolver.resolve(address, type)
            answer_records = [record.to_text().strip('"') for record in answer_records]
            return answer_records
        except Exception as e:
            return None

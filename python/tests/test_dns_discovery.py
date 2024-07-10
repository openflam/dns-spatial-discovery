import logging
import os
import sys
import traceback
import unittest

sys.path.append(os.path.dirname(os.path.realpath(__file__)) + "/../")

from dnsspatialdiscovery import loc_to_addr, loc_to_ip


class TestStringMethods(unittest.TestCase):
    def test_loc_to_addr(self):
        # Inputs
        lat, lng = 40.441784319811056, -79.94272013080297
        acc = 1
        suffix = "loc.arenaxr.org"

        # Expected outputs
        expected_output = {
            'children': ['0.3.0.1.1.2.2.1.0.0.0.1.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
                         '1.3.0.1.1.2.2.1.0.0.0.1.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
                         '2.3.0.1.1.2.2.1.0.0.0.1.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
                         '3.3.0.1.1.2.2.1.0.0.0.1.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org'],
            'parent': ['4.loc.arenaxr.org',
                       '1.4.loc.arenaxr.org',
                       '0.1.4.loc.arenaxr.org',
                       '0.0.1.4.loc.arenaxr.org',
                       '1.0.0.1.4.loc.arenaxr.org',
                       '2.1.0.0.1.4.loc.arenaxr.org',
                       '2.2.1.0.0.1.4.loc.arenaxr.org',
                       '1.2.2.1.0.0.1.4.loc.arenaxr.org',
                       '3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
                       '2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
                       '1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
                       '0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
                       '1.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
                       '0.1.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
                       '0.0.1.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
                       '0.0.0.1.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
                       '1.0.0.0.1.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
                       '2.1.0.0.0.1.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
                       '2.2.1.0.0.0.1.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
                       '1.2.2.1.0.0.0.1.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
                       '1.1.2.2.1.0.0.0.1.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
                       '0.1.1.2.2.1.0.0.0.1.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
                       '3.0.1.1.2.2.1.0.0.0.1.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org']
        }

        output = loc_to_addr(lat, lng, acc, suffix)
        self.assertEqual(output, expected_output)

    def test_loc_to_ip(self):
        # Inputs
        lat, lng = 40.441784319811056, -79.94272013080297
        acc = 1
        suffix = "loc.arenaxr.org"

        # Check if it raises an exception
        try:
            loc_to_ip(lat, lng, acc, suffix)
        except Exception as e:
            logging.error(traceback.format_exc())
            self.fail("test_loc_to_ip() raised exception")


if __name__ == "__main__":
    unittest.main()

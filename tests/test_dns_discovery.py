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
            "parent": [
                "21.loc.arenaxr.org",
                "2.21.loc.arenaxr.org",
                "0.2.21.loc.arenaxr.org",
                "4.0.2.21.loc.arenaxr.org",
                "3.4.0.2.21.loc.arenaxr.org",
                "4.3.4.0.2.21.loc.arenaxr.org",
                "6.4.3.4.0.2.21.loc.arenaxr.org",
                "1.6.4.3.4.0.2.21.loc.arenaxr.org",
                "3.1.6.4.3.4.0.2.21.loc.arenaxr.org",
                "6.3.1.6.4.3.4.0.2.21.loc.arenaxr.org",
                "1.6.3.1.6.4.3.4.0.2.21.loc.arenaxr.org",
                "6.1.6.3.1.6.4.3.4.0.2.21.loc.arenaxr.org",
                "1.6.1.6.3.1.6.4.3.4.0.2.21.loc.arenaxr.org",
                "4.1.6.1.6.3.1.6.4.3.4.0.2.21.loc.arenaxr.org",
                "5.4.1.6.1.6.3.1.6.4.3.4.0.2.21.loc.arenaxr.org",
            ],
            "children": [
                "0.5.4.1.6.1.6.3.1.6.4.3.4.0.2.21.loc.arenaxr.org",
                "1.5.4.1.6.1.6.3.1.6.4.3.4.0.2.21.loc.arenaxr.org",
                "2.5.4.1.6.1.6.3.1.6.4.3.4.0.2.21.loc.arenaxr.org",
                "3.5.4.1.6.1.6.3.1.6.4.3.4.0.2.21.loc.arenaxr.org",
                "4.5.4.1.6.1.6.3.1.6.4.3.4.0.2.21.loc.arenaxr.org",
                "5.5.4.1.6.1.6.3.1.6.4.3.4.0.2.21.loc.arenaxr.org",
                "6.5.4.1.6.1.6.3.1.6.4.3.4.0.2.21.loc.arenaxr.org",
            ],
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

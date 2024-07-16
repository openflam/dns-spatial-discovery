import os
import sys

import pytest

sys.path.append(os.path.dirname(os.path.realpath(__file__)) + "/../")

from dnsspatialdiscovery.loc_to_servers import LocToServers


class TestLocToServer:
    @pytest.fixture(scope="class")
    def loc_to_servers_obj(self):
        obj = LocToServers()
        return obj

    @pytest.mark.parametrize(
        "lat, lon, error_m, expected_server_addrs",
        [
            # fmt: off
            # Location 1 (CMU CIC Cubicles)
            (40.444034531976556, -79.94661290569255, 5,
                [
                    "arena.wiselambda4.andrew.cmu.edu.",
                    "cubicles.wiselambda4.andrew.cmu.edu.",
                ],
            ),
            # Location 2 (CMU CIC Arena)
            (40.44403547793949, -79.9466203369454, 5,
                [
                    "arena.wiselambda4.andrew.cmu.edu.",
                    "cubicles.wiselambda4.andrew.cmu.edu.",
                ],
            ),
            # fmt: on
        ],
    )
    def test_loc_to_servers(
        self, loc_to_servers_obj, lat, lon, error_m, expected_server_addrs
    ):
        server_addrs = loc_to_servers_obj.loc_to_servers(lat, lon, error_m)
        assert sorted(server_addrs) == sorted(expected_server_addrs)

import os
import sys

import pytest

sys.path.append(os.path.dirname(os.path.realpath(__file__)) + "/../")

from dnsspatialdiscovery import loc_to_geo_domains


# Test get_base_geo_domain_digits
@pytest.mark.parametrize(
    "lat, lon, error_m, expected_base_geo_domain",
    [
        # fmt: off
        # Base case
        (40.44, -79.94, 5, ['3', '2', '3', '1', '0', '2', '3', '3', '3', '0', '0', '1', '2', 
                            '3', '1', '2', '2', '1', '0', '0', '1', '4']),
        # Very small error
        (40.44, -79.94, 0.00001, ['2', '0', '0', '1', '0', '0', '2', '3', '2', '3', '2', '3', '1', '0',
            '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4']),
        # Very large error
        (40.44, -79.94, 123456789, ['1', '4'])
        # fmt: on
    ],
)
def test_get_base_geo_domain_digits(lat, lon, error_m, expected_base_geo_domain):
    base_geo_domain = loc_to_geo_domains.get_base_geo_domain_digits(lat, lon, error_m)
    assert base_geo_domain == expected_base_geo_domain


# Test get_geo_domains
def test_get_geo_domains():
    # Test with a small error
    lat = 40.44
    lon = -79.94
    error_m = 5
    geo_domains = loc_to_geo_domains.get_geo_domains(
        lat, lon, error_m, suffix="loc.arenaxr.org"
    )
    expected_geo_domains = [
        "0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
        "1.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
        "2.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
        "3.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
        "2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
        "3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
        "1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
        "0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
        "2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
        "3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
        "3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
        "3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
        "0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
        "0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
        "1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
        "2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
        "3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
        "1.2.2.1.0.0.1.4.loc.arenaxr.org",
        "2.2.1.0.0.1.4.loc.arenaxr.org",
        "2.1.0.0.1.4.loc.arenaxr.org",
        "1.0.0.1.4.loc.arenaxr.org",
        "0.0.1.4.loc.arenaxr.org",
        "0.1.4.loc.arenaxr.org",
        "1.4.loc.arenaxr.org",
        "4.loc.arenaxr.org",
    ]
    assert geo_domains == expected_geo_domains

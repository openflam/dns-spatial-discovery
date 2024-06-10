# DNS Spatial discovery

Uses the DNS to discover localization servers near a GPS location. The number of servers discovered depends on the accuracy of the location. Greater the accuracy fewer is the number of servers returned.

# Python

## Installation

Run the command to install s2sphere:
```
pip install s2sphere
```

## Usage

There are two APIs: 
1. `loc_to_addr`: Converts location to a list of addresseses of localization servers and 
2. `loc_to_ip`: Converts location to a list of IP addresses.

```
from dnsspatialdiscovery import loc_to_addr, loc_to_ip

lat, lng = 40.441784319811056, -79.94272013080297
acc = 1
suffix = "loc.arenaxr.org"

loc_to_addr(lat, lng, acc, suffix)
loc_to_ip(lat, lng, acc, suffix)
```

## Tests
Run tests with:
```
python -m tests.test_dns_discovery
```

# Javascript

## Run
```
cd js
node loc_to_addr_js.js
```
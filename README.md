# DNS Spatial discovery

Uses the DNS to discover localization servers near a GPS location. The number of servers discovered depends on the accuracy of the location. Greater the accuracy fewer is the number of servers returned.

# Installation

Run the command to install the pre-release version of h3:
```
pip install --pre h3
```

# Usage

There are two APIs: 
1. `loc_to_addr`: Converts location to a list of addresseses of localization servers and 
2. `loc_to_ip`: Converts location to a list of IP addresses.

```
lat, lng = 40.441784319811056, -79.94272013080297
acc = 1
suffix = "loc.arenaxr.org"
output = loc_to_addr(lat, lng, acc, suffix)
```
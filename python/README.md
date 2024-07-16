# Python DNS spatial discovery

## Dependencies

Run the command to install s2sphere:
```
pip install s2sphere
```

Install `pytest` to run tests: `pip install pytest`.


## Usage

```python
from dnsspatialdiscovery.loc_to_servers import LocToServers

latitude, longitude, error_m = 44.4, -79.9, 5
discovery_obj = LocToServers()
servers_list = discovery_obj.loc_to_servers(latitude, longitude, error_m)
```

## Tests
Run tests with by running the command `pytest` in the `python/` folder.

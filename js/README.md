# Javascript DNS spatial discovery

## Run
To use 'loc_to_addr' and 'loc_to_ip' in js, you need to follow this syntax:
```
var lat = 40.2574448;
var lng = -111.7089464;
var level = 15;

var addr_list = loc_to_addr(lat, lng, level);

loc_to_ip(lat,lng,level).then(
    res => console.log(res)
).catch(
    err => console.log(err)
)
```

## Tests
```
cd s2_js
python -m http.server 9500
```
Open http://0.0.0.0:9500 on the browser. Open the `test/` directory on the webpage. Open the browser console (eg. Ctrl + Shift + I on Chrome) to see the rest results.
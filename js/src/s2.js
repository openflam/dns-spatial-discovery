'use strict';

//Table from http://s2geometry.io/resources/s2cell_statistics
//Dictionary from area (m^2) to resolution
let area_to_resolution = {
    0.000093: 30,
    0.000371: 29,
    0.001485: 28,
    0.005939: 27,
    0.023756: 26,
    0.095023: 25,
    0.38: 24,
    1.52: 23,
    6.08: 22,
    24.33: 21,
    97.30: 20,
    389.21: 19,
    1556.86: 18,
    6227.43: 17,
    24909.73: 16,
    99638.93: 15,
    400000: 14,
    1590000: 13,
    6380000: 12,
    25510000: 11,
    102030000: 10,
    408120000: 9,
    1632450000: 8,
    6529090000: 7,
    26113300000: 6,
    104297910000: 5,
    413918150000: 4,
    1646455500000: 3,
    6026521160000: 2,
    21252753050000: 1,
    85011012190000: 0
};

let radius_to_resolution = {};

// convert the dictionary from radius to resolution
for (const item in area_to_resolution) {
    radius_to_resolution[(item / 3.1415) ** (1 / 2)] = area_to_resolution[item]
}

//get the level of resolution given the radius 
function _get_resolution_from_accuracy(accuracy_m) {
    let keys = [];

    //get all keys of the dictionary
    for (var str of (Object.keys(radius_to_resolution))) {
        keys.push(parseFloat(str))
    }

    //sort the keys and find the least radius and resolution
    var sorted_keys = keys.sort((a, b) => a - b)
    for (const radius of sorted_keys) {
        if (radius > accuracy_m) {
            return [radius_to_resolution[radius], radius]
        }
    }
    return [0, 0]
}

//get the key id for a location from Lat/Lng
function get_s2cell_key(lat, lng, level) {

    var key = S2.latLngToKey(lat, lng, level);
    // eg: '4/032212303102210'

    var parts = key.split('/');

    var face = parts[0];
    // '4'

    var position = parts[1];
    // '032212303102210'

    return [face, position];
}

// convert the hilbert curve quadtree id into dns address
// the quadtree id is unique per each face as it continuously subdivide the last face
// each digit is the number of four areas of the last level
// for example: 01 means the second area of the first area of this face
// hence we add the face level in the end to make it unique around the globe
// so the key '4/032212303102210' -> '0.3.2.2.1.2.3.0.3.1.0.2.2.1.0.4.suffix'
function get_adddress_from_s2cell_key(position, face, suffix) {
    var digits = position.toString();
    var split = digits.split('');
    var dotted = split.join('.');
    var result = dotted + '.' + face + '.' + suffix;

    return result
}

// get the child address for a quadtree key
function get_child_address(position, face, num, suffix) {
    var digits = position.toString();
    var split = digits.split('');
    var dotted = split.join('.');
    var result = dotted + '.' + num + '.' + face + '.' + suffix;

    return result
}


// convert a location to a S2 address
// Parameters:
// lat : float
//     Latitude of the location.
// lon : float
//     Longitude of the location.
// accuracy_m : float
//     Accuracy of the address in meters.
function loc_to_addr(lat, lon, accuracy_m, suffix = 'loc') {
    var [resolution, radius] = _get_resolution_from_accuracy(accuracy_m);
    var answer = {};

    //add all parent address
    answer['parent'] = [];
    for (let i = 1; i < resolution + 1; i++) {
        var [face, position] = get_s2cell_key(lat, lon, i);
        answer['parent'].push(get_adddress_from_s2cell_key(position, face, suffix))
    }

    //add four children address
    var [this_face, this_pos] = get_s2cell_key(lat, lon, resolution);
    var this_address = get_adddress_from_s2cell_key(this_pos, this_face, suffix);
    answer['children'] = [];
    for (let i = 0; i < 4; i++) {
        answer['children'].push(get_child_address(this_pos, this_face, i, suffix))
    }

    return answer
}




// async function to convert a list of dns addresses to ip addresses
async function addr_to_ip(addr_list) {
    const ip_addresses = {}

    for (const key in addr_list) {
        ip_addresses[key] = [];
        for (const add of addr_list[key]) {

            //use dns_lookup to get the ip address
            try {
                const result = await dns_lookup(add);
                ip_addresses[key].push(result)
            } catch (err) {
                ip_addresses[key].push(err.message)
            }
        }
    }
    return ip_addresses;
}

//convert a location to a list of ip addresses
// Parameters:
// lat : float
//     Latitude of the location.
// lon : float
//     Longitude of the location.
// accuracy_m : float
//     Accuracy of the address in meters.
async function loc_to_ip(lat, lon, accuracy_m, suffix = 'loc') {
    var addr_list = loc_to_addr(lat, lon, accuracy_m, suffix = 'loc')
    const result = await addr_to_ip(addr_list);
    return result
}

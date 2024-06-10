const dns = require('dns').promises
const loc_to_addr = require('./loc_to_addr_js')

//get all ip addresses of the addr_list
//addr_list: a list of all addresses
async function addr_to_ip(addr_list){
    const ip_addresses = {}

    for (const key in addr_list){
        ip_addresses[key] = [];
        for (const add of addr_list[key]){
            //use dns.lookup to get the ip address
            try {
                const result = await dns.lookup(add);
                ip_addresses[key].push(result.address)
            } catch (err){
                ip_addresses[key].push(err.message)
            }
        }
    }
    return ip_addresses;
}

//First we use loc_to_addr function to get all addresses of a given location
//Second we convert all those addresses into ip addresses
async function loc_to_ip(lat,lon,accuracy_m,suffix='loc'){
    var addr_list = loc_to_addr(lat,lon,accuracy_m,suffix='loc')
    const result = await addr_to_ip(addr_list);
    return result
}

//tests
loc_to_ip(32.715651, -117.160542,15).then(
    i => console.log(i)
).catch(
    err => console.log(err)
)

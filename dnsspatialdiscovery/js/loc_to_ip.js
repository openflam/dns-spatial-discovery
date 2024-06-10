const dns = require('dns').promises
const loc_to_addr = require('./loc_to_addr_js')

async function addr_to_ip(addr_list){
    const ip_addresses = {}

    for (const key in addr_list){
        ip_addresses[key] = [];
        for (const add of addr_list[key]){
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


async function loc_to_ip(lat,lon,accuracy_m,suffix='loc'){
    var addr_list = loc_to_addr(lat,lon,accuracy_m,suffix='loc')
    // const addrlist = {
    //     'parent1': ['google.com','nike.com'],
    //     'parent2': ['wikipedia.org']
    // }
    const result = await addr_to_ip(addrlist);
    return result
}

loc_to_ip(32.715651, -117.160542,15).then(
    i => console.log(i)
).catch(
    err => console.log(err)
)

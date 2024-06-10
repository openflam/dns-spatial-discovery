const s2 = require('@radarlabs/s2');

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

for (const item in area_to_resolution){
    radius_to_resolution[(item/3.1415)**(1/2)] = area_to_resolution[item]
}
// console.log(radius_to_resolution)

function _get_resolution_from_accuracy(accuracy_m){
    let keys = [];
    for (var str of (Object.keys(radius_to_resolution))){
        keys.push(parseFloat(str))
    }

    var sorted_keys = keys.sort((a,b)=>a-b)
    for (const radius of sorted_keys){
        if (radius > accuracy_m){
            return [radius_to_resolution[radius],radius]
        }
    }
    return [0,0]
}

function get_address_from_s2cell_id(cell, suffix){


    var bits = cell.id()
    var level = cell.level()
    var sub_bits = bits >> BigInt(61 - level * 2)

    var addr = ""
    for(let i=0; i<level; i++){
        addr = addr + (sub_bits >> BigInt((2 * i)) & BigInt(0x3)).toString() + "."
    }

    addr = addr + suffix
    // addr = addr + (cell.face()).toString + "." + suffix

    return addr
}

function get_all_parent(cells,current,degree){

    if(degree == -1){
        return cells
    }
    var parent = []
    for (var cell of current){
        parent.push(cell.parent())
    }
    cells = cells.concat(parent)
    return get_all_parent(cells,parent,degree-1)
}

function loc_to_addr(lat, lon, accuracy_m, suffix="loc"){
    
    var [resolution,radius] = _get_resolution_from_accuracy(accuracy_m)
    var s2LatLong = new s2.LatLng(lat,lon)
    
    const cellCoveringOptions = {min: resolution+1, max: resolution+1};
    const coveringCells = s2.RegionCoverer.getRadiusCovering(s2LatLong, radius, cellCoveringOptions);
    
    var children_ids = coveringCells.cellIds().map((cellId) => cellId.id())
    var children_cells = children_ids.map(c => new s2.CellId(c))
    console.log(children_cells)
    // children_cells.map(c => console.log(c.level()))
    // children_cells.map(c => console.log(c.parent().level()))

    parent = []
    for (var cell of children_cells){
        parent.push(cell.parent())
    }
    parent = get_all_parent(parent,parent,resolution)
    var parent_ids = parent.map(c => c.id())
    parent_ids = [...new Set(parent_ids)];
    var parent_cells = parent_ids.map(c => new s2.CellId(c))
    
    var answer = {}
    answer['children'] = []
    answer['parent'] = []
    
    for(var cell of children_cells){
        answer['children'].push(get_address_from_s2cell_id(cell,suffix))
    }
    for(var cell of parent_cells){
        answer['parent'].push(get_address_from_s2cell_id(cell,suffix))
    }
    // console.log(answer)
}

loc_to_addr(32.715651, -117.160542,15)

module.exports = loc_to_addr;

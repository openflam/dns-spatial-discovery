var lat = 40.2574448;
var lng = -111.7089464;
var level = 15;

function test_addr(){

    const res = loc_to_addr(lat, lng, level);
    const answer = {
        'parent': [
        "0.4.loc",
        "0.3.4.loc",
        "0.3.2.4.loc",
        "0.3.2.2.4.loc",
        "0.3.2.2.1.4.loc",
        "0.3.2.2.1.2.4.loc",
        "0.3.2.2.1.2.3.4.loc",
        "0.3.2.2.1.2.3.0.4.loc",
        "0.3.2.2.1.2.3.0.3.4.loc",
        "0.3.2.2.1.2.3.0.3.1.4.loc",
        "0.3.2.2.1.2.3.0.3.1.0.4.loc",
        "0.3.2.2.1.2.3.0.3.1.0.2.4.loc",
        "0.3.2.2.1.2.3.0.3.1.0.2.2.4.loc",
        "0.3.2.2.1.2.3.0.3.1.0.2.2.1.4.loc",
        "0.3.2.2.1.2.3.0.3.1.0.2.2.1.0.4.loc",
        "0.3.2.2.1.2.3.0.3.1.0.2.2.1.0.1.4.loc",
        "0.3.2.2.1.2.3.0.3.1.0.2.2.1.0.1.2.4.loc", 
        "0.3.2.2.1.2.3.0.3.1.0.2.2.1.0.1.2.2.4.loc"
        ],
        'children': [
        "0.3.2.2.1.2.3.0.3.1.0.2.2.1.0.1.2.2.0.4.loc",
        "0.3.2.2.1.2.3.0.3.1.0.2.2.1.0.1.2.2.1.4.loc",
        "0.3.2.2.1.2.3.0.3.1.0.2.2.1.0.1.2.2.2.4.loc",
        "0.3.2.2.1.2.3.0.3.1.0.2.2.1.0.1.2.2.3.4.loc"
        ]
    }

    if(JSON.stringify(res) != JSON.stringify(answer)){
        throw new Error("location to address tests failed");
    }

    console.log('location to address passed');
}

function test_ip(){
    loc_to_ip(lat,lng,level).then(
        console.log('location to ip tests passed')
    ).catch(
        err => console.log(err)
    )
}

function test(){
    
    test_addr();
    test_ip();
    
}

test()
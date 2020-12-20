
d3.json("/samples.json").then(function(data){
    console.log(data);
    var name = data.names;
    var metadata = data.metadata;
    var samples = data.samples;
    console.log(name);
})


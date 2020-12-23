
function makePage(){

    d3.json("static/js/samples.json").then((data) => {
        
        var names = data.names;
        var metadata = data.metadata;
        var samples = data.samples;
        
        //drop down menu
        var dropdown = document.getElementById("selDataset");
        for (var i = 0 ; i<names.length; ++i) {
            dropdown[dropdown.length] = new Option(names[i], names[i]);
        }

        d3.selectAll("#selDataset").on("change", getData);

        function getData() {
            var dropdownMenu = d3.select("#selDataset");
            var dataset = dropdownMenu.property("value");
            var index = names.indexOf(dataset);
            var sample_values = samples.map(object => object.sample_values);
            var otu_ids = samples.map(object => object.otu_ids);
            var otu_labels = samples.map(object => object.otu_labels);
            var sample_value = sample_values[index];
            var otu_id = otu_ids[index];
            var otujnumber = otu_ids[index];
            var otu_label = otu_labels[index];

            var mdata = metadata[index];
            mdata = [mdata];
            mdata = mdata[0];
            var space = d3.select(".panel-body");
            space.html("");
            space.append("li").text(`ID Number: ${mdata.id}`);
            space.append("li").text(`Age: ${mdata.age}`);
            space.append("li").text(`BBTYPE: ${mdata.bbtype}`);
            space.append("li").text(`Race: ${mdata.ethnicity}`);
            space.append("li").text(`Sex: ${mdata.gender}`);
            space.append("li").text(`Location: ${mdata.location}`);
            space.append("li").text(`WFREQ: ${mdata.wfreq}`);

            var mdata = metadata[index];
            mdata = [mdata];
            mdata = mdata[0];
            console.log(mdata);
            var space = d3.select(".panel-body");
            space.html("");
            space.append("li").text(`ID Number: ${mdata.id}`);
            space.append("li").text(`Age: ${mdata.age}`);
            space.append("li").text(`BBTYPE: ${mdata.bbtype}`);
            space.append("li").text(`Ethnicity: ${mdata.ethnicity}`);
            space.append("li").text(`Gender: ${mdata.gender}`);
            space.append("li").text(`Location: ${mdata.location}`);
            space.append("li").text(`WFREQ: ${mdata.wfreq}`);

            var list = [];
            for (var j=0; j < sample_value.length; j++)
            list.push({'otunumber': otu_id[j],
             'samplevalue': sample_value[j],
              'otuname': otu_label[j],
               'otujnumber' : otujnumber[j]
            });

            list = list.slice(0,10);

            for (var k = 0; k < list.length; k++) {
                otu_id[k] = list[k].otunumber;
                sample_value[k] = list[k].samplevalue;
                otu_label[k] = list[k].otuname; 
                otujnumber[k] = list[k].otujnumber;
            }

            var bubble = [{
                x: otujnumber,
                y: sample_value,
                text: otu_label,
                mode: 'markers', 
                marker: {
                    color: otujnumber,
                    sie: sample_value
                }
            }];

            var blayout = {
                title: 'Sample values',
                showlegend: false, 
                height: 600, 
                width: 1200, 
                xaxis: {title: 'OTU ID'},
                yaxis: {Title: 'Sample values'},
            }

            Plotly.newPlot('bubble', bubble, blayout);

            function createHbar() {
                for(var i=0; i<otu_id.length; i++){
                otu_id[i]="OTU" + otu_id[i];
                }

                var hbar = [{
                    x: sample_value.slice(0,10),
                    y: otu_id.slice(0,10),
                    type: 'bar',
                    text: otu_label.slice(0,10),
                    orientation: 'h',
                    transforms: [{
                        type: 'sort',
                        target: 'y',
                        order: 'descending'
                    }]

                }];

                var layout = {
                    xaxis: {title: 'Sample Value'},
                    yaxis: {title: 'OTU ID'},
                    title: 'Top 10 OTUs in an Individual',
                    height: 600,
                    width: 600
                };
                Plotly.newPlot("bar", hbar, layout);

            }
            createHbar();

        }

    })

};

makePage();
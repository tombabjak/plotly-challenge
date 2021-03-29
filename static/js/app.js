// Use the D3 library to read in samples.json.
function unpack(rows, index) {
    return rows.map(function(row) {
        return row[index];
    });
};

function init() {

    jsonFile = "data/samples.json"
    d3.json(jsonFile).then(function(data) {
        
        var sample_values = unpack(data.samples, `sample_values`);
        var otu_ids = unpack(data.samples, `otu_ids`);
        var otu_labels = unpack(data.samples, `otu_labels`);

        var valuesTop10 = [];
        var idsTop10 = [];
        var labelsTop10 = [];

        for (var i = 0; i < 153; i++) {
            valuesTop10.push(sample_values[i].slice(0,10).reverse());
            idsTop10.push(otu_ids[i].slice(0,10).reverse().toString().split(`,`).map(id => 'OTU ' + id));
            labelsTop10.push(otu_labels[i].slice(0,10).reverse());
        };
        
        // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
        var trace1 = {
            type: `bar`,
            orientation: `h`,
            hovertext: labelsTop10[0],
            x: valuesTop10[0],
            y: idsTop10[0]
        };

        var data1 = [trace1];

        var layout1 = {
            showlegend: false
        };
    
        Plotly.newPlot("bar", data1, layout1, {responsive: true});

        // Create a bubble chart that displays each sample.
        var trace2 = {
            mode: 'markers',
            text: otu_labels[0],
            x: otu_ids[0],
            y: sample_values[0],
            marker: {
                color: otu_ids[0],
                size: sample_values[0]
            }
        };

        var data2 = [trace2];

        var layout2 = {
            showlegend: false,
            xaxis: {
                title: "OTU ID"
            }
        };
    
        Plotly.newPlot("bubble", data2, layout2, {responsive: true});

        // Display the sample metadata, i.e., an individual's demographic information.
        // Display each key-value pair from the metadata JSON object somewhere on the page.
        function demoInfo() {

            jsonFile = "data/samples.json"
            d3.json(jsonFile).then(function(data) {
        
                var age = unpack(data.metadata, `age`);
                var bbtype = unpack(data.metadata, `bbtype`);
                var ethnicity = unpack(data.metadata, `ethnicity`);
                var gender = unpack(data.metadata, `gender`);
                var id = unpack(data.metadata, `id`);
                var location = unpack(data.metadata, `location`);
                var wfreq = unpack(data.metadata, `wfreq`);
        
                var select = document.getElementById("selDataset");
                for (var i = 0; i < 153; i++) {
                    var opt = id[i];
                    var el = document.createElement("option");
                    el.textContent = opt;
                    el.value = opt;
                    select.appendChild(el);
                }  
        
                var demoList = d3.select("#sample-metadata");
                
                demoList.append("p").text(`ID: ` + id[0]);
                demoList.append("p").text(`Age: ` + age[0]);
                demoList.append("p").text(`Ethnicity: ` + ethnicity[0]);
                demoList.append("p").text(`Gender: ` + gender[0]);
                demoList.append("p").text(`Location: ` + location[0]);
                demoList.append("p").text(`bbtype: ` + bbtype[0]);
                demoList.append("p").text(`wfreq: ` + wfreq[0]);
            });
        };

        demoInfo();

    });
};

// Update all of the plots any time that a new sample is selected.
d3.selectAll("well").on("change", optionChanged);

function optionChanged() {

    jsonFile = "data/samples.json"
    d3.json(jsonFile).then(function(data) {

        var sample_values = unpack(data.samples, `sample_values`);
        var otu_ids = unpack(data.samples, `otu_ids`);
        var otu_labels = unpack(data.samples, `otu_labels`);
        var age = unpack(data.metadata, `age`);
        var bbtype = unpack(data.metadata, `bbtype`);
        var ethnicity = unpack(data.metadata, `ethnicity`);
        var gender = unpack(data.metadata, `gender`);
        var id = unpack(data.metadata, `id`);
        var location = unpack(data.metadata, `location`);
        var wfreq = unpack(data.metadata, `wfreq`);
        var valuesTop10 = [];
        var idsTop10 = [];
        var labelsTop10 = [];

        for (var i = 0; i < 153; i++) {
            valuesTop10.push(sample_values[i].slice(0,10).reverse());
            idsTop10.push(otu_ids[i].slice(0,10).reverse().toString().split(`,`).map(id => 'OTU ' + id));
            labelsTop10.push(otu_labels[i].slice(0,10).reverse());
        };

        var dropdownMenu = d3.selectAll("#selDataset");
        var dataset = dropdownMenu.property("value");
        var demoList = d3.select("#sample-metadata");
    
        var text1 = [];
        var x1 = [];
        var y1 = [];
        var text2 = [];
        var x2 = [];
        var y2 = [];
        var color = [];
        var size = [];
        var wfreq1 = [];

        for (var i = 0; i < 153; i++) {
            if (parseInt(dataset) === id[i]) {
                console.log(`ID: ` + id[i]);
                console.log(`Age: ` + age[i]);
                console.log(`Ethnicity: ` + ethnicity[i]);
                console.log(`Gender: ` + gender[i]);
                console.log(`Location: ` + location[i]);
                console.log(`bbtype: ` + bbtype[i]);
                console.log(`wfreq: ` + wfreq[i]);
                console.log(`====================`);

                text1 = labelsTop10[i],
                x1 = valuesTop10[i];
                y1 = idsTop10[i];
                text2 = otu_labels[i],
                x2 =  otu_ids[i];
                y2 = sample_values[i];
                color = otu_ids[i];
                size = sample_values[i];
                wfreq1 = wfreq[i];

                demoList.selectAll("p").remove();
                demoList.append("p").text(`ID: ` + id[i]);
                demoList.append("p").text(`Age: ` + age[i]);
                demoList.append("p").text(`Ethnicity: ` + ethnicity[i]);
                demoList.append("p").text(`Gender: ` + gender[i]);
                demoList.append("p").text(`Location: ` + location[i]);
                demoList.append("p").text(`bbtype: ` + bbtype[i]);
                demoList.append("p").text(`wfreq: ` + wfreq[i]);
            } else if (dataset === 'Choose an ID') {
                demoList.selectAll("p").remove();
            };
        };

        Plotly.restyle("bar", "hovertext", [text1]);
        Plotly.restyle("bar", "x", [x1]);
        Plotly.restyle("bar", "y", [y1]);
        Plotly.restyle("bubble", "text", [text2]);
        Plotly.restyle("bubble", "x", [x2]);
        Plotly.restyle("bubble", "y", [y2]);
        Plotly.restyle("bubble", "marker.color", [color]);
        Plotly.restyle("bubble", "marker.size", [size]);
        Plotly.restyle("gauge", "value", [wfreq1]);
    });
};

init();










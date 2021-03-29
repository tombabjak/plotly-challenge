// Use the D3 library to read in samples.json.
function unpack(rows, index) {
    return rows.map(function(row) {
        return row[index];
    });
};

function init() {
    
    jsonFile = "data/samples.json"
    d3.json(jsonFile).then(function(data) {

        console.log(data)

        var wfreq = unpack(data.metadata, `wfreq`);

        console.log(wfreq)

        var traceGauge = {
            type: "indicator",
            mode: "gauge+number",
            value: wfreq[0],
            gauge: {
                axis: { range: [null, 9] },
                steps: [
                  { range: [0, 1], color: "rgba(255, 255, 255, .5)"},
                  { range: [1, 2], color: "rgba(232, 226, 202, .5)"},
                  { range: [2, 3], color: "rgba(210, 206, 145, .5)"},
                  { range: [3, 4], color: "rgba(202, 209, 95, .5)"},
                  { range: [4, 5], color: "rgba(170, 202, 42, .5)"},
                  { range: [5, 6], color: "rgba(110, 154, 22, .5)"},
                  { range: [6, 7], color: "rgba(14, 127, 0, .5)"},
                  { range: [7, 8], color: "rgba(0, 85, 0, .5)"},
                  { range: [8, 9], color: "rgba(0, 40, 0, .5)"},
                ],
            },
        };
    
        var gaugeLayout = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
        };
    
        var dataGauge = [traceGauge]
    
        Plotly.plot('gauge', dataGauge, gaugeLayout)
    });
};

init();










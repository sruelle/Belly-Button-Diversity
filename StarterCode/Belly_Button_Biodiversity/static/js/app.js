function DrawBargraph(sampleId) {
    console.log(`Calling DrawBargraph(${sampleId})`);

    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }

        barArray = [barData];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, 1: 150 }
        };

        Plotly.newPlot("bar", barArray, barLayout);
    });
}
function DrawBubblechart(sampleId) {
    console.log(`Calling DrawBubblechart(${sampleId})`);

    d3.json("samples.json").then(data=>{
        var result = data.samples.filter(bu => bu.id == sampleId)[0];

        var bubbleLayout = {
            title: 'Bactera Cultures Per Sample',
            margin: { t: 0 },
            hovermode: 'closest',
            xaxis: { title: 'OTU ID'},
            margin: { t: 30 }
        };

        var bubbleData = [
            {
                x: result.otu_ids,
                y: result.sample_values,
                text: result.otu_labels,
                mode: 'markers',
                marker: {
                    size: result.sample_values,
                    color: result.otu_ids,
                    colorscale: 'Earth'
                }
            }
        ];

        Plotly.newPlot('bubble', bubbleData, bubbleLayout );
    })

}

function ShowMetadata(sampleId)
 {
    d3.json("samples.json").then(data => {
        var result = data.metadata.filter(md => md.id == sampleId)[0];
        var PANEL = d3.select("#sample-metadata");  

        PANEL.html("");
        Object.entries(result).forEach(([key, value])=>{
            PANEL
                .append("h6")
                .text(`${key.toUpperCase()}: ${value}`)
        });

        DrawGauge(result.wfreq);
   });
 }

function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);

    DrawBubblechart(newSampleId);
    DrawBargraph(newSampleId);
    DrawGauge(newSampleId);
    ShowMetadata(newSampleId);
}

function InitDashboard()
 {
    console.log("initlizing Dashboard");

    var selector = d3.select(`#selDataset`);

    d3.json("samples.json").then(data => {

        console.log(data);

        var sampleNames = data.names;

        sampleNames.forEach((sampleId) => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });

        var sampleId = sampleNames[0];

        DrawBargraph(sampleId)
        DrawBubblechart(sampleId);
        DrawGauge(sampleId);
        ShowMetadata(sampleId);
        
    });

}

InitDashboard();
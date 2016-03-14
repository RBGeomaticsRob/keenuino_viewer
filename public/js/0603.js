var client = new Keen({
  projectId: "56bf09e846f9a7051719101d",
  readKey: "ecd46b20792793a408d6c8e0c044d46273d35ea44fb7d8ab9aff94c84391d6c8302660a5a96d3db7a816191aea7eef281a91ac53b5d59722db8bbece0751b88d1cbdbf904a52b62f41050f6a82dbda6f65e092440ddd188346269ca072ed8336"
});

Keen.ready(function(){
  var readings = "readings";
  var interval = "minutely"
  var timeframe = {
      start: "2016-03-06T13:00:00.000Z",
      end: "2016-03-07T14:00:00.000Z"
    };

  // ----------------------------------------
  // Sample one
  // ----------------------------------------
  var templog_1_s0 = new Keen.Query("average", {
    eventCollection: readings,
    target_property: "s0",
    interval: interval,
    timeframe: timeframe,
    maxAge: 14400
  });
  var templog_1_s1 = new Keen.Query("average", {
    eventCollection: readings,
    target_property: "s1",
    interval: interval,
    timeframe: timeframe,
    maxAge: 14400
  });
  var templog_1_s2 = new Keen.Query("average", {
    eventCollection: readings,
    target_property: "s2",
    interval: interval,
    timeframe: timeframe,
    maxAge: 14400
  });
      var templog_1_s3 = new Keen.Query("average", {
    eventCollection: readings,
    target_property: "s3",
    interval: interval,
    timeframe: timeframe,
    maxAge: 14400
  });
  var templog_1_s4 = new Keen.Query("average", {
    eventCollection: readings,
    target_property: "s4",
    interval: interval,
    timeframe: timeframe,
    maxAge: 14400
  });

  var chart = new Keen.Dataviz()
  .el(document.getElementById("chart-1-large"))
  .chartType("linechart")
  .height(250)
  .colors(["#ff7f00","#e41a1c","#4daf4a","#984ea3","#377eb8"])
  .chartOptions({
    chartArea: {
        height: "85%",
        left: "5%",
        top: "5%",
        width: "85%"
      },
    vAxis: {
        viewWindow: {
          min: 10,
          max: 25
        }
      },
    isStacked: true
  })
  .prepare();

  client.run([templog_1_s0, templog_1_s1, templog_1_s2, templog_1_s3, templog_1_s4], function(err, res){

    var result1 = res[0].result
    var result2 = res[1].result
    var result3 = res[2].result
    var result4 = res[3].result
    var result5 = res[4].result
    var data = []
    var i=0
    var offset = 12

    while (i < result1.length) {

        data[i]={ // format the data so it can be charted
            timeframe: result1[i]["timeframe"],
            value: [
                { category: "External", result: result1[i]["value"] + offset},
                { category: "Top Panel", result: result2[i]["value"] + offset},
                { category: "AROS", result: result3[i]["value"] + offset},
                { category: "PSU", result: result4[i]["value"] + offset},
                { category: "Comms", result: result5[i]["value"] + offset}
            ]
        }
        if (i == result1.length-1) { // chart the data
        chart
          .parseRawData({ result: data })
          .render();
        }
        i++;
    }
  });

  var myChartOptions = {
      chartArea: {
        height: "80%",
        left: "5%",
        top: "5%",
        width: "100%"
      },
      vAxis: {
        viewWindow: {
          min: 0,
          max: 12
        },
        textPosition: 'none'
      },

      isStacked: true
    };

  client.draw(templog_1_s0, document.getElementById("chart-1-sm0"), {
    chartType: "linechart",
    title: false,
    height: 250,
    colors: ["#ff7f00"],
    width: "auto",
    chartOptions: myChartOptions
  });

  client.draw(templog_1_s1, document.getElementById("chart-1-sm1"), {
    chartType: "linechart",
    title: false,
    height: 250,
    colors: ["#e41a1c"],
    width: "auto",
    chartOptions: myChartOptions
  });

  client.draw(templog_1_s2, document.getElementById("chart-1-sm2"), {
    chartType: "linechart",
    title: false,
    height: 250,
    colors: ["#4daf4a"],
    width: "auto",
    chartOptions: myChartOptions
  });

  client.draw(templog_1_s3, document.getElementById("chart-1-sm3"), {
    chartType: "linechart",
    title: false,
    height: 250,
    colors: ["#984ea3"],
    width: "auto",
    chartOptions: myChartOptions
  });

  client.draw(templog_1_s4, document.getElementById("chart-1-sm4"), {
    chartType: "linechart",
    title: false,
    height: 250,
    colors: ["#377eb8"],
    width: "auto",
    chartOptions: myChartOptions
  });

});
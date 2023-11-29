$(document).ready(function() {
    $('#btnRunWeather').click(function() {
        $.ajax({
            url: "libs/php/getweather.php",
            type: 'POST',
            dataType: 'json',
            data: {
                north: $('#northInput').val(),
                south: $('#southInput').val(),
                east: $('#eastInput').val(),
                west: $('#westInput').val()
            },
            success: function(result) {
				
                console.log(JSON.stringify(result));
                const container = $('#resultBox');
                container.empty(); 

                if (result.status.name === "ok") {
                    const weatherObservations = result.data.weatherObservations;
                    if (Array.isArray(weatherObservations) && weatherObservations.length > 0) {
                        
                        weatherObservations.forEach((observation) => {
                            const weatherInfo = `<p>Location: ${observation.stationName}, Temperature: ${observation.temperature}, Description: ${observation.weatherCondition}</p>`;
                            container.append(weatherInfo);
                        });
                    } else {
                        $('#resultBox').html("No weather observations available");
                    }
                } else {
                    $('#resultBox').html("No valid weather data available");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Error:", textStatus, errorThrown);
                console.log(jqXHR.responseText);
                
            }
        });
    });



    $('#btnRunEarthquakes').click(function() {
        $.ajax({
            url: "libs/php/getEarthquakes.php",
            type: 'POST',
            dataType: 'json',
            data: {
                north: $('#north').val(),
                south: $('#south').val(),
                east: $('#east').val(),
                west: $('#west').val()
            },
            success: function(result) {
                console.log(result); 
                
                if (result.status.code === "200") {
                    const earthquakeData = result.data.earthquakes;
                    const container = $('#resultBox');

                    container.empty();

                    earthquakeData.forEach((earthquake) => {
                        const earthquakeInfo = `<p>Location: [${earthquake.lat}, ${earthquake.lng}], Magnitude: ${earthquake.magnitude}, Depth: ${earthquake.depth}</p>`;
                        container.append(earthquakeInfo);
                    });
                } else {
                    $('#resultBox').html("No earthquake data available");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Error:", textStatus, errorThrown);
                console.log(jqXHR.responseText);
                $('#resultBox').html("Error fetching earthquake data");
            }
        });
    });
});




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

               
    if (result.status.name === "ok" && result.data !== null) {
        const weatherObservations = result.data.weatherObservations;

        if (!Array.isArray(weatherObservations) || weatherObservations.length === 0) {
            $('#resultBox').html("No weather observations available");
        } else {
            weatherObservations.forEach((observation) => {
                const weatherInfo = `<p>Location: ${observation.stationName}, Temperature: ${observation.temperature}, Description: ${observation.weatherCondition}</p>`;
                container.append(weatherInfo);
            });
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
$('#btnRunStreetNames').click(function() {
    $.ajax({
        url: "libs/php/getStreetnames.php",
        type: 'POST',
        dataType: 'json',
        data: {
            q: $('#streetInput').val()
        },
        success: function(result) {
            console.log(JSON.stringify(result));
            const container = $('#resultBox');
            container.empty();

            if (result.status && result.status.name === "ok" && result.data && result.data.address) {
                const streetNames = result.data.address;

                if (streetNames === null) {
                        container.html("No street names available");
                    } else if (Array.isArray(streetNames) && streetNames.length > 0) {
                        streetNames.forEach((street) => {
                            const streetInfo = `<p>Street: ${street.street}, Country Code: ${street.countryCode}</p>`;
                            container.append(streetInfo);
                        });
                    } else {
                        container.html("Invalid street names data");
                    }
                } else {
                    container.html("No valid data available");
                }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus, errorThrown);
            console.log(jqXHR.responseText);
            $('#resultBox').html("Error fetching street names");
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
            const container = $('#resultBox');
            container.empty();

            if (result.status && result.status.code === "200" && result.data && result.data.earthquakes) {
                const earthquakeData = result.data.earthquakes;

                if (earthquakeData === null) {
                    container.html("No earthquake data available");
                } else if (Array.isArray(earthquakeData) && earthquakeData.length > 0) {
                    earthquakeData.forEach((earthquake) => {
                        const earthquakeInfo = `<p>Location: [${earthquake.lat}, ${earthquake.lng}], Magnitude: ${earthquake.magnitude}, Depth: ${earthquake.depth}</p>`;
                        container.append(earthquakeInfo);
                    });
                } else {
                    container.html("Invalid earthquake data");
                }
            } else {
                container.html("No valid earthquake data available");
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




var data;
var cityname;

function getWeatherAjax() {
	var options = $("#cities option:selected");
	cityname = options.text();

	var url = "http://192.16.201.97/MeetingApp/getweather.php";
	$.ajax({
		type : "post",
		url : url,
		dataType : "text",
		data : {"city":cityname},
		success : function(res) {
			showWeather(res);
		},
		error : function() {
			$("#console").html("Weather update could not be downloaded");
		}
	});
}

function showWeather(string) {
	if (window.JSON != undefined) {
		data = JSON.parse(string);
	} else {
		data = eval("(" + string + ")");
	}

	$("#weather-details").html("");

	var html = "";
	for (var i = 0; i < data.getWeatherResult.string.length; i++) {
		html += "<li>" + data.getWeatherResult.string[i] + "</li>";
	}

	$("#weather-details").html(html);

	$("#weather-details").listview('refresh');
}
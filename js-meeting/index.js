var data;

$(document).bind("mobileinit", function() {
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	// $.mobile.pushState = false;

	$("body").on("pageshow", "#sessions", function() {
		if (window.localStorage != undefined) {
			if (window.localStorage.getItem("data") != undefined && window.localStorage.getItem("data") != null) {
				showSessions(window.localStorage.getItem("data"));
				$("#console").html("Checking data update");
			} else {
				$("#console").html("Downloading session data...");
			}
		} else {
			$("#console").html("Downloading session data...");
		}

		loadSessionsAjax();
	});
});

function loadSessionsAjax() {
	var url = "http://192.16.201.97/MeetingApp/data.php";
	$.ajax({
		type : "post",
		url : url,
		dataType : "text",
		success : function(res) {
			showSessions(res);
		},
		error : function() {
			$("#console").html("Schedule update could not be downloaded");
		}
	});
}

var isFirstLoad = true;

function showSessions(string) {
	if (window.JSON != undefined) {
		data = JSON.parse(string);
	} else {
		data = eval("(" + string + ")");
	}

	if (window.localStorage != undefined) {
		window.localStorage.setItem("data", string);
	}

	$("#slots").html("");

	var html = "";
	for (var i = 0; i < data.slots.length; i++) {
		if (data.slots[i].message != null) {
			html += "<li data-role='list-divider' data-groupingtheme='e'>" + data.slots[i].time + ": " + data.slots[i].message + "</li>";
		} else {
			html += "<li><a href='javascript:showDetails(" + i + ")'>Sessions of " + data.slots[i].time + "</a></li>";
		}
	}

	$("#slots").html(html);

	$("#slots").listview('refresh');
}

function showDetails(index) {
	$("#details h1").html("Sessions of " + data.slots[index].time);
	var html = "";
	for (var i = 0; i < data.sessions.length; i++) {
		if (data.sessions[i].timeId == data.slots[index].id) {
			html += "<div data-role='collapsible'>";
			html += "<h3>" + data.sessions[i].title + "</h3>";
			html += "<h3>" + data.sessions[i].room + "</h3>";
			html += "<h4>Speaker/s: " + data.sessions[i].speaker;
			html += "</h4>";
			html += "<p>" + data.sessions[i].description + "</p>";
			html += "</div>";
		}
	}

	$("#sessionInfo").html(html);
	// $("#sessionInfo div").collapsible();

	$.mobile.changePage($("#details"));
}

function refresh() {
	$("#console").html("Meeting List");
	loadSessionsAjax();
}
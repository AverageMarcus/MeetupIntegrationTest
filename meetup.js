(function(){
	var groupId = "17778422";
	var apiParts = {
		base: "https://api.meetup.com/2/",
		groups: "groups",
		events: "events",
		baseQuery: "?format=json&group_id="+groupId+"&photo-host=public&page=20&sig_id=153356042&fields=",
		groupQuery: "&desc=false&order=id&sig=b5b8427e9bcc2d7fc16a5ffccfdd3ee9cf3cdaee",
		upcomingEventsQuery: "&desc=false&limited_events=False&order=time&status=upcoming&sig=7409fe5da89084fb358c689e0d7ae98894b46908",
		pastEventsQuery: "&limited_events=False&order=time&desc=true&status=past&sig=0b523c94134efcb38112a614a8e7ca68ed7a1930",
		offset: "&offset=", // Page number
	};
	var pastEvents = [],
		upcomingEvents = [],
		groupInfo = {};

	$.ajax({
	  url: apiParts.base + apiParts.groups + apiParts.baseQuery + apiParts.groupQuery,
        type: "GET",
        cache: false,
        dataType: "jsonp",
        crossDomain: true,
		success: function(data){
			groupInfo = data.results[0];
			populateGroupInfo();
		}
	});

	$.ajax({
	  url: apiParts.base + apiParts.events + apiParts.baseQuery + apiParts.upcomingEventsQuery + "&offset=0",
        type: "GET",
        cache: false,
        dataType: "jsonp",
        crossDomain: true,
		success: function(data){

			// Currently will only get the first 20
			upcomingEvents = data.results;
			populateUpcomingEvents();
		}
	});

	$.ajax({
	  url: apiParts.base + apiParts.events + apiParts.baseQuery + apiParts.pastEventsQuery + "&offset=0",
        type: "GET",
        cache: false,
        dataType: "jsonp",
        crossDomain: true,
		success: function(data){
			// Currently will only get the first 20
			pastEvents = data.results;
			populatePastEvents();
		}
	});

	function populateGroupInfo(){
		$('#Info p').html(
			'<b>Name:</b> ' + groupInfo.name + '<br/>' +
			'<b>Description:</b> ' + groupInfo.description + '<br/>' +
			'<b>Location:</b> ' + groupInfo.city + ', ' + groupInfo.country + '<br/>'
		);
	}
	function populateUpcomingEvents(){
		for(var i=0;i<upcomingEvents.length;i++){
			var ev = $('<li/>');
			ev.html('<a href="'+upcomingEvents[i].event_url+'">'+upcomingEvents[i].name+'</a>')
			$('#Upcoming ul').append(ev);
		}
	}
	function populatePastEvents(){
		for(var i=0;i<pastEvents.length;i++){
			var ev = $('<li/>');
			ev.html('<a href="'+pastEvents[i].event_url+'">'+pastEvents[i].name+'</a>')
			$('#Past ul').append(ev);
		}
	}

}());
function updateIcon() {
  if(status == "stop"){
  	status = "run";
  	chrome.browserAction.setIcon({path:"run.png"});
	if(localStorage.sites || localStorage.frequency){
		var sitelist = localStorage.sites.split(",");
		
		//处理频率, 最小频率为1分钟
		var frequency = parseInt(localStorage.frequency);
		if (frequency < 1) frequency = 1;

		var timerid = setInterval(function(){
			for (var i=0; i<=sitelist.length; i++){
				if(sitelist[i].length > 0){
					reqSite(sitelist[i].trim());
				}
			}
		}, frequency * 60 * 1000);

		timerlist.push(timerid);
	} else {
		alert("no sites defined.");
	}
  } else {
  	status = "stop";
    chrome.browserAction.setIcon({path:"stop.png"});
    for(var i=0; i<timerlist.length; i++){
    	clearInterval(timerlist[i]);
    }
    timerlist = [];
  }
}

function reqSite(url){
	var xhr = new XMLHttpRequest();

	//为地址添加http
	var site = "";
	if (url.indexOf('http://') == 0)
		site = url
	else
		site = 'http://' + url;

	xhr.open("GET", site, true);
	var start_time = new Date().getTime();
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
		var time = new Date().getTime() - start_time;
	    rulesAction(xhr, notify, site, time/1000.0);
	  }
	}
	xhr.send();
}

function notify(level, msg){
	var icon;
	if(level == "WARN"){
		icon = "warn.png";
	} else if(level == "ERROR"){
		icon = "error.png";
	} else {
		icon = "info.png";
	}
	new Notification(level, {
		icon: icon,
		body: msg
	});
}

//return {flag:"WARN",msg:"testtest"}
function rulesAction(xhr, notify, url, time){
	if (localStorage.rules)
	{
		return eval(localStorage.rules);
	} else {
		alert("no rules defined .");
	}
}

status = "stop";
timerlist = [];
chrome.browserAction.onClicked.addListener(updateIcon);
chrome.browserAction.setIcon({path:"stop.png"});
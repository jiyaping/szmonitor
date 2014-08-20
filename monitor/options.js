function load()  
{
	//default params
	if(! localStorage["frequency"]) localStorage["frequency"] = 3;
	if(! localStorage["sites"]) localStorage["sites"] = "example.com,example.com/index.html";
	if(! localStorage["rules"]) localStorage["rules"] = "if(xhr.status != 200) notify('ERROR',xhr.status);";

	if(localStorage["frequency"])
		$("#frequency").val(localStorage["frequency"]);

	if (localStorage["sites"])
		$("#sites").val(localStorage["sites"]);

	if (localStorage["rules"])
		$("#rules").val(localStorage["rules"]);

	$("#save_options").click(function(){
		if(window.localStorage) {
			localStorage["frequency"] = $("#frequency").val();
			localStorage["sites"] = $("#sites").val();
			localStorage["rules"] = $('#rules').val();
		} else {
			alert('please upgrade your browser to support local storage !');
		}
	});
}  
window.onload=load;
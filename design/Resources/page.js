$(document).ready(function() {
	//close all pages
	$(".Page").toggle();
	//open only the login page as default
	$("#login_page").toggle();
	var current_page = "#login_page";
	//register clicks on the 'area' links
	$('area').bind("click",function(){
		//close the current page
		$(current_page).toggle();
		//set a new current page based on the link clicked
		current_page = '#' + this.href.replace(/^#/, '').split('#')[1];
		//open it
		$(current_page).toggle();
	});
});
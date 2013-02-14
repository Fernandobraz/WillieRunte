$(document).ready(function(){
	$("li.dropdown").hover(
		function() {
			$("ul.nav_dropdown").stop().css({"display": "block"}, "normal");
		},
		function() {
			$("ul.nav_dropdown").stop().css({"display": "none"}, "normal");
		});
});
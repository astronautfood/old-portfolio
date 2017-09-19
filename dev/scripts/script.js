$(function() {
	
	var $hamburger = $(".hamburger");
		$hamburger.on("click", function(e) {
			$('header nav').toggleClass('overlay');
			$('nav .nav__items').toggleClass('show');
	});
});

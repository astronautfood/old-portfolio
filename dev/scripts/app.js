import anime from 'animejs'


console.log($('#animejs'));

anime({
		targets: "path",
		strokeDashoffset: [anime.setDashoffset, 0],
		easing: "easeInOutCubic",
		duration: 3000,
		begin: function(anim) {
			$('path').attr("stroke", "#03dac5");
				$('path').attr("fill", "none");

		}
	})

$(window).on('scroll', function(){
	if ( !$(document).scrollTop()){
	$('header').css({ 'background-color': '#000' });
		$(".header__list a").css({ color: '#03dac5' });
	$(".header__mobile-menu .bar").removeClass('colour-change');
		if($('body').hasClass('menu-open')) {
			$(".header__list a").css({ color: "#03dac5" });
		}
	} else {
		$("header").css({backgroundColor: 'rgba(3,218,197, 0.9)'});
		$(".header__list a").css({ color: '#000' });
		$(".header__mobile-menu .bar").addClass('colour-change');
		if($('body').hasClass('menu-open')) {
			$(".header__list a").css({ color: "#03dac5" });
		}
		if($('.header__mobile-menu').hasClass('active')) {
			$(".header__mobile-menu .bar").removeClass('colour-change');	
		}
	}
});

let isActive = false;

$('.header__mobile-menu').on('click', function () {
	if (isActive) {
		$(this).removeClass('active');
		$('body').removeClass('menu-open');
	} else {
		$(this).addClass('active');
		$('body').addClass('menu-open');

		if($('.header__list a').on('click', function(){
			$('.header__mobile-menu').removeClass("active");
			$("body").removeClass("menu-open");
		}));
	}

	if($('body').hasClass('menu-open')) {
		$(".header__list a").css({ color: '#03dac5' });
		$(".header__mobile-menu .bar").removeClass("colour-change");
	}

	isActive = !isActive;
});


	
	

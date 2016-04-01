$(function(){
	var introBox = new TimelineMax()
		.from(".right-line", .3, {height: 0}, 0)
		.from(".bottom-line", .3, {width: 0}, .3)
		.from(".left-line", .3, {height: 0}, 0)
		.from(".top-line", .3, {width: 0}, .3);

	setHeight();

	var controller = new ScrollMagic.Controller();

	var wipeAnimation = new TimelineMax()
			.fromTo("section.slide.intro", .5, {y: "0%"}, {y: "-120%"})
			.fromTo(".about-content", 1, {y: "120%"}, {y: "-100%"}, ".1")
			.fromTo(".parima-image", .5, {y: "20%"}, {y: "-30%", ease: Power2.easeInOut }, ".12")
			.fromTo("section.slide.about", .2, { opacity: 1}, {opacity: 0}, ".55")
			.fromTo(".philosophy-text", .5, {y: "100%"}, {y: "-60%"}, ".45")
			.fromTo(".philosophy-text", .5, {scale: 1, opacity: 1}, {scale: 0, opacity: 0}, ".95")
			.set("section.slide.work", {zIndex: 300}, "1" )
			.fromTo("section.slide.work", .2, {y: "100%"}, {y: "0%"}, "1")
			.set(".circular-container", {css: {className: "+=activated"}}, "1")
			.fromTo(".circular-container", 1, {rotation: 0}, {rotation: -123}, "1.3")

	var scrollMagicScene = new ScrollMagic.Scene({
            triggerElement: "#pin-container",
            triggerHook: "onLeave",
            duration: "1500%"
          })
          .setPin("#pin-container")
          .setTween(wipeAnimation)
          .addIndicators()
          .addTo(controller);

   scrollMagicScene.on("progress", function (e) {
   		if ($(".circular-container").hasClass("activated") ){  
	        var degree = $(".circular-container")[0]._gsTransform.rotation
	        var active_element = Math.floor( (degree +15) /30) * -1 ;
	    //      $(".rotating-object").removeClass("active").removeClass("coming");
	    //     var pos_degree = degree * -1
	    //     if(pos_degree%30 < 1 || pos_degree%30 > 29){
	    //     	var element_pos = Math.round(pos_degree/30);
	    //     	console.log(element_pos);
	    //     	$('.rotating-object').eq(element_pos).addClass("active");
	 			// wipeAnimation.paused(true)
	 			// setTimeout(turnOffPause, 500);
	    //     }
	        // else{
	        // 	$('.rotating-object').removeClass("active");
	        // }
	        setActiveElement(active_element); 
        }   
    });

   function turnOffPause() {
		wipeAnimation.paused(false);
	}



});

 var background_text = ["Cybersecurity", "Internet Of Things", "Automata Processor", "Startup", "Branding"];


function setActiveElement(active_element){
    $(".highlight-text").text(background_text[active_element]);
    $(".rotating-object").removeClass("active").removeClass("coming");
    $(".rotating-object").eq(active_element).addClass("active");
    $(".rotating-object").eq(active_element+1).addClass("coming");
    $(".rotating-object").eq(active_element-1).addClass("coming");
  }

function setHeight(){
		
		var nav_container = $(".circular-container");
	    var originY = 0; 
	    //set all the widths and heights for the correct things:
	    var container_left = (nav_container.width()/2) * -1;
		var window_height = $(window).height();
		var window_width = $(window).width();
		var circle_el_height = $(".rotating-object").height();
		var circle_el_width = $(".rotating-object").width(); 
		var rotating_height = window_height + (circle_el_height * 6);
		var radius = rotating_height/2; 
		var translate_left = (radius ) * -1;
		var translate_y = (radius/2) * -1 ;
		//heights for the rotating container
		nav_container.css({
			height: rotating_height,
			width: rotating_height,
			top: translate_y,
			left: translate_left,
		}); 
		//set_nav_container_transforms((radius * -1), 0);

		//get sizes from the navigational elements
		//heights for the internal circle
		$('.inside-circle').css({
			height: rotating_height - circle_el_width, 
			width: rotating_height - circle_el_width,
			margin: (radius- (circle_el_width/2)) * -1
		});


		//set the translations correctly for each of the navigational elements
		var object_orientation = 0; 
		$(".rotating-object").each(function(k,v){
		$(this).css(
		"-webkit-transform", "rotate("+ object_orientation+"deg) translate("+ radius+"px)" );
		object_orientation = object_orientation + 30; 
	});
}
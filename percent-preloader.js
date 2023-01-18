/*!
 * Percent-Preloader JS - v1
 * @author JDM Digital - https://jdmdigital.co
 * Copyright (c) 2022
 */
var counting = setInterval(function () {
	var loader = document.getElementById("percentage");
	var currval = parseInt(loader.innerHTML);
	var Width = 99 - currval;
	var loadscreen = document.getElementById("loader-progress");
	loader.innerHTML = ++currval;
	if (currval > 89){
		loader.innerHTML = 90;
		if(window.jQuery) {
			//console.log('jquery loaded');
			loader.innerHTML = 95;
			if(document.readyState == "interactive") {
				loader.innerHTML = 99;
			}
			if(document.readyState == "complete") {
				//console.log('fully loaded!');
				clearInterval(counting);
				loader.innerHTML = 100;
				
				setTimeout(function () {
					$("#percent").hide();
					loader.innerHTML = "Joyeux anniversaire Luce!";
					$(loader).prepend('<i class="fa-solid fa-gift m-0"></i><br/>');

					$(".percentage").css("opacity","1");
					$(loader).addClass("clickable");
					$(loader).click(function () {
						jQuery("body").toggleClass('page-loaded');
						startAudio();

						setTimeout(function() {
							jQuery('nav').css('visibility', 'visible')
							setTimeout(function () {
								startAnimation();
							}, 2000);
						}, 880);
					});

				}, 880);

				
			}
		}
	} 
	
	loadscreen.style.transition = "0.15s";
	loadscreen.style.width = Width + "%";
}, 20);
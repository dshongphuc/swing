import Hammer from 'hammerjs';
var gcySlider = {	
	Start: function(){
		var sliders = document.getElementsByClassName('slider-wrapper');
		var slider = sliders[sliders.length-1];

		//Register Hammer instance
	    var mc = new Hammer.Manager(slider, {
	      recognizers: [
	        [
	          Hammer.Pan,
	          {
	            threshold: 2
	          }
	        ]
	      ]
	    });		
		
		var navigation = slider.querySelector("#gcyNavigation");
		//Add class .active to first li if it not exist
		slider.getElementsByTagName('li')[0].classList.add('active')
		var activeSlide = slider.getElementsByClassName('active')[0]

		//Disable drag image on all image & add spans to navigation
		for(var i = 0; i < slider.getElementsByTagName('li').length; i++){
			slider.getElementsByTagName('img')[i].draggable = false;

			//add span to navigation :
			var span = document.createElement('span');
			navigation.appendChild(span)
		}

		//Add class .current to first span in nav
		navigation.getElementsByTagName('span')[0].classList.add('current')
		var activeNav = navigation.getElementsByClassName('current')[0]

		var isMouseDown = false;
		var touchUp = true;
		var pageY = 0;
		var YStart = 0;
		var allowDirection = false;

		slider.ontouchstart = function(e){
			YStart = e.touches[0].pageY;
		}

		/**
		 * Well, I don't want my slider work when user pan left or right, so I do this
		 */
	    mc.on('panstart', (event) => {
			if(event.additionalEvent == "panup" || event.additionalEvent == "pandown"){
				allowDirection = true
			}
		});
	    mc.on('panmove', (event) => {
			if(event.additionalEvent == "panleft" || event.additionalEvent == "panright"){
				allowDirection = false
			}
		});		


		slider.ontouchmove = function(e){
			if(e.touches[0].pageY <= pageY){
				touchUp = true;
			}else{
				touchUp = false;
			}
			
			pageY = e.touches[0].pageY;

			var distance = allowDirection ? pageY - YStart : 0;

			if(touchUp){
				if(!activeSlide.nextSibling){
					activeSlide.style.marginTop = ((distance > 25)?distance:-25)+"px";	
				}else{
					activeSlide.style.marginTop = distance+"px";
				}
			}else{
				if(!activeSlide.previousSibling){
					activeSlide.style.marginTop = ((distance < 25)?distance:25)+"px";	
				}else{
					//activeSlide.style.marginTop = distance+"px";
					activeSlide.previousSibling.style.marginTop = "-"+(activeSlide.clientHeight-distance)+"px";
				}				
			}

		}
		slider.ontouchend = function(e){
			pageY = activeSlide.clientHeight;//reset pageY
			allowDirection = false //reset allowDirection
			if(Math.abs(e.changedTouches[0].pageY - YStart) < 50){
				activeSlide.style.marginTop = 0;
				if(!touchUp){
					activeSlide.previousSibling.style.marginTop = "-"+activeSlide.clientHeight+"px";
				}
			}
			else if(touchUp){
				if(activeSlide.nextSibling){
					activeSlide.style.marginTop = "-"+activeSlide.clientHeight+"px";
					addActive("next");					
				}else{
					activeSlide.style.marginTop = 0;
				}

			}else{
				if(activeSlide.previousSibling){			
					activeSlide.previousSibling.style.marginTop = "0";
					activeSlide.style.marginTop = "0";
					addActive("previous");
				}else{
					activeSlide.style.marginTop = 0;
				}
			}
			
		}
		

		function addActive(direction){
			if(direction == "next"){
				//Change .active to next sibling
				activeSlide.nextSibling.setAttribute('class','active')
				activeSlide.setAttribute('class','')
				activeSlide = slider.getElementsByClassName('active')[0]

				//Change .current to next sibling
				activeNav.nextSibling.setAttribute('class','current')
				activeNav.setAttribute('class','')
				activeNav = navigation.getElementsByClassName('current')[0]			
			}else{
				//Change .active to previous sibling
				activeSlide.previousSibling.setAttribute('class','active')
				activeSlide.setAttribute('class','')
				activeSlide = slider.getElementsByClassName('active')[0]

				//Change .current to previous sibling
				activeNav.previousSibling.setAttribute('class','current')
				activeNav.setAttribute('class','')
				activeNav = navigation.getElementsByClassName('current')[0]	
			}
		}
	}
}
export default gcySlider;
		/*slider.onmousedown = function(e){
			isMouseDown = true;
			YStart = e.pageY;
		}
		slider.onmousemove = function(e){
			if(isMouseDown){
				if(e.pageY < pageY){
					touchUp = true;
				}else{
					touchUp = false;
				}
				pageY = e.pageY;
				if(touchUp){
					activeSlide.style.marginTop = (pageY - YStart)+"px";
				}else{
					activeSlide.style.marginTop = (pageY - YStart)+"px";
				}
			}
		}
		slider.onmouseup = function(){
			isMouseDown = false;
			
			if(touchUp){
				if(activeSlide.nextSibling.nextElementSibling != null){
					activeSlide.style.marginTop = "-"+activeSlide.clientHeight+"px";
					addActive("next");					
				}else{
					activeSlide.style.marginTop = 0;
				}

			}else{
				if(activeSlide.previousSibling.previousElementSibling != null){
					activeSlide.style.marginTop = "0";
					activeSlide.previousSibling.previousElementSibling.style.marginTop = "0";
					addActive("previous");
				}else{
					activeSlide.style.marginTop = 0;
				}
			}			
		}*/
import Hammer from 'hammerjs';
var gcySlider = {
	likedFunction: function(){
		var sliders = document.getElementsByClassName('slider-wrapper');
		var slider = sliders[sliders.length-1];
		var sliderListWrapper = slider.querySelector('#sliderListWrapper');// I mean the <ul>
		var likeIcon = document.getElementById('like-animation');
		var dislikeIcon = document.getElementById('dislike-animation');
		var sliderWidth = slider.clientWidth;
		var sliderHeight = slider.clientHeight;
		likeIcon.style.transition = "transform .7s";
		likeIcon.style.opacity = 1;
		likeIcon.style.transform = "translateY(-"+sliderHeight/2+"px) scale(15)";
		likeIcon.setAttribute('class','likedAnimation');
		setTimeout(function() {
			likeIcon.style.opacity = 0;
			likeIcon.style.transition = "unset";
			likeIcon.style.transform = "translateY(0) scale(1)";
			likeIcon.setAttribute('class','');
		},800)
	},
	dislikedFunction: function(){
		var sliders = document.getElementsByClassName('slider-wrapper');
		var slider = sliders[sliders.length-1];
		var sliderListWrapper = slider.querySelector('#sliderListWrapper');// I mean the <ul>
		var likeIcon = document.getElementById('like-animation');
		var dislikeIcon = document.getElementById('dislike-animation');
		var sliderWidth = slider.clientWidth;
		var sliderHeight = slider.clientHeight;
		dislikeIcon.style.transition = "transform 1s";
		dislikeIcon.style.opacity = 1;
		dislikeIcon.style.transform = "translateY(-"+sliderHeight/2+"px) scale(15)";
		dislikeIcon.setAttribute('class','likedAnimation');
		setTimeout(function() {
			dislikeIcon.style.opacity = 0;
			dislikeIcon.style.transition = "unset";
			dislikeIcon.style.transform = "translateY(0) scale(1)";
			dislikeIcon.setAttribute('class','');
		},1000)
	},
	Start: function(){
	try{
		var sliders = document.getElementsByClassName('slider-wrapper');
		var slider = sliders[sliders.length-1];
		var sliderListWrapper = slider.querySelector('#sliderListWrapper');// I mean the <ul>

		var likeIcon = document.getElementById('like-animation');
		var dislikeIcon = document.getElementById('dislike-animation');
		var sliderWidth = slider.clientWidth;
		var sliderHeight = slider.clientHeight;

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


	     var likedFunction = function likedFunction(){
			    		likeIcon.style.transition = "transform .2s";
			    		likeIcon.style.opacity = 1;
			    		likeIcon.style.transform = "translateY(-"+sliderHeight/2+"px) scale(15)";
			    		likeIcon.setAttribute('class','likedAnimation');
			    		setTimeout(() => {
			    			likeIcon.style.opacity = 0;
			    			likeIcon.style.transition = "unset";
			    			likeIcon.style.transform = "translateY(0) scale(1)";
			    			likeIcon.setAttribute('class','');
			    		},300)
	    }

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
		var currentPosition = 0;
		var currentSlider = 1;

		slider.ontouchstart = function(e){
			YStart = e.touches[0].pageY;
		}

		/**
		 * Well, I don't want my slider work when user pan left or right, so I do this
		 */
	    mc.on('panstart', function(event) {
			if(event.additionalEvent == "panup" || event.additionalEvent == "pandown"){
				allowDirection = true
			}
		});
	    mc.on('panmove', function(event) {
	    	if(!allowDirection){
				if(event.additionalEvent == "panleft" || event.additionalEvent == "panright"){
					var percentage = Math.abs(event.deltaX) / (sliderWidth/100);
					var distance = (sliderHeight/200)*percentage;
					var translateDistance = (distance > sliderHeight/2) ? sliderHeight/2 : distance;
					var scaleDistance = 1 + (percentage/50);
					if(event.deltaX > 0){
						likeIcon.style.opacity = (percentage/50);
						likeIcon.style.transform = "translateY(-"+translateDistance+"px) scale("+scaleDistance+")";
					}else{
					dislikeIcon.style.opacity = (percentage/50);
					dislikeIcon.style.transform = "translateY(-"+translateDistance+"px) scale("+scaleDistance+")";
					}
				}
	    	}
		});
	    mc.on('panend', function(event) {
	    	if(!allowDirection){
		    	if(event.deltaX > 0){
			    	if(event.deltaX < sliderWidth/100*45){
			    		likeIcon.style.opacity = 0;
			    		likeIcon.style.transform = "translateY(0) scale(1)";
			    	}else{
							likeIcon.style.transition = "transform .3s";
							likeIcon.style.opacity = 1;
							likeIcon.style.transform = "translateY(-"+sliderHeight/2+"px) scale(15)";
							likeIcon.setAttribute('class','likedAnimationShort');
							setTimeout(() => {
								likeIcon.style.opacity = 0;
								likeIcon.style.transition = "unset";
								likeIcon.style.transform = "translateY(0) scale(1)";
								likeIcon.setAttribute('class','');
							},400)
			    	}
		    	}else{
			    	if(Math.abs(event.deltaX) < sliderWidth/100*45){
			    		dislikeIcon.style.opacity = 0;
			    		dislikeIcon.style.transform = "translateY(0) scale(1)";
			    	}else{
			    		dislikeIcon.style.transition = "transform .2s";
			    		dislikeIcon.style.opacity = 1;
			    		dislikeIcon.style.transform = "translateY(-"+sliderHeight/2+"px) scale(15)";
			    		dislikeIcon.setAttribute('class','likedAnimationShort');
			    		setTimeout(() => {
			    			dislikeIcon.style.opacity = 0;
			    			dislikeIcon.style.transition = "unset";
			    			dislikeIcon.style.transform = "translateY(0) scale(1)";
			    			dislikeIcon.setAttribute('class','');
			    		},300)
			    	}
		    	}
	    	}
	    });

		slider.ontouchmove = function(e){
			if(allowDirection){
				if(e.touches[0].pageY <= pageY){
					touchUp = true;
				}else{
					touchUp = false;
				}
				pageY = e.touches[0].pageY;
				var distance = pageY - YStart;
				sliderListWrapper.style.transition = "none";
				if(touchUp){
					if(!activeSlide.nextSibling){
						sliderListWrapper.style.transform = "translateY("+(distance < -25 ? currentPosition-25 : currentPosition + distance)+"px)";
					}else{
						sliderListWrapper.style.transform = "translateY("+(currentPosition + distance)+"px)";
					}
				}else{
					if(!activeSlide.previousSibling){
						sliderListWrapper.style.transform = "translateY("+(distance > 25 ? 25 : currentPosition + distance)+"px)";
					}else{
						sliderListWrapper.style.transform = "translateY("+(currentPosition + distance)+"px)";
					}
				}
			}
		}
		slider.ontouchend = function(e){
			pageY = activeSlide.clientHeight;//reset pageY
			allowDirection = false //reset allowDirection
			sliderListWrapper.style.transition = "all .2s";
			if(Math.abs(e.changedTouches[0].pageY - YStart) < 50){
				sliderListWrapper.style.transform = "translateY("+currentPosition+"px)";
			}
			else if(touchUp){
				if(activeSlide.nextSibling){
					//activeSlide.style.marginTop = "-"+activeSlide.clientHeight+"px";
					addActive("next");
					currentPosition = -pageY*currentSlider;
					sliderListWrapper.style.transform = "translateY("+currentPosition+"px)";
					currentSlider++;
				}else{
					sliderListWrapper.style.transform = "translateY("+currentPosition+"px)";
				}

			}else{
				if(activeSlide.previousSibling){
					//activeSlide.previousSibling.style.marginTop = "0";
					//activeSlide.style.marginTop = "0";
					addActive("previous");
					currentPosition += pageY
					sliderListWrapper.style.transform = "translateY("+currentPosition+"px)";
					currentSlider--;
				}else{
					sliderListWrapper.style.transform = "translateY(0px)";
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

	}catch(error){}
	}

}

export default gcySlider;

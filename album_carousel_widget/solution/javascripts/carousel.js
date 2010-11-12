$(document).ready(function () {	

	//Configuration Album Gallery
	itemsToShow 	= 4;
	speed 			= 500; 
	carouselDiv 	= '#carousel';
	btnnext			= '.btnnext';
	btnprev			= '.btnprev';	
	carouselList 	= 'ul.carousel-group';
	
	
	totalItems 	= $(carouselDiv + ' ' + carouselList + '> li').length; 
	itemWidth 	= $(carouselDiv + ' ' + carouselList + '> li').outerWidth(true); 
	itemsHeight = $(carouselDiv + ' ' + carouselList + '> li').outerHeight(true); 		
	step 		= itemsToShow
	current 	= 0; 
				 
	ulSize		= itemWidth * totalItems;   
	divSize 	= itemWidth * itemsToShow; 
			
	$(carouselDiv).css("width", divSize+"px").css("height", itemsHeight+"px").css("visibility", "visible").css("overflow", "hidden").css("position", "relative"); 
	$(carouselDiv + ' ' + carouselList).css("width", ulSize+"px").css("left", -(current * itemWidth)).css("position", "absolute");
	$(carouselDiv + ' ' + carouselList + '> li').addClass("inactive");
	$(carouselDiv + ' ' + carouselList + '> li').attr('onclick', 'return show_gallery(this);');
	$(btnnext).attr('onclick', 'return next();');
	$(btnprev).attr('onclick', 'return prev();');	
});

show_overlay_ban = 1;
function show_gallery(element){
	//ACTIVE / INACTIVE ALBUMS
	$(element).addClass("active");
	$(element).siblings().removeClass();
	$(element).siblings().addClass("inactive");
	
	album_name = $(element).children("img").attr("alt");
	
	//Insert Main galery and Subitems
	if(show_overlay_ban==1){
		main_carouselC 		= $('#main-carousel').html();
		overlay_contentC	= $('#overlay_content').html();
		$('#overlay_content').html(overlay_contentC + main_carouselC);
		
		//Change Main Carousel
		carouselDiv = '#carousel_overlay';
		$('#overlay_content .carousel_container #carousel').attr('id', 'carousel_overlay');		
		
		$('#overlay_content .carousel_container').add('h1');
		
		//Show Overlay
		show_overlay();
	}

	//Get Subitems of album
	carousel_subgroup = $(element).children("ul").html();
	$('#overlay_content  #carousel-images .carousel-subgroup').html(carousel_subgroup);
		
	$('#overlay_content  #carousel-images .carousel-subgroup').css("display", "none");
	$('#overlay_content  #carousel-images .carousel-subgroup').fadeIn(1000);	
	//Carousel of images
	carousel_images();
			
	return false;
}


function show_overlay(){
	$('#overlay').fadeIn(400);
	setTimeout("show_overlay_content()",400);
}
function show_overlay_content(){
	$('#overlay_content').slideDown(600);
}

function close_overlay(){
	$('#overlay_content').slideUp(600);
	setTimeout("close_overlay_back()",400);
	
	//Change Main Carousel
	carouselDiv = '#carousel';
	$('#overlay_content .carousel_container').remove();	
	show_overlay_ban = 1;
}
function close_overlay_back(){
	$('#overlay').fadeOut(400);
}

function next(){ 
	if(totalItems - current<=step) {return; }
	else {
		current = current + step;
		$(carouselDiv + ' ' + carouselList).animate({left: -(itemWidth * current)}, speed, null);
	}
	return false;
}
function prev(){
	if(current - step < 0) {return; }
	else {
		current = current - step;
		$(carouselDiv + ' ' + carouselList).animate({left: -(itemWidth * current)}, speed, null);
	}
	return false;
}



/*CAROUSEL OF IMAGES*/
global_ban_carousel_images = 1;
function carousel_images(){ 
	itemsToShowI 	= 1;
	speedI 			= 500; 
	carouselDivI 	= '#carousel-images';
	btnnextI		= '.btnnextI';
	btnprevI		= '.btnprevI';	
	carouselListI 	= 'ul.carousel-subgroup';
	
	
	totalItemsI 	= $(carouselDivI + ' ' + carouselListI + '> li').length;
	itemWidthI 		= 400; 
	itemsHeightI 	= 400; 		
	stepI 			= itemsToShowI
	currentI 		= 0; 
			
	ulSizeI		= itemWidthI * totalItemsI;   
	divSizeI 	= itemWidthI * itemsToShowI; 
	
	//Counter
	counter_images();
	
	$(carouselDivI + ' ' + carouselListI).css("width", ulSizeI+"px").css("left", -(currentI * itemWidthI)).css("position", "absolute");

	if(show_overlay_ban==1){		
		$(carouselDivI).css("width", divSizeI+"px").css("height", itemsHeightI+"px").css("visibility", "visible").css("overflow", "hidden").css("position", "relative"); 		
		show_overlay_ban = 0;
	}
	
	if(global_ban_carousel_images ==1){
		$(btnnextI).attr('onclick', 'return nextI();');
		$(btnprevI).attr('onclick', 'return prevI();');
		global_ban_carousel_images = 0;
	}
}
function counter_images(){
	$('#counter-images').html((currentI+1)+" / "+totalItemsI);
}

function nextI(){ 
	if( totalItemsI - currentI<=stepI) { return; }
	else {
		currentI = currentI + stepI;
		$(carouselDivI + ' ' + carouselListI).animate({left: -(itemWidthI * currentI)}, speedI, null);
		//Counter
		counter_images();
	}
	return false;
}
function prevI(){
	if(currentI - stepI < 0) {return; }
	else {
		currentI = currentI - stepI;
		$(carouselDivI + ' ' + carouselListI).animate({left: -(itemWidthI * currentI)}, speedI, null);
		//Counter
		counter_images();
	}
	return false;
}
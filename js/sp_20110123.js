

function get_plusmin()
{
    return (Math.random() > 0.5 ? 1.0 : -1.0);
}
function get_random(max)
{
    // random getal tussen 0 en max-1
    var ranNum= Math.floor(Math.random()*max);
    return ranNum;
}
function get_randomplusmin(max)
{
    var ranNum = get_plusmin() * Math.floor(Math.random()*max);
    return ranNum;
}

/////////////////////////////////////////////////////////

function preloadImg()
{
    var preload_image = new Array ();

	var count=0;
    for(var i=0; i<aliens.length; i++)
    {
        preload_image[++count]=new Image();
        preload_image[count].src = aliens[i];
    }
    for(var i=0; i<aliensgevangen.length; i++)
    {
        preload_image[++count]=new Image();
        preload_image[count].src = aliensgevangen[i];
    }
    preload_image[++count]=new Image();preload_image[count].src = 'img/spacepolicerocket.jpg';
    preload_image[++count]=new Image();preload_image[count].src = 'img/vuurpijl.jpg';
    preload_image[++count]=new Image();preload_image[count].src = 'img/jail01.jpg';
    preload_image[++count]=new Image();preload_image[count].src = 'img/jail02.jpg';
    preload_image[++count]=new Image();preload_image[count].src = 'img/jail03.jpg';
    preload_image[++count]=new Image();preload_image[count].src = 'img/jail04.jpg';
}




/////////////////////////////////////////////////////////

var nrAliens = 5;
var nrOfAlienImages = 5; // alien images tellen vanaf 01


var aliens=new Array(nrAliens);
var aliensgevangen=new Array(nrAliens);

function defineAliens() {
	var divAliensInnerHTML = "";

    for (var i=0; i<nrAliens; i++) {
        var nr = '' + '000' + (i+1);
        if (nrOfAlienImages < nrAliens) {
        	nr = '' + '000' + (1+get_random(nrOfAlienImages));
        }
	    aliens[i] = "img/alien" + (nr.substr(nr.length-2,2)) + ".png";
	    aliensgevangen[i] = "img/alien" + (nr.substr(nr.length-2,2)) + "_gevangen.png";

		divAliensInnerHTML += '<div id="alien' + (i+1) + '" class="alien" ></div>';

    }
   	$('#aliens').html(divAliensInnerHTML);
}

function getAnAlien(isgevangen)
{
	var img = '<img src="' + (isgevangen ? aliensgevangen[get_random(nrAliens)] : aliens[get_random(nrAliens)]) + '" />';
    return img;
}


var debug;
var alien;

var mousex=-1;
var mousey=-1;


var alienleft = $(window).width()/2;
var alientop = $(window).height()/2;
var alienleftprev = 0;
var alientopprev = 0;

function alterposition(obj) {
	if (gamesOn) {
		alterAlien(this.id, 3, 10, true);
		//alterAlien(obj.id, 10, 20, true);
	}
}

function alterAllAliens2() {
	alterAllAliens(1,10,false);
}

function alterAllAliens(offset, maxchange, canGoToJail) {
	for (var i=1; i<= nrAliens; i++) {
		alterAlien('alien' + (i), offset, maxchange, canGoToJail);
	}
}

function addToDebug(val) {
	debug = document.getElementById('debug').innerHTML += val;
	//$("#debug").text($("#debug").text + val);
}


var alienhoogte = 63;
var alienbreedte = 50;
var wmaxx = $(window).width()-alienbreedte-10;
var wminx = 0;
var wminy = 0;
var wmaxy = $(window).height()-alienhoogte-10;

var jailtlminx = 0;
var jailtlmaxx = 0;
var jailtlminy = 0;
var jailtlmaxy = 0;
var injail_tl = false;

var jailtrminx = 0;
var jailtrmaxx = 0;
var jailtrminy = 0;
var jailtrmaxy = 0;
var injail_tr = false;

var jailbrminx = 0;
var jailbrmaxx = 0;
var jailbrminy = 0;
var jailbrmaxy = 0;
var injail_br = false;

var jailblminx = 0;
var jailblmaxx = 0;
var jailblminy = 0;
var jailblmaxy = 0;
var injail_bl = false;

function alterAlien(id, offset, maxchange, canGoToJail) {
	if (!gamesOn) {
		return;
	}

	var buffer = 1;
	var sec = new Date().getSeconds();

    var rest = 0;


	var xleft    = Math.abs(mousex-alienleft);
	var xright   = Math.abs(mousex-(alienleft+alienbreedte));
	var ybottom  = Math.abs(mousey-(alientop+alienhoogte));
	var ytop     = Math.abs(mousey-alientop);
	if (canGoToJail && !(injail_tl || injail_tr || injail_br || injail_bl)) {

        var mindist = Math.min(Math.min(Math.min(xleft, xright), ytop), ybottom);
        if (mindist == xleft) {
            // naar rechts
			alienleft += offset + get_randomplusmin(maxchange);
        } else if (mindist == xright) {
            // naar links
			alienleft -= offset + get_randomplusmin(maxchange);
        } else if (mindist == ytop) {
            // naar beneden
			alientop += offset + get_randomplusmin(maxchange);
        } else if (mindist == ybottom) {
            // naar boven
			alientop -= offset + get_randomplusmin(maxchange);
        }
        else {
			alienleft += offset + get_randomplusmin(maxchange);
			alientop += offset + get_randomplusmin(maxchange);
        }
	} else {
		rest =  (((sec>=0 && sec<3)   || (sec>=21 && sec<24) || (sec>=42 && sec<45)) ? 0:
				(((sec>=3 && sec<6)   || (sec>=24 && sec<27) || (sec>=45 && sec<48)) ? 1:
				(((sec>=6 && sec<9)   || (sec>=27 && sec<30) || (sec>=48 && sec<51)) ? 2:
				(((sec>=9 && sec<12)  || (sec>=30 && sec<33) || (sec>=51 && sec<54)) ? 3:
				(((sec>=12 && sec<15) || (sec>=33 && sec<36) || (sec>=54 && sec<57)) ? 4:
				(((sec>=15 && sec<18) || (sec>=36 && sec<39) || (sec>=57 && sec<60)) ? 5:
				(((sec>=18 && sec<21) || (sec>=39 && sec<42)) ? 6 : 7)))))));

        if ((injail_tl || injail_tr || injail_br || injail_bl)) {
            if (rest != 0 &&  rest != 1 && rest != 2 && rest != 3) {
                rest -= 4;
                maxchange += 10;
                offset += 5;
            }
        }

		if (rest == 0) {  // naar rechtsonder
			alienleft += offset + get_randomplusmin(maxchange);
			alientop += offset + get_randomplusmin(maxchange);
		} else if (rest == 1) { // naar rechtsboven
			alienleft += offset + get_randomplusmin(maxchange);
			alientop -= offset + get_randomplusmin(maxchange);
		} else if (rest == 2) { // naar linksonder
			alienleft -= offset + get_randomplusmin(maxchange);
			alientop += offset + get_randomplusmin(maxchange);
		} else if (rest == 3) { // naar linksboven
			alienleft -= offset + get_randomplusmin(maxchange);
			alientop -= offset + get_randomplusmin(maxchange);
		} else if (rest == 4) { // naar links
			alienleft -= offset + get_randomplusmin(maxchange);
		} else if (rest == 5) { // naar rechts
			alienleft += offset + get_randomplusmin(maxchange);
		} else if (rest == 6) { // naar boven
			alientop -= offset + get_randomplusmin(maxchange);
		} else { // naar beneden
			alientop += offset + get_randomplusmin(maxchange);
		}

	}

	alienleft = (alienleft < wminx ? wmaxx : (alienleft > wmaxx ? wminx : alienleft));
	alientop = (alientop < wminy ? wmaxy : (alientop > wmaxy ? wminy : alientop));

	//$('#status').html(canGoToJail + '-' + mousex +','+ mousey + ' -x- ' + alienleft +','+ alientop + ' -x- ' + ' xleft:' + xleft + ' xright:'+ xright + ' ybottom:'+ ybottom + ' ytop:'+ ytop + ' -- rest:'+ rest + ' -- injail_tl:'+ injail_tl + ' -- injail_tr:'+ injail_tr + ' -- injail_br:'+ injail_br + ' -- injail_bl:'+ injail_bl);

	if (canGoToJail) {
		       if (injail_tl || ((alienleft > jailtlminx-alienbreedte) && (alienleft < jailtlmaxx) && (alientop > jailtlminy-alienhoogte) && (alientop < jailtlmaxy))) {
			alienleft = (alienleft < jailtlminx ? jailtlmaxx-alienbreedte-buffer : (alienleft > jailtlmaxx-alienbreedte ? jailtlminx : alienleft));
			alientop = (alientop < jailtlminy ? jailtlmaxy-alienhoogte : (alientop > jailtlmaxy-alienhoogte-buffer ? jailtlminy : alientop));
			injail_tl = true;
		} else if (injail_tr || ((alienleft > jailtrminx-alienbreedte) && (alienleft < jailtrmaxx) && (alientop > jailtrminy-alienhoogte) && (alientop < jailtrmaxy))) {
			alienleft = (alienleft < jailtrminx ? jailtrmaxx-alienbreedte-buffer : (alienleft > jailtrmaxx-alienbreedte ? jailtrminx : alienleft));
			alientop = (alientop < jailtrminy ? jailtrmaxy-alienhoogte : (alientop > jailtrmaxy-alienhoogte-buffer ? jailtrminy : alientop));
			injail_tr = true;
		} else if (injail_br || ((alienleft > jailbrminx-alienbreedte) && (alienleft < jailbrmaxx) && (alientop > jailbrminy-alienhoogte) && (alientop < jailbrmaxy))) {
			alienleft = (alienleft < jailbrminx ? jailbrmaxx-alienbreedte-buffer : (alienleft > jailbrmaxx-alienbreedte ? jailbrminx : alienleft));
			alientop = (alientop < jailbrminy ? jailbrmaxy-alienhoogte : (alientop > jailbrmaxy-alienhoogte-buffer ? jailbrminy : alientop));
			injail_br = true;
		} else if (injail_bl || ((alienleft > jailblminx-alienbreedte) && (alienleft < jailblmaxx) && (alientop > jailblminy-alienhoogte) && (alientop < jailblmaxy))) {
			alienleft = (alienleft < jailblminx ? jailblmaxx-alienbreedte-buffer : (alienleft > jailblmaxx-alienbreedte ? jailblminx : alienleft));
			alientop = (alientop < jailblminy ? jailblmaxy-alienhoogte : (alientop > jailblmaxy-alienhoogte-buffer ? jailblminy : alientop));
			injail_bl = true;
		}
	} else {
		if (((alienleft > jailtlminx-alienbreedte) && (alienleft < jailtlmaxx) && (alientop > jailtlminy-alienhoogte) && (alientop < jailtlmaxy))) {
			alienleft = (alienleft > jailtlminx-alienbreedte ? jailtlmaxx : (alienleft < jailtlmaxx ? jailtlmaxx : alienleft));
			alientop = (alientop > jailtlminy-alienhoogte ? jailtlmaxy : (alientop < jailtlmaxy ? jailtlmaxy : alientop));
		} else if (((alienleft > jailtrminx-alienbreedte) && (alienleft < jailtrmaxx) && (alientop > jailtrminy-alienhoogte) && (alientop < jailtrmaxy))) {
			alienleft = (alienleft > jailtrminx-alienbreedte ? jailtrminx : (alienleft < jailtrmaxx ? jailtrminx-alienbreedte : alienleft));
			alientop = (alientop > jailtrminy-alienhoogte ? jailtrmaxy : (alientop < jailtrmaxy ? jailtrmaxy : alientop));
		} else if (((alienleft > jailbrminx-alienbreedte) && (alienleft < jailbrmaxx) && (alientop > jailbrminy-alienhoogte) && (alientop < jailbrmaxy))) {
			alienleft = (alienleft > jailbrminx-alienbreedte ? jailbrminx : (alienleft < jailbrmaxx ? jailbrminx-alienbreedte : alienleft));
			alientop = (alientop > jailbrminy-alienhoogte ? jailbrminy : (alientop < jailbrmaxy ? jailbrminy : alientop));
		} else if (((alienleft > jailblminx-alienbreedte) && (alienleft < jailblmaxx) && (alientop > jailblminy-alienhoogte) && (alientop < jailblmaxy))) {
			alienleft = (alienleft > jailblminx-alienbreedte ? jailblmaxx : (alienleft < jailblmaxx ? jailblmaxx : alienleft));
			alientop = (alientop > jailblminy-alienhoogte ? jailblminy : (alientop < jailblmaxy ? jailblminy : alientop));
		}
	}


    if (injail_tl || injail_tr || injail_br || injail_bl) {
    	$('#' + id).html(getAnAlien(true));
    } else {
    	$('#' + id).html(getAnAlien(false));
    }
    $('#' + id).css('left', alienleft + 'px');
    $('#' + id).css('top', alientop + 'px');
    $('#' + id).css('visibility', 'visible');
    $('#' + id).css('display', 'block');

	alienleftprev = alienleft;
	alientopprev = alientop;
}

var gamesOn = false;
$(function() {
	$('#games').click(function() {

		if (!$('#jailtopleft').is(":hidden")) {
			$('#jailtopleft').slideUp("fast");
			$('#jailtopright').slideUp("fast");
			$('#jailbottomright').slideUp("fast");
			$('#jailbottomleft').slideUp("fast");

			alienleft = Math.floor($(window).width()/2.0);
			alientop = Math.floor($(window).height()/2.0);
			$('.alien').each(
				function( intIndex ){
					$(this).css('visibility', 'hidden');
					$(this).css('left', alienleft);
					$(this).css('top', alientop);
				}
			);
			gamesOn = false;


		} else {
			$('#jailtopleft').slideDown("fast");
			$('#jailtopright').slideDown("fast");
			$('#jailbottomright').slideDown("fast");
			$('#jailbottomleft').slideDown("fast");

            resetJails();
		}
	});
});


function setJailsPositions() {
	var w = $(window).width();
	var h = $(window).height();

	$('#jailtopleft').html(    '<img id="jail01" src="img/jail01.jpg" width="' + (w > 1500 ? '226' : '113') + '" />');
	$('#jailtopright').html(   '<img id="jail02" src="img/jail02.jpg" width="' + (w > 1500 ? '427' : '213') + '" />');
	$('#jailbottomright').html('<img id="jail03" src="img/jail03.jpg" width="' + (w > 1500 ? '227' : '113') + '" />');
	$('#jailbottomleft').html( '<img id="jail04" src="img/jail04.jpg" width="' + (w > 1500 ? '339' : '170') + '" />');

}


function resetJails() {
	var jailfactor = 1.0;
	// jail01
	var jail01breedte = Math.floor(jailfactor*$('#jailtopleft')[0].clientWidth);
	var jail01hoogte  = Math.floor(jailfactor*$('#jailtopleft')[0].clientHeight);

	$('.topleft').css("left", ( 10 + "px"));
	$('.topleft').css("top", ( 50 + "px"));
    jailtlminx = $('#jailtopleft')[0].offsetLeft + 30;
    jailtlmaxx = $('#jailtopleft')[0].offsetLeft + jail01breedte - 10;
    jailtlminy = $('#jailtopleft')[0].offsetTop + 10;
    jailtlmaxy = $('#jailtopleft')[0].offsetTop + $('#jailtopleft')[0].scrollHeight + jail01hoogte - 20;
    injail_tl = false;

	// jail02
	var jail02breedte = Math.floor(jailfactor*$('#jailtopright')[0].clientWidth);
	var jail02hoogte  = Math.floor(jailfactor*$('#jailtopright')[0].clientHeight);
	$('.topright').css("left", ( ($(window).width() - $('#jail02')[0].clientWidth - 10) + "px"));
	$('.topright').css("top", ( 50 + "px"));
    jailtrminx = $('#jailtopright')[0].offsetLeft + 20;
    jailtrmaxx = $('#jailtopright')[0].offsetLeft + jail02breedte - 20;
    jailtrminy = $('#jailtopright')[0].offsetTop + 10;
    jailtrmaxy = $('#jailtopright')[0].offsetTop + $('#jailtopright')[0].scrollHeight + jail02hoogte - 10;
    injail_tr = false;

	// jail03
	var jail03breedte = Math.floor(jailfactor*$('#jailbottomright')[0].clientWidth);
	var jail03hoogte  = Math.floor(jailfactor*$('#jailbottomright')[0].clientHeight);
	$('.bottomright').css("left", ( ($(window).width() - $('#jail03')[0].clientWidth - 10) + "px"));
	$('.bottomright').css("top", ( ($(window).height() - $('#jail03')[0].clientHeight - 10) + "px"));
    jailbrminx = $('#jailbottomright')[0].offsetLeft + 15;
    jailbrmaxx = $('#jailbottomright')[0].offsetLeft + jail03breedte - 10;
    jailbrminy = $('#jailbottomright')[0].offsetTop + 20;
    jailbrmaxy = $('#jailbottomright')[0].offsetTop + $('#jailbottomright')[0].scrollHeight + jail03hoogte - 20;
    injail_br = false;

	// jail04
	var jail04breedte = Math.floor(jailfactor*$('#jailbottomleft')[0].clientWidth);
	var jail04hoogte  = Math.floor(jailfactor*$('#jailbottomleft')[0].clientHeight);
	$('.bottomleft').css("left", ( 10 + "px"));
	$('.bottomleft').css("top", ( ($(window).height() - $('#jail04')[0].clientHeight - 10) + "px"));
    jailblminx = $('#jailbottomleft')[0].offsetLeft + 25;
    jailblmaxx = $('#jailbottomleft')[0].offsetLeft + jail04breedte - 10;
    jailblminy = $('#jailbottomleft')[0].offsetTop + 15;
    jailblmaxy = $('#jailbottomleft')[0].offsetTop + $('#jailbottomleft')[0].scrollHeight + jail04hoogte - 20;
    injail_bl = false;

	alienleft = Math.floor($(window).width()/2.0);
	alientop = Math.floor($(window).height()/2.0);
	alienleft = mousex - $('#games')[0].clientWidth - 40;
	alientop = mousey + $('#games')[0].clientHeight;
	alienleft = mousex - alienbreedte - 10;
	alientop = mousey - alienhoogte - 10;

	$('.alien').each(
		function( intIndex ){
			$(this).css('left', alienleft + 'px');
			$(this).css('top', alientop + 'px');
			$(this).css('visibility', 'visible');
		}
	);

	gamesOn = true;
	alterAllAliens(0,0,true);
}


function freeAliens() {
	if (injail_tl || injail_tr || injail_br || injail_bl) {
		injail_tl = injail_tr = injail_br = injail_bl = false;

		alienleft = mousex - alienbreedte - 10;
		alientop = mousey - alienhoogte - 10;
	    alienleft = Math.floor($(window).width()/2.0);
	    alientop = Math.floor($(window).height()/2.0);

		$('.alien').each(
			function( intIndex ){
				$(this).css('left', alienleft + 'px');
				$(this).css('top', alientop + 'px');
				$(this).css('visibility', 'visible');
			}
		);
		alterAllAliens(0,0,true);
	}
}

$(function() {
	$('#jailtopleft').click(function() {
		freeAliens();
	});
});
$(function() {
	$('#jailtopright').click(function() {
		freeAliens();
	});
});
$(function() {
	$('#jailbottomright').click(function() {
		freeAliens();
	});
});
$(function() {
	$('#jailbottomleft').click(function() {
		freeAliens();
	});
});



/////////////////////////////////////////////////////////


var taal = 'uk';
var prevtaal = 'nl';

$(function() {
    $('.rollover').hover(function() {
        var currentImg = $(this).attr('src');
        $(this).attr('src', $(this).attr('hover_'+taal));
        $(this).attr('hover_'+taal, currentImg);

    }, function() {
        var currentImg = $(this).attr('src');
        $(this).attr('src', $(this).attr('hover_'+taal));
        $(this).attr('hover_'+taal, currentImg);
    });
});

$(function() {
    $('.langclick').click(function() {
        taal = ($(this).attr('src').indexOf('_uk') > -1 ? 'uk' : 'nl');
        prevtaal = ($(this).attr('src').indexOf('_uk') > -1 ? 'nl' : 'uk');
		setLanguage();
	});
});


function setLanguage() {
	$('.langchange').each(
        function( intIndex ){
            var currentImg = $(this).attr('src');
            currentImg = currentImg.replace('_'+prevtaal, '_'+taal);
            $(this).attr('src', currentImg);
        }
	);
}

/////////////////////////////////////////////////////////

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
    this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
    return this;
}


$(function() {
	$('#tekening').click(function() {

	$('#plaat1').center();

	if ($('#plaat1').is(":hidden")) {
		$('#plaat1').slideDown("slow");
	} else {
		$('#plaat1').slideUp("slow");
	}
	});
});


$(function() {
	$('#plaat1img').click(function(eventObj) {

		if (!$('#plaat1').is(":hidden")) {
			var location = $("#plaat1").elementlocation();
			var x = eventObj.pageX - location.x;
			var y = eventObj.pageY - location.y;
			if (x>471 && y>815) {// vuurpijl hotspot
				$('#plaat2').center();
				$('#plaat2').slideDown("slow");
			} else {
				$('#plaat1').slideUp("slow");
			}
		}
	});

	$('#plaat2img').click(function() {

		if (!$('#plaat2').is(":hidden")) {
			$('#plaat2').slideUp("slow");
		} else {
			$('#plaat2').slideDown("slow");
		}
	});
});


jQuery.fn.elementlocation = function() {
  var curleft = 0;
  var curtop = 0;

  var obj = this;

  do {
	curleft += obj.attr('offsetLeft');
	curtop += obj.attr('offsetTop');

	obj = obj.offsetParent();
  } while ( obj.attr('tagName') != 'BODY' );


  return ( {x:curleft, y:curtop} );
};
/////////////////////////////////////////////////////////



var timeout         = 1000;
var closetimer		= 0;
var ddmenuitem      = 0;
var timeoutsub      = 500;
var closetimersub	= 0;
var ddmenuitemsub   = 0;

function kmenu_open(obj)
{
	kmenu_canceltimer();
	kmenu_close(obj);
	ddmenuitem = $(this).find('ul').eq(0);
	ddmenuitem.css('visibility', 'visible');

	$('#kmenu li ').find('ul').css('left',this.offsetParent.offsetLeft+this.offsetLeft+this.scrollLeft+94);
	$('#kmenu li ').find('ul').css('top',this.offsetParent.offsetTop+this.offsetTop+this.scrollTop+3);
}
function kmenu_close(obj)
{
	if(ddmenuitem) ddmenuitem.css('visibility', 'hidden');
}

function kmenusub_open(obj)
{
	kmenu_canceltimer();
	//kmenu_close();
	kmenusub_canceltimer();
	kmenusub_close();
	ddmenuitemsub = $(this).find('ul').eq(0).css('visibility', 'visible');
	ddmenuitemsub = $(this).find('ul').eq(0).css('display', 'block');
	ddmenuitemsub = $(this).find('ul').eq(0).css('position', 'absolute');
}
function kmenusub_close()
{
	if(ddmenuitemsub) ddmenuitemsub.css('visibility', 'hidden');
	if(ddmenuitemsub) ddmenuitemsub.css('display', 'none');
	if(ddmenuitemsub) ddmenuitemsub.css('position', 'relative');
}

function kmenu_timer()
{
	closetimer = window.setTimeout(kmenu_close, timeout);
}
function kmenu_canceltimer()
{
	if(closetimer)
	{
		window.clearTimeout(closetimer);
		closetimer = null;
	}
}

function kmenusub_timer()
{
	closetimersub = window.setTimeout(kmenusub_close, timeoutsub);
}
function kmenusub_canceltimer()
{
	if(closetimersub)
	{
		window.clearTimeout(closetimersub);
		closetimersub = null;
	}
}

$(document).ready(function()
{
	$('#kmenu > li').bind('mouseout',  kmenusub_timer);
	$('#kmenu li ul > li').bind('mouseover', kmenusub_open);
	$('#kmenu > li').bind('mouseout',  kmenu_timer);
	$('#kmenu > li').bind('mouseover', kmenu_open);

	$('#divchangealiens > span').bind('mouseover', alterAllAliens2);
	$('#divchangealiens > span').bind('mouseout', alterAllAliens2);

/*
*/

	$(document).mousemove(function(e){
		mousex=e.pageX;
		mousey=e.pageY;
		//$('#status').html(mousex +','+ mousey);
	});

	defineAliens();
	$('.alien').each(
		function( intIndex ){
			$(this).bind('mouseover', alterposition);
		}
	);
	preloadImg();

	setJailsPositions();
});

document.onclick = kmenu_close;


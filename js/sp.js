

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
    preload_image[++count]=new Image();preload_image[count].src = 'img/spacepolicerocket.jpg';
    preload_image[++count]=new Image();preload_image[count].src = 'img/vuurpijl.jpg';

    preload_image[++count]=new Image();preload_image[count].src = 'alien01.png';
    preload_image[++count]=new Image();preload_image[count].src = 'alien02.png';
    preload_image[++count]=new Image();preload_image[count].src = 'alien03.png';
    preload_image[++count]=new Image();preload_image[count].src = 'alien04.png';
    preload_image[++count]=new Image();preload_image[count].src = 'alien05.png';
    preload_image[++count]=new Image();preload_image[count].src = 'alien01_gevangen.png';
    preload_image[++count]=new Image();preload_image[count].src = 'alien02_gevangen.png';
    preload_image[++count]=new Image();preload_image[count].src = 'alien03_gevangen.png';
    preload_image[++count]=new Image();preload_image[count].src = 'alien04_gevangen.png';
    preload_image[++count]=new Image();preload_image[count].src = 'alien05_gevangen.png';

    preload_image[++count]=new Image();preload_image[count].src = 'img/jail01.jpg';
    preload_image[++count]=new Image();preload_image[count].src = 'img/jail02.jpg';
    preload_image[++count]=new Image();preload_image[count].src = 'img/jail03.jpg';
    preload_image[++count]=new Image();preload_image[count].src = 'img/jail04.jpg';
}



function addToDebug(val) {
	debug = document.getElementById('debug').innerHTML += val;
	//$("#debug").text($("#debug").text + val);
}

var mousex=-1;
var mousey=-1;


var debug;

/////////////////////////////////////////////////////////


var game1 = null;
var isGame1On = false;

$(function() {
	$('#games').click(function() {
		if (game1 == null) {
			game1 = new Game1 ();
			game1.startUp();
			isGame1On = game1.gameIsOn;
		} else {
			game1.closeDown();
			game1 = null;
			isGame1On = false;
		}
	});
});

function alterAlienPosition(obj) {
	if (isGame1On && (game1 != null)) {
		game1.alterAlien(this.id, 3, 10, true);
	}
}

function alterAllAliensAutomated () {
	if (isGame1On && (game1 != null)) {
		game1.alterAllAliensAutomated();
	}
}

$(function() {
	$('#game1_jailtopleft').click(function() {
		if (isGame1On && (game1 != null)) {
			game1.freeAliens();
		}
	});
});
$(function() {
	$('#game1_jailtopright').click(function() {
		if (isGame1On && (game1 != null)) {
			game1.freeAliens();
		}
	});
});
$(function() {
	$('#game1_jailbottomright').click(function() {
		if (isGame1On && (game1 != null)) {
			game1.freeAliens();
		}
	});
});
$(function() {
	$('#game1_jailbottomleft').click(function() {
		if (isGame1On && (game1 != null)) {
			game1.freeAliens();
		}
	});
});


/////////////////////////////////////////////////////////


var game2 = null;
var isGame2On = false;

$(function() {
	$('#figuur').click(function() {
		if (game2 == null) {
			game2 = new Game2 ();
			game2.startUp();
			isGame2On = game2.gameIsOn;
		} else {
			game2.closeDown();
			game2 = null;
			isGame2On = false;
		}
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


	$(document).mousemove(function(e){
		mousex=e.pageX;
		mousey=e.pageY;
		//$('#status').html(mousex +','+ mousey);
	});

	preloadImg();

});

document.onclick = kmenu_close;


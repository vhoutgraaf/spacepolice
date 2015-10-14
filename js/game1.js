
function Game1 () {

	this.nrAliens = 5;
	this.nrOfAlienImages = 5; // alien images tellen vanaf 01


	this.aliens=new Array(this.nrAliens);
	this.aliensgevangen=new Array(this.nrAliens);


	this.alienleft = $(window).width()/2;
	this.alientop = $(window).height()/2;
	this.alienleftprev = 0;
	this.alientopprev = 0;

	this.alienhoogte = 63;
	this.alienbreedte = 50;
	this.wmaxx = $(window).width()-this.alienbreedte-10;
	this.wminx = 0;
	this.wminy = 0;
	this.wmaxy = $(window).height()-this.alienhoogte-10;

	this.jailtlminx = 0;
	this.jailtlmaxx = 0;
	this.jailtlminy = 0;
	this.jailtlmaxy = 0;
	this.injail_tl = false;

	this.jailtrminx = 0;
	this.jailtrmaxx = 0;
	this.jailtrminy = 0;
	this.jailtrmaxy = 0;
	this.injail_tr = false;

	this.jailbrminx = 0;
	this.jailbrmaxx = 0;
	this.jailbrminy = 0;
	this.jailbrmaxy = 0;
	this.injail_br = false;

	this.jailblminx = 0;
	this.jailblmaxx = 0;
	this.jailblminy = 0;
	this.jailblmaxy = 0;
	this.injail_bl = false;

	this.gameIsOn = true;



	this.startUp = function () {

		this.defineAliens();

		$('.alien').each(
			function( intIndex ){
				$(this).bind('mouseover', alterAlienPosition);
			}
		);
		this.setJailsPositions();

		$('#game1_jailtopleft').slideDown("fast");
		$('#game1_jailtopright').slideDown("fast");
		$('#game1_jailbottomright').slideDown("fast");
		$('#game1_jailbottomleft').slideDown("fast");

		this.resetJails();

		this.gameIsOn = true;

/*
		if (!$('#jailtopleft').is(":hidden")) {
			$('#jailtopleft').slideUp("fast");
			$('#jailtopright').slideUp("fast");
			$('#jailbottomright').slideUp("fast");
			$('#jailbottomleft').slideUp("fast");

			this.alienleft = Math.floor($(window).width()/2.0);
			this.alientop = Math.floor($(window).height()/2.0);
			$('.alien').each(
				function( intIndex ){
					$(this).css('visibility', 'hidden');
					$(this).css('left', this.alienleft);
					$(this).css('top', this.alientop);
				}
			);
			this.gameIsOn = false;


		} else {
			$('#jailtopleft').slideDown("fast");
			$('#jailtopright').slideDown("fast");
			$('#jailbottomright').slideDown("fast");
			$('#jailbottomleft').slideDown("fast");

			this.resetJails();
		}
*/
	}

	this.closeDown = function () {
		$('#game1_jailtopleft').slideUp("fast");
		$('#game1_jailtopright').slideUp("fast");
		$('#game1_jailbottomright').slideUp("fast");
		$('#game1_jailbottomleft').slideUp("fast");

		this.alienleft = Math.floor($(window).width()/2.0);
		this.alientop = Math.floor($(window).height()/2.0);
		$('.alien').each(
			function( intIndex ){
				$(this).css('visibility', 'hidden');
				$(this).css('left', this.alienleft);
				$(this).css('top', this.alientop);
			}
		);
		//this.gameIsOn = false;
	}


	this.preloadImg = function ()
	{
		var preload_image = new Array ();

		var count=0;
		for(var i=0; i<this.aliens.length; i++)
		{
			preload_image[++count]=new Image();
			preload_image[count].src = this.aliens[i];
		}
		for(var i=0; i<this.aliensgevangen.length; i++)
		{
			preload_image[++count]=new Image();
			preload_image[count].src = this.aliensgevangen[i];
		}
	}



	this.defineAliens = function () {
		var divAliensInnerHTML = "";

		for (var i=0; i<this.nrAliens; i++) {
			var nr = '' + '000' + (i+1);
			if (this.nrOfAlienImages < this.nrAliens) {
				nr = '' + '000' + (1+get_random(this.nrOfAlienImages));
			}
			this.aliens[i] = "img/alien" + (nr.substr(nr.length-2,2)) + ".png";
			this.aliensgevangen[i] = "img/alien" + (nr.substr(nr.length-2,2)) + "_gevangen.png";

			divAliensInnerHTML += '<div id="game1_alien' + (i+1) + '" class="alien" ></div>';

		}
		this.preloadImg();
		$('#game1_aliens').html(divAliensInnerHTML);
	}

	$('#divchangealiens > span').bind('mouseover', alterAllAliensAutomated);
	$('#divchangealiens > span').bind('mouseout', alterAllAliensAutomated);


	this.getAnAlien = function (isgevangen)
	{
		var img = '<img src="' + (isgevangen ? this.aliensgevangen[get_random(this.nrAliens)] : this.aliens[get_random(this.nrAliens)]) + '" />';
		return img;
	}

	this.xxxalterAlienPosition = function (obj) {
		if (this.gameIsOn) {
			this.alterAlien(this.id, 3, 10, true);
			//this.alterAlien(obj.id, 10, 20, true);
		}
	}


	this.alterAllAliensAutomated = function () {
		this.alterAllAliens(1,10,false);
	}

	this.alterAllAliens = function (offset, maxchange, canGoToJail) {
		for (var i=1; i<= this.nrAliens; i++) {
			this.alterAlien('game1_alien' + (i), offset, maxchange, canGoToJail);
		}
	}


	this.alterAlien = function (id, offset, maxchange, canGoToJail) {
		if (!this.gameIsOn) {
			return;
		}

		var buffer = 1;
		var sec = new Date().getSeconds();

		var rest = 0;


		var xleft    = Math.abs(mousex-this.alienleft);
		var xright   = Math.abs(mousex-(this.alienleft+this.alienbreedte));
		var ybottom  = Math.abs(mousey-(this.alientop+this.alienhoogte));
		var ytop     = Math.abs(mousey-this.alientop);
		if (canGoToJail && !(this.injail_tl || this.injail_tr || this.injail_br || this.injail_bl)) {

			var mindist = Math.min(Math.min(Math.min(xleft, xright), ytop), ybottom);
			if (mindist == xleft) {
				// naar rechts
				this.alienleft += offset + get_randomplusmin(maxchange);
			} else if (mindist == xright) {
				// naar links
				this.alienleft -= offset + get_randomplusmin(maxchange);
			} else if (mindist == ytop) {
				// naar beneden
				this.alientop += offset + get_randomplusmin(maxchange);
			} else if (mindist == ybottom) {
				// naar boven
				this.alientop -= offset + get_randomplusmin(maxchange);
			}
			else {
				this.alienleft += offset + get_randomplusmin(maxchange);
				this.alientop += offset + get_randomplusmin(maxchange);
			}
		} else {
			rest =  (((sec>=0 && sec<3)   || (sec>=21 && sec<24) || (sec>=42 && sec<45)) ? 0:
					(((sec>=3 && sec<6)   || (sec>=24 && sec<27) || (sec>=45 && sec<48)) ? 1:
					(((sec>=6 && sec<9)   || (sec>=27 && sec<30) || (sec>=48 && sec<51)) ? 2:
					(((sec>=9 && sec<12)  || (sec>=30 && sec<33) || (sec>=51 && sec<54)) ? 3:
					(((sec>=12 && sec<15) || (sec>=33 && sec<36) || (sec>=54 && sec<57)) ? 4:
					(((sec>=15 && sec<18) || (sec>=36 && sec<39) || (sec>=57 && sec<60)) ? 5:
					(((sec>=18 && sec<21) || (sec>=39 && sec<42)) ? 6 : 7)))))));

			if ((this.injail_tl || this.injail_tr || this.injail_br || this.injail_bl)) {
				if (rest != 0 &&  rest != 1 && rest != 2 && rest != 3) {
					rest -= 4;
					maxchange += 10;
					offset += 5;
				}
			}

			if (rest == 0) {  // naar rechtsonder
				this.alienleft += offset + get_randomplusmin(maxchange);
				this.alientop += offset + get_randomplusmin(maxchange);
			} else if (rest == 1) { // naar rechtsboven
				this.alienleft += offset + get_randomplusmin(maxchange);
				this.alientop -= offset + get_randomplusmin(maxchange);
			} else if (rest == 2) { // naar linksonder
				this.alienleft -= offset + get_randomplusmin(maxchange);
				this.alientop += offset + get_randomplusmin(maxchange);
			} else if (rest == 3) { // naar linksboven
				this.alienleft -= offset + get_randomplusmin(maxchange);
				this.alientop -= offset + get_randomplusmin(maxchange);
			} else if (rest == 4) { // naar links
				this.alienleft -= offset + get_randomplusmin(maxchange);
			} else if (rest == 5) { // naar rechts
				this.alienleft += offset + get_randomplusmin(maxchange);
			} else if (rest == 6) { // naar boven
				this.alientop -= offset + get_randomplusmin(maxchange);
			} else { // naar beneden
				this.alientop += offset + get_randomplusmin(maxchange);
			}

		}

		this.alienleft = (this.alienleft < this.wminx ? this.wmaxx : (this.alienleft > this.wmaxx ? this.wminx : this.alienleft));
		this.alientop = (this.alientop < this.wminy ? this.wmaxy : (this.alientop > this.wmaxy ? this.wminy : this.alientop));

		//$('#status').html(canGoToJail + '-' + mousex +','+ mousey + ' -x- ' + this.alienleft +','+ this.alientop + ' -x- ' + ' xleft:' + xleft + ' xright:'+ xright + ' ybottom:'+ ybottom + ' ytop:'+ ytop + ' -- rest:'+ rest + ' -- this.injail_tl:'+ this.injail_tl + ' -- this.injail_tr:'+ this.injail_tr + ' -- this.injail_br:'+ this.injail_br + ' -- this.injail_bl:'+ this.injail_bl);

		if (canGoToJail) {
				   if (this.injail_tl || ((this.alienleft > this.jailtlminx-this.alienbreedte) && (this.alienleft < this.jailtlmaxx) && (this.alientop > this.jailtlminy-this.alienhoogte) && (this.alientop < this.jailtlmaxy))) {
				this.alienleft = (this.alienleft < this.jailtlminx ? this.jailtlmaxx-this.alienbreedte-buffer : (this.alienleft > this.jailtlmaxx-this.alienbreedte ? this.jailtlminx : this.alienleft));
				this.alientop = (this.alientop < this.jailtlminy ? this.jailtlmaxy-this.alienhoogte : (this.alientop > this.jailtlmaxy-this.alienhoogte-buffer ? this.jailtlminy : this.alientop));
				this.injail_tl = true;
			} else if (this.injail_tr || ((this.alienleft > this.jailtrminx-this.alienbreedte) && (this.alienleft < this.jailtrmaxx) && (this.alientop > this.jailtrminy-this.alienhoogte) && (this.alientop < this.jailtrmaxy))) {
				this.alienleft = (this.alienleft < this.jailtrminx ? this.jailtrmaxx-this.alienbreedte-buffer : (this.alienleft > this.jailtrmaxx-this.alienbreedte ? this.jailtrminx : this.alienleft));
				this.alientop = (this.alientop < this.jailtrminy ? this.jailtrmaxy-this.alienhoogte : (this.alientop > this.jailtrmaxy-this.alienhoogte-buffer ? this.jailtrminy : this.alientop));
				this.injail_tr = true;
			} else if (this.injail_br || ((this.alienleft > this.jailbrminx-this.alienbreedte) && (this.alienleft < this.jailbrmaxx) && (this.alientop > this.jailbrminy-this.alienhoogte) && (this.alientop < this.jailbrmaxy))) {
				this.alienleft = (this.alienleft < this.jailbrminx ? this.jailbrmaxx-this.alienbreedte-buffer : (this.alienleft > this.jailbrmaxx-this.alienbreedte ? this.jailbrminx : this.alienleft));
				this.alientop = (this.alientop < this.jailbrminy ? this.jailbrmaxy-this.alienhoogte : (this.alientop > this.jailbrmaxy-this.alienhoogte-buffer ? this.jailbrminy : this.alientop));
				this.injail_br = true;
			} else if (this.injail_bl || ((this.alienleft > this.jailblminx-this.alienbreedte) && (this.alienleft < this.jailblmaxx) && (this.alientop > this.jailblminy-this.alienhoogte) && (this.alientop < this.jailblmaxy))) {
				this.alienleft = (this.alienleft < this.jailblminx ? this.jailblmaxx-this.alienbreedte-buffer : (this.alienleft > this.jailblmaxx-this.alienbreedte ? this.jailblminx : this.alienleft));
				this.alientop = (this.alientop < this.jailblminy ? this.jailblmaxy-this.alienhoogte : (this.alientop > this.jailblmaxy-this.alienhoogte-buffer ? this.jailblminy : this.alientop));
				this.injail_bl = true;
			}
		} else {
			if (((this.alienleft > this.jailtlminx-this.alienbreedte) && (this.alienleft < this.jailtlmaxx) && (this.alientop > this.jailtlminy-this.alienhoogte) && (this.alientop < this.jailtlmaxy))) {
				this.alienleft = (this.alienleft > this.jailtlminx-this.alienbreedte ? this.jailtlmaxx : (this.alienleft < this.jailtlmaxx ? this.jailtlmaxx : this.alienleft));
				this.alientop = (this.alientop > this.jailtlminy-this.alienhoogte ? this.jailtlmaxy : (this.alientop < this.jailtlmaxy ? this.jailtlmaxy : this.alientop));
			} else if (((this.alienleft > this.jailtrminx-this.alienbreedte) && (this.alienleft < this.jailtrmaxx) && (this.alientop > this.jailtrminy-this.alienhoogte) && (this.alientop < this.jailtrmaxy))) {
				this.alienleft = (this.alienleft > this.jailtrminx-this.alienbreedte ? this.jailtrminx : (this.alienleft < this.jailtrmaxx ? this.jailtrminx-this.alienbreedte : this.alienleft));
				this.alientop = (this.alientop > this.jailtrminy-this.alienhoogte ? this.jailtrmaxy : (this.alientop < this.jailtrmaxy ? this.jailtrmaxy : this.alientop));
			} else if (((this.alienleft > this.jailbrminx-this.alienbreedte) && (this.alienleft < this.jailbrmaxx) && (this.alientop > this.jailbrminy-this.alienhoogte) && (this.alientop < this.jailbrmaxy))) {
				this.alienleft = (this.alienleft > this.jailbrminx-this.alienbreedte ? this.jailbrminx : (this.alienleft < this.jailbrmaxx ? this.jailbrminx-this.alienbreedte : this.alienleft));
				this.alientop = (this.alientop > this.jailbrminy-this.alienhoogte ? this.jailbrminy : (this.alientop < this.jailbrmaxy ? this.jailbrminy : this.alientop));
			} else if (((this.alienleft > this.jailblminx-this.alienbreedte) && (this.alienleft < this.jailblmaxx) && (this.alientop > this.jailblminy-this.alienhoogte) && (this.alientop < this.jailblmaxy))) {
				this.alienleft = (this.alienleft > this.jailblminx-this.alienbreedte ? this.jailblmaxx : (this.alienleft < this.jailblmaxx ? this.jailblmaxx : this.alienleft));
				this.alientop = (this.alientop > this.jailblminy-this.alienhoogte ? this.jailblminy : (this.alientop < this.jailblmaxy ? this.jailblminy : this.alientop));
			}
		}


		if (this.injail_tl || this.injail_tr || this.injail_br || this.injail_bl) {
			$('#' + id).html(this.getAnAlien(true));
		} else {
			$('#' + id).html(this.getAnAlien(false));
		}
		$('#' + id).css('left', this.alienleft + 'px');
		$('#' + id).css('top', this.alientop + 'px');
		$('#' + id).css('visibility', 'visible');
		$('#' + id).css('display', 'block');

		this.alienleftprev = this.alienleft;
		this.alientopprev = this.alientop;
	}

	this.setJailsPositions = function () {
		var w = $(window).width();
		var h = $(window).height();

		$('#game1_jailtopleft').html(    '<img id="game1_jail01" src="img/jail01.jpg" width="' + (w > 1500 ? '226' : '113') + '" />');
		$('#game1_jailtopright').html(   '<img id="game1_jail02" src="img/jail02.jpg" width="' + (w > 1500 ? '427' : '213') + '" />');
		$('#game1_jailbottomright').html('<img id="game1_jail03" src="img/jail03.jpg" width="' + (w > 1500 ? '227' : '113') + '" />');
		$('#game1_jailbottomleft').html( '<img id="game1_jail04" src="img/jail04.jpg" width="' + (w > 1500 ? '339' : '170') + '" />');

	}


	this.resetJails = function () {
		var jailfactor = 1.0;
		// jail01
		var jail01breedte = Math.floor(jailfactor*$('#game1_jailtopleft')[0].clientWidth);
		var jail01hoogte  = Math.floor(jailfactor*$('#game1_jailtopleft')[0].clientHeight);

		$('.topleft').css("left", ( 10 + "px"));
		$('.topleft').css("top", ( 50 + "px"));
		this.jailtlminx = $('#game1_jailtopleft')[0].offsetLeft + 30;
		this.jailtlmaxx = $('#game1_jailtopleft')[0].offsetLeft + jail01breedte - 10;
		this.jailtlminy = $('#game1_jailtopleft')[0].offsetTop + 10;
		this.jailtlmaxy = $('#game1_jailtopleft')[0].offsetTop + $('#game1_jailtopleft')[0].scrollHeight + jail01hoogte - 20;
		this.injail_tl = false;

		// jail02
		var jail02breedte = Math.floor(jailfactor*$('#game1_jailtopright')[0].clientWidth);
		var jail02hoogte  = Math.floor(jailfactor*$('#game1_jailtopright')[0].clientHeight);
		$('.topright').css("left", ( ($(window).width() - $('#game1_jail02')[0].clientWidth - 10) + "px"));
		$('.topright').css("top", ( 50 + "px"));
		this.jailtrminx = $('#game1_jailtopright')[0].offsetLeft + 20;
		this.jailtrmaxx = $('#game1_jailtopright')[0].offsetLeft + jail02breedte - 20;
		this.jailtrminy = $('#game1_jailtopright')[0].offsetTop + 10;
		this.jailtrmaxy = $('#game1_jailtopright')[0].offsetTop + $('#game1_jailtopright')[0].scrollHeight + jail02hoogte - 10;
		this.injail_tr = false;

		// jail03
		var jail03breedte = Math.floor(jailfactor*$('#game1_jailbottomright')[0].clientWidth);
		var jail03hoogte  = Math.floor(jailfactor*$('#game1_jailbottomright')[0].clientHeight);
		$('.bottomright').css("left", ( ($(window).width() - $('#game1_jail03')[0].clientWidth - 10) + "px"));
		$('.bottomright').css("top", ( ($(window).height() - $('#game1_jail03')[0].clientHeight - 10) + "px"));
		this.jailbrminx = $('#game1_jailbottomright')[0].offsetLeft + 15;
		this.jailbrmaxx = $('#game1_jailbottomright')[0].offsetLeft + jail03breedte - 10;
		this.jailbrminy = $('#game1_jailbottomright')[0].offsetTop + 20;
		this.jailbrmaxy = $('#game1_jailbottomright')[0].offsetTop + $('#game1_jailbottomright')[0].scrollHeight + jail03hoogte - 20;
		this.injail_br = false;

		// jail04
		var jail04breedte = Math.floor(jailfactor*$('#game1_jailbottomleft')[0].clientWidth);
		var jail04hoogte  = Math.floor(jailfactor*$('#game1_jailbottomleft')[0].clientHeight);
		$('.bottomleft').css("left", ( 10 + "px"));
		$('.bottomleft').css("top", ( ($(window).height() - $('#game1_jail04')[0].clientHeight - 10) + "px"));
		this.jailblminx = $('#game1_jailbottomleft')[0].offsetLeft + 25;
		this.jailblmaxx = $('#game1_jailbottomleft')[0].offsetLeft + jail04breedte - 10;
		this.jailblminy = $('#game1_jailbottomleft')[0].offsetTop + 15;
		this.jailblmaxy = $('#game1_jailbottomleft')[0].offsetTop + $('#game1_jailbottomleft')[0].scrollHeight + jail04hoogte - 20;
		this.injail_bl = false;

		this.alienleft = Math.floor($(window).width()/2.0);
		this.alientop = Math.floor($(window).height()/2.0);
		this.alienleft = mousex - $('#games')[0].clientWidth - 40;
		this.alientop = mousey + $('#games')[0].clientHeight;
		this.alienleft = mousex - this.alienbreedte - 10;
		this.alientop = mousey - this.alienhoogte - 10;

		$('.game1_alien').each(
			function( intIndex ){
				$(this).css('left', this.alienleft + 'px');
				$(this).css('top', this.alientop + 'px');
				$(this).css('visibility', 'visible');
			}
		);

		this.gameIsOn = true;
		this.alterAllAliens(0,0,true);
	}


	this.freeAliens = function () {
		if (this.injail_tl || this.injail_tr || this.injail_br || this.injail_bl) {
			this.injail_tl = this.injail_tr = this.injail_br = this.injail_bl = false;

			this.alienleft = mousex - this.alienbreedte - 10;
			this.alientop = mousey - this.alienhoogte - 10;
			this.alienleft = Math.floor($(window).width()/2.0);
			this.alientop = Math.floor($(window).height()/2.0);

			$('.game1_alien').each(
				function( intIndex ){
					$(this).css('left', this.alienleft + 'px');
					$(this).css('top', this.alientop + 'px');
					$(this).css('visibility', 'visible');
				}
			);
			this.alterAllAliens(0,0,true);
		}
	}

}

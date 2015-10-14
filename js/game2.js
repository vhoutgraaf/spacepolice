// http://www.crockford.com/javascript/inheritance.html

//---------------------------------------------------------

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Function.method('inherits', function (parent) {
    var d = {}, p = (this.prototype = new parent());
    this.method('uber', function uber(name) {
        if (!(name in d)) {
            d[name] = 0;
        }
        var f, r, t = d[name], v = parent.prototype;
        if (t) {
            while (t) {
                v = v.constructor.prototype;
                t -= 1;
            }
            f = v[name];
        } else {
            f = p[name];
            if (f == this[name]) {
                f = v[name];
            }
        }
        d[name] += 1;
        r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
        d[name] -= 1;
        return r;
    });
    return this;
});

Function.method('swiss', function (parent) {
    for (var i = 1; i < arguments.length; i += 1) {
        var name = arguments[i];
        this.prototype[name] = parent.prototype[name];
    }
    return this;
});

//---------------------------------------------------------




/////////////////////////////////////////////////////////
// Game 2


function Game2 () {
	this.gameIsOn = true;




	// algemene kenmerken van een wezen im game2
	this.Being = function () {
		this.beingtype = '';
		this.beingid = '';
		this.topPosPrevPrev = 0;
		this.leftPosPrevPrev = 0;
		this.topPosPrev = 0;
		this.leftPosPrev = 0;
		this.topPos = 0;
		this.leftPos = 0;
		this.beingWidth = 0;
		this.beingHeight = 0;
		this.snelheid = 10;
		this.beingdirection = 1;
		this.topMin = 0;
		this.topMax = $(window).height();
		this.leftMin = 0;
		this.leftMax = $(window).width();

		this.imageUrl = '';
		this.imageHtml = '';
		this.setImage = function(imageUrl) {
			this.imageUrl 	= imageUrl;
			this.imageHtml = '<img src="' + this.imageUrl + '" />';
		};


		this.init = function(beingtype,beingid,imageUrl,beingWidth,beingHeight) {
			this.beingtype = beingtype;
			this.beingid = beingid;
			this.beingWidth = beingWidth;
			this.beingHeight = beingHeight;
			this.setImage(imageUrl);
			this.leftMax = $(window).width()-beingWidth;
			this.topMax = $(window).height()-beingHeight;
		};

		this.advance = function () {
		}

		this.setPosition = function(topIn,leftIn) {
			this.topPosPrevPrev 	= this.topPosPrev;
			this.leftPosPrevPrev 	= this.leftPosPrev;
			this.topPosPrev 		= this.topPos;
			this.leftPosPrev 		= this.leftPos;
			this.topPos 			= topIn;
			this.leftPos 			= leftIn;
		};

		this.toString = function() {
			return '(' + this.beingtype + '), id:' + this.beingid + ' op t,l=' + this.topPos + ',' + this.leftPos;
		}

		this.getDirection = function() {
			this.topPos = (this.topPosPrev - this.topPosPrevPrev) / (this.leftPosPrev - this.leftPosPrevPrev) * (this.leftPos - this.leftPosPrev) + this.topPosPrev;
		};

		this.jump = function() {
			this.topPos = (this.topPosPrev - this.topPosPrevPrev) / (this.leftPosPrev - this.leftPosPrevPrev) * (this.leftPos - this.leftPosPrev) + this.topPosPrev;
		};




		this.timeout	= 50;
		this.timerCount	= 0;


		this.showMyself = function () {
			$('#' + this.beingid).css('left', this.leftPos + 'px');
			$('#' + this.beingid).css('top', this.topPos + 'px');
			$('#' + this.beingid).css('visibility', 'visible');
			//$('#' + this.beingid).css('display', 'block');
		}

		this.canceltimer = function()
		{
			if(this.timerCount)
			{
				window.clearTimeout(this.timerCount);
				this.timerCount = null;
			}
		}

	}

	// een Alien in game2
	this.alienObject = function () {
		this.init('Alien','game2_alien','img/alien02_gevangen.png',50,63);

		this.startTimer = function ()
		{
			//this.closetimer = window.setTimeout(game2.alienObject.beingCanceltimer, this.timeout);
			this.timerCount = window.setInterval(game2.alien.advance, this.timeout);
		}

		this.advance = function () {
			game2.alien.setPosition(game2.alien.topPos, game2.alien.leftPos + 10);
			game2.alien.showMyself();
		}

	};
	this.alienObject.inherits(this.Being);


	// een Spacepolice in game2
	this.spacepoliceObject = function () {
		this.init('SpacePolice','game2_spacepolice','img/alien02.png',50,63);

		this.startTimer = function ()
		{
			//this.closetimer = window.setTimeout(game2.alienObject.beingCanceltimer, this.timeout);
			this.timerCount = window.setInterval(game2.spacepolice.advance, this.timeout);
		}
		this.advance = function () {
			game2.spacepolice.setPosition(game2.spacepolice.topPos, game2.spacepolice.leftPos + 15);
			$('#status').html(game2.spacepolice.leftPos + ' ');
			game2.spacepolice.showMyself();

			//alert(game2.spacepolice.leftPos);
		}
	};
	this.spacepoliceObject.inherits(this.Being);


	this.alien = null;
	this.spacepolice = null;

	// constructor
	this.startUp = function () {
		this.defineBeings();
		this.startChase();
	}

	this.closeDown = function () {
		this.alien.canceltimer();
		this.spacepolice.canceltimer();
		this.alien = null;
		this.spacepolice = null;
		$('#game2_beings').html('');
	}


	this.defineBeings = function () {
		this.alien = new this.alienObject();
		this.spacepolice = new this.spacepoliceObject();
		this.alien.snelheid = 20;
		this.spacepolice.snelheid = this.alien.snelheid + 1;

		var divBeingsInnerHTML = "";
		divBeingsInnerHTML  = '<div id="'+this.alien.beingid+'" class="g2_being g2_alien" ></div>';
		divBeingsInnerHTML += '<div id="'+this.spacepolice.beingid+'" class="g2_being g2_spacepolice" ></div>';
		this.preloadImg();
		$('#game2_beings').html(divBeingsInnerHTML);

		$('#' + this.alien.beingid).html(this.alien.imageHtml);
		$('#' + this.spacepolice.beingid).html(this.spacepolice.imageHtml);
	}

	this.preloadImg = function ()
	{
		var preload_image = new Array ();

		var count=0;
	    if (this.alien) {
	    	preload_image[++count]=new Image();preload_image[count].src = this.alien.imageUrl;
	    }
	    if (this.spacepolice) {
		    preload_image[++count]=new Image();preload_image[count].src = this.spacepolice.imageUrl;
		}
	}

	this.setStartPosition = function () {
		this.alien.setPosition(300,420);
		this.spacepolice.setPosition(100,120);

		this.alien.startTimer();
		this.alien.showMyself();

		this.spacepolice.startTimer();
		this.spacepolice.showMyself();

/*
		$('#' + this.alien.beingid).css('left', this.alien.leftPos + 'px');
		$('#' + this.alien.beingid).css('top', this.alien.topPos + 'px');
		$('#' + this.alien.beingid).css('visibility', 'visible');
		$('#' + this.alien.beingid).css('display', 'block');


		$('#' + this.spacepolice.beingid).css('left', this.spacepolice.leftPos + 'px');
		$('#' + this.spacepolice.beingid).css('top', this.spacepolice.topPos + 'px');
		$('#' + this.spacepolice.beingid).css('visibility', 'visible');
		$('#' + this.spacepolice.beingid).css('display', 'block');
*/
		//alert(this.spacepolice.toString());
		//alert(this.alien.toString());
	}


	this.startChase = function () {
		this.setStartPosition();


	}


}


function Being2 (beingtype) {
    this.beingtype = beingtype;
    this.color = "red";
    this.getInfo = function() {
        return this.color + ' ' + this.beingtype + ' apple';
    };
}


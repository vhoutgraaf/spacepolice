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
/*
function Game2 () {
	this.gameIsOn = true;




	// algemene kenmerken van een wezen im game2
	function Being(typeIn) {
		this.type = typeIn;
		this.topPrevPrev = 0;
		this.rightPrevPrev = 0;
		this.topPrev = 0;
		this.rightPrev = 0;
		this.top = 0;
		this.right = 0;
		this.setPosition = function(topIn,rightIn) {
			this.topPrevPrev 	= this.topPrev;
			this.rightPrevPrev 	= this.rightPrev;
			this.topPrev 		= this.top;
			this.rightPrev 		= this.right;
			this.top 			= topIn;
			this.right 			= rightIn;
		};

		this.toString = function() {
			return '(' + this.type + ')';
		}

		this.getDirection = function() {
			this.top = (this.topPrev - this.topPrevPrev) / (this.rightPrev - this.rightPrevPrev) * (this.right - this.rightPrev) + this.topPrev;
		};

		this.jump = function() {
			this.top = (this.topPrev - this.topPrevPrev) / (this.rightPrev - this.rightPrevPrev) * (this.right - this.rightPrev) + this.topPrev;
		};


		this.image = '';
		this.setImage = function(imageIn) {
			this.image 	= imageIn;
		};
	}

//	Being.method('toString', function () {
//		return '(' + this.getType() + ')';
//	});





	this.startUp = function () {
	}

	this.closeDown = function () {
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

}


function Being2 (type) {
    this.type = type;
    this.color = "red";
    this.getInfo = function() {
        return this.color + ' ' + this.type + ' apple';
    };
}
*/




function Being(typeIn) {
	this.type = typeIn;
	this.topPrevPrev = 0;
	this.rightPrevPrev = 0;
	this.topPrev = 0;
	this.rightPrev = 0;
	this.top = 0;
	this.right = 0;
	this.setPosition = function(topIn,rightIn) {
		this.topPrevPrev 	= this.topPrev;
		this.rightPrevPrev 	= this.rightPrev;
		this.topPrev 		= this.top;
		this.rightPrev 		= this.right;
		this.top 			= topIn;
		this.right 			= rightIn;
	};

	this.toString = function() {
		return '(' + this.type + ')';
	}

	this.getDirection = function() {
		this.top = (this.topPrev - this.topPrevPrev) / (this.rightPrev - this.rightPrevPrev) * (this.right - this.rightPrev) + this.topPrev;
	};

	this.jump = function() {
		this.top = (this.topPrev - this.topPrevPrev) / (this.rightPrev - this.rightPrevPrev) * (this.right - this.rightPrev) + this.topPrev;
	};


	this.image = '';
	this.setImage = function(imageIn) {
		this.image 	= imageIn;
	};
}




// een Alien in game2
function Alien_game2() {
    thistype = 'Alien';
}

Alien_game2.inherits(Being);

Alien_game2.method('toString', function () {
    if (this.getType()) {
        return this.uber('toString');
    }
    return "-0-";
});

// een Spacepolice in game2
function Spacepolice_game2() {
    this.type = 'Spacepolice';
}

Spacepolice_game2.inherits(Being);

Spacepolice_game2.method('toString', function () {
    if (this.getType()) {
        return this.uber('toString');
    }
    return "-0-";
});


SpacepoliceGame2 = new Spacepolice_game2();
SpacepoliceGame2.setPosition(100,120);
alert(SpacepoliceGame2.toString() + ' -top:' +  SpacepoliceGame2.top);


AlienGame2 = new Alien_game2();
AlienGame2.setPosition(300,420);
alert(AlienGame2.toString() + ' -top:' +  AlienGame2.top);


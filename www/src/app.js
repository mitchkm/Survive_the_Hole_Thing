var DefineThisBitch = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new gameLayer();
        this.addChild(new gameLayer());
    }
});

var gameLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size 
        var size = cc.winSize;       

        this.screenWidth = size.width;
        this.screenHeight = size.height;
        
        this.lrgAsteroid = [];
        this.medAsteroid = [];
        this.smlAsteroid = []; 
        this.maxLrg = 2;
        this.maxMed = 4;
        this.maxSml = 8;
        
        //this.newSpawn = 0;
        //this.spawnRate = 36000;
        
        var bckgrnd = new cc.Sprite.create(asset.Background_png);
        //console.log("background" + bckgrnd, bckgrnd);
        bckgrnd.setAnchorPoint(cc.p(0.5,0.5));
        bckgrnd.setScaleX(size.width / bckgrnd.getContentSize().width);
        bckgrnd.setScaleY(size.height / bckgrnd.getContentSize().height);
        bckgrnd.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(bckgrnd, 0);
        

        this.scheduleUpdate();
        this.schedule(this.generateAsteroies, 1);
        this.schedule(this.collisions);
        
        
        return true;
    },
    
    update:function (dt) {
        for (var i = 0; i < this.lrgAsteroid.length; i++) {
            var lrgRoid = this.lrgAsteroid[i];
            if (lrgRoid.x < -32 || lrgRoid.x > this.screenWidth + 32 || 
                    lrgRoid.y < -32 || lrgRoid.y > this.screenHeight + 32) {
                this.removeChild(lrgRoid);
                this.lrgAsteroid.splice(i, 1);
            }
            else {    
                lrgRoid.x += lrgRoid.xVelocity;
                lrgRoid.y -= lrgRoid.yVelocity;
                lrgRoid.rotation += 1;
            }
        }
        for (i = 0; i < this.medAsteroid.length; i++) {
            var medRoid = this.medAsteroid[i];
            if (medRoid.x < -32 || medRoid.x > this.screenWidth + 32 ||
                    medRoid.y < -32 || medRoid.y > this.screenHeight + 32) {
                this.removeChild(medRoid);
                this.medAsteroid.splice(i, 1);
            }
            else {
                medRoid.x += medRoid.xVelocity;
                medRoid.y -= medRoid.yVelocity;
                medRoid.rotation += 2;
            }
        }
        for (i = 0; i < this.smlAsteroid.length; i++) {
            var smlRoid = this.smlAsteroid[i];
            if (smlRoid.x < -64 || smlRoid.x > this.screenWidth + 64 ||
                    smlRoid.y < -64 || smlRoid.y > this.screenHeight + 64) {
                this.removeChild(smlRoid);
                this.smlAsteroid.splice(i, 1);
            }
            else {
                smlRoid.x += smlRoid.xVelocity;
                smlRoid.y -= smlRoid.yVelocity;
                smlRoid.rotation += 4;
            }
        }
        
    },
    
    generateAsteroies:function() {
        //if (this.newSpawn > this.spawnRate) {  
           // this.newSpawn = 0;
            console.log("generate!");
            var newRoid = this.createAsteroid();
            
            if (newRoid !== null) {
                var midX = this.screenWidth/2;
                var midY = this.screenHeight/2;

                var side = Math.floor(Math.random() * 4);
                var xPos = 0;
                var yPos = 0; 
                var xVol = 0;
                var yVol = 0;
                var minAngle = 0;
                var maxAngle = 180;
                var radTraj = Math.PI/2;
                var forth = Math.PI/2;

                
                if (side === 0) {
                    xPos = Math.floor(Math.random() * this.screenWidth);
                    yPos = -32;
                    
                    minAngle = ((forth)*(xPos/this.screenWidth)) + forth;
                    maxAngle = minAngle + forth;
                    radTraj = (Math.random() * (maxAngle - minAngle)) + minAngle;
                    xVol = Math.sin(radTraj);
                    yVol = Math.cos(radTraj);                        
                }
                else if (side === 1) {
                    xPos = -32;
                    yPos = Math.floor(Math.random() * this.screenHeight);
                    
                    minAngle = ((forth)*(yPos/this.screenHeight)) + forth;
                    maxAngle = minAngle - forth;
                    radTraj = (Math.random() * (maxAngle - minAngle)) + minAngle;
                    xVol = Math.sin(radTraj);
                    yVol = Math.cos(radTraj); 
                }
                else if (side === 2) {
                    xPos = Math.floor(Math.random() * this.screenHeight);
                    yPos = this.screenHeight + 32;
                    
                    minAngle = ((forth)*(xPos/this.screenWidth)) - forth;
                    maxAngle = minAngle + forth;
                    radTraj = -((Math.random() * (maxAngle - minAngle)) + minAngle);
                    xVol = Math.sin(radTraj);
                    yVol = Math.cos(radTraj); 
                }
                else if (side === 3) {
                    xPos = this.screenWidth + 32;
                    yPos = Math.floor(Math.random() * this.screenHeight);
                    
                    minAngle = ((forth)*(yPos/this.screenWidth)) - forth;
                    maxAngle = minAngle - forth;
                    radTraj = -((Math.random() * (maxAngle - minAngle)) + minAngle);
                    xVol = Math.sin(radTraj);
                    yVol = Math.cos(radTraj); 
                }

                newRoid.x = xPos;
                newRoid.y = yPos;
                newRoid.xVelocity = xVol;
                newRoid.yVelocity = yVol;

                if (newRoid.name === "lrg") {
                    this.lrgAsteroid.push(newRoid);
                }
                else if (newRoid.name === "med") {
                    this.medAsteroid.push(newRoid);
                }
                else if (newRoid.name === "sml") {
                    this.smlAsteroid.push(newRoid);
                }

                this.addChild(newRoid, 1);
            }
        //}
        //this.newSpawn += 1;
        //console.log(this.newSpawn);
    },
    
    createAsteroid:function () {
        
        var roidType = Math.floor(Math.random() * 3);
        
        var roid = null;
        
        if (roidType === 0) {
            if (this.lrgAsteroid.length < this.maxLrg) {
                roid = new largeAsteroid();
            }
        }
        else if (roidType === 1) {
            if (this.medAsteroid.length < this.maxMed) {
                roid = new mediumAsteroid();
            }
        }
        else if (roidType === 2) {
            if (this.smlAsteroid.length < this.maxSml) {
                roid = new smallAsteroid();
            }
        }
        return roid;
    },

    
    collisions:function () {
        var idxLg = [];
        var idxMd = [];
        var idxSm = [];
        
        var i = 0;
        var j = 0;
        
        for (i = 0; i < this.lrgAsteroid.length; i++) {
            var lrgRoid1 = this.lrgAsteroid[i];
            for (j = i+1; j < this.lrgAsteroid.length; j++) {
                var lrgRoid2 = this.lrgAsteroid[j];
                if (this.distance(lrgRoid1.x, lrgRoid1.y, lrgRoid2.x, lrgRoid2.y) <= (lrgRoid1.radius + lrgRoid2.radius)) {
                    if (idxLg.indexOf(i) === -1) { idxLg.push(i); }
                    if (idxLg.indexOf(j) === -1) { idxLg.push(j); } 
                    this.breakApart(lrgRoid1, lrgRoid2);
                }
            }
            for (j = 0; j < this.medAsteroid.length; j++) {
                var medRoid1 = this.medAsteroid[j];
                if (this.distance(lrgRoid1.x, lrgRoid1.y, medRoid1.x, medRoid1.y) < (lrgRoid1.radius+medRoid1.radius)) {
                    if (idxLg.indexOf(i) === -1) { idxLg.push(i); }
                    if (idxMd.indexOf(j) === -1) { idxMd.push(j); }
                    this.breakApart(lrgRoid1, medRoid1);
                }
            }
            for (j = 0; j < this.smlAsteroid.length; j++) {
                var smlRoid1 = this.smlAsteroid[j];
                if (this.distance(lrgRoid1.x, lrgRoid1.y, smlRoid1.x, smlRoid1.y) < (lrgRoid1.radius+smlRoid1.radius)) {
                    if (idxLg.indexOf(i) === -1) { idxLg.push(i); }
                    if (idxSm.indexOf(j) === -1) { idxSm.push(j); }
                    this.breakApart(lrgRoid1, smlRoid1);
                }
            }
        }
        
        for (i = 0; i < this.medAsteroid.length; i++) {
            var medRoid2 = this.medAsteroid[i];
            for (j = i+1; j < this.medAsteroid.length; j++) {
                var medRoid3 = this.medAsteroid[j];
                if (this.distance(medRoid2.x, medRoid2.y, medRoid3.x, medRoid3.y) < (medRoid2.radius+medRoid3.radius)) {
                    if (idxMd.indexOf(i) === -1) { idxMd.push(i); }
                    if (idxMd.indexOf(j) === -1) { idxMd.push(j); }
                    this.breakApart(medRoid2, medRoid3);
                }
            }
            for (j = 0; j < this.smlAsteroid.length; j++) {
                var smlRoid2 = this.smlAsteroid[j];
                if (this.distance(medRoid2.x, medRoid2.y, smlRoid2.x, smlRoid2.y) < (medRoid2.radius+smlRoid2.radius)) {
                    if (idxMd.indexOf(i) === -1) { idxMd.push(i); }
                    if (idxSm.indexOf(j) === -1) { idxSm.push(j); }                    
                    this.breakApart(medRoid2, smlRoid2);
                }
            }
        }
        
        for (i = 0; i < this.smlAsteroid.length; i++) {
            var smlRoid3 = this.smlAsteroid[i];
            for (j = i+1; j < this.smlAsteroid.length; j++) {
                var smlRoid4 = this.smlAsteroid[j];
                if (this.distance(smlRoid3.x, smlRoid3.y, smlRoid4.x, smlRoid4.y) < (smlRoid3.radius+smlRoid4.radius)) {
                    if (idxSm.indexOf(i) === -1) { idxSm.push(i); }
                    if (idxSm.indexOf(j) === -1) { idxSm.push(j); } 
                    this.breakApart(smlRoid3, smlRoid4);
                }
            }
        }
        
        this.removeCollided(idxLg, idxMd, idxSm);
        
    },
    
    breakApart:function(obj1, obj2) {
        //var obj1a;
        //var obj1b;
        //var obj2a;
        //var obj2b;
        
        this.removeChild(obj1); this.removeChild(obj2);
        /*
        if(obj1.name === "lrg") {
            if (obj2.name === "lrg") {
                /*
                obj1a = new mediumAsteroid();
                    obj1a.xVelocity = -obj1.yVelocity;
                    obj1a.yVelocity = obj1.xVelocity;
                    obj1a.x = obj1.x + obj1.radius;
                    obj1a.y = obj1.y + obj1.radius;                
                
                obj1b = new mediumAsteroid();
                    obj1b.xVelocity = obj1.yVelocity;
                    obj1b.yVelocity = -obj1.xVelocity;
                    obj1b.x = obj1.x - obj1.radius;
                    obj1b.y = obj1.y - obj1.radius;                
                
                    
                obj2a = new mediumAsteroid();
                    obj2a.xVelocity = -obj2.yVelocity;
                    obj2a.yVelocity = obj2.xVelocity;
                    obj2a.x = obj2.x + obj2.radius;
                    obj2a.y = obj2.y + obj2.radius; 
                    
                obj2b = new mediumAsteroid();
                    obj2b.xVelocity = obj2.yVelocity;
                    obj2b.yVelocity = -obj2.xVelocity;
                    obj2b.x = obj2.x - obj2.radius;
                    obj2b.y = obj2.y - obj2.radius;
                
                //this.addChild(obj1a); this.addChild(obj1b); this.addChild(obj2a); this.addChild(obj2b);
                //console.log("x1:" + obj1.x + " y1:" + obj1.y);
                //console.log("x2:" + obj2.x + " y2:" + obj2.y);
                
                this.removeChild(obj1); this.removeChild(obj2);
            }
            
            else if (obj2.name === "med") {
                
            }
            else if (obj2.name === "sml") {
                
            }
            else if (obj2.name === "ufo") {
                
            }
        }
        else if (obj1.name === "med") {
            if (obj2.name === "lrg") {
            
            }
            else if (obj2.name === "med") {
                
            }
            else if (obj2.name === "sml") {
                
            }
            else if (obj2.name === "ufo") {
                
            }
            
        }
        else if (obj1.name === "sml") {
            if (obj2.name === "lrg") {
            
            }
            else if (obj2.name === "med") {
                
            }
            else if (obj2.name === "sml") {
                
            }
            else if (obj2.name === "ufo") {
                
            }
            
        }
        else if (obj1.name === "ufo") {
            if (obj2.name === "lrg") {
            
            }
            else if (obj2.name === "med") {
                
            }
            else if (obj2.name === "sml") {
                
            }
            else if (obj2.name === "ufo") {
                
            }
            
        }
        
        } */
        
    },
    
    removeCollided:function(idxLg, idxMd, idxSm) {
        idxLg.sort(this.bigToSmallSort);
        idxMd.sort(this.bigToSmallSort);
        idxSm.sort(this.bigToSmallSort);
        
        var idxAt = 0;
        var currIdx = 0;
        
        for (currIdx = 0; currIdx < idxLg.length; currIdx++) {
            idxAt = idxLg[currIdx];
            this.lrgAsteroid.splice(idxAt, 1);
        }
        for (currIdx = 0; currIdx < idxMd.length; currIdx++) {
            idxAt = idxMd[currIdx];
            this.medAsteroid.splice(idxAt, 1);
        }
        for (currIdx = 0; currIdx < idxSm.length; currIdx++) {
            idxAt = idxSm[currIdx];
            this.smlAsteroid.splice(idxAt, 1);
        }
    },
    
    bigToSmallSort:function(a,b) {
        if (a > b) { return -1; }
        else if (a < b) { return 1; }
        else { return 0; }
    },
        
    distance:function(x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        return Math.sqrt((dx*dx)+(dy*dy));
    }
});



var ufo = cc.Sprite.extend({
    ctor:function(arg) {
      this._super(asset.Ufo_png);
      this.attr({
            name: "ufo",
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2,
            scale: 0.25,
            rotation: 0,
            xVelocity : 0,
            yVelocity : 0,
      });
    }
});

var blackhole = cc.Sprite.extend({
    ctor:function(arg) {
      this._super(asset.Blackhole_png);
      this.attr({
            name : "blk",
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2,
            scale: 0.375,
            rotation: 0,
            xVelocity : 0,
            yVelocity : 0,
      });
    }
});
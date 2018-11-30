/*
    Xiaowei Chen
    xic220
    CSE264 Spring 2018
    Final Project: A mini cat detective game
*/

var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;

/*
The code that opens dialogue can be vastly
improved if I updated my game.currentObj
each time I made a choice.
But I realized this too late..
*/

var game = {
    init: function(){
        $(".gameset").hide();
        $("#startingscreen").show();
        $("#gamecanvas").show();
        game.canvas = $("#gamecanvas")[0];
        game.context = game.canvas.getContext("2d");
    },

    xOffset: 1600,
    yOffset: 120,
    xCharCoor: 350,
    yCharCoor: 230,
    xSpeed: 0,
    ySpeed: 0,
    interval: 1000/60,
    flag: false,
    dialoged: false,
    currentObj: undefined,
    currentObj2: undefined,
    tapped: 0,
    selected: false,
    npcdial: false,
    diaryed: false,

    transition: function(){
        $("#startbtn").attr("src", "./img/startbtn.gif");
        $("#startingscreen").addClass("shaded");

        setTimeout(function(){
            $("#transitionscreen").show();
        }, 2000);
        
        setTimeout(function(){
            $("#transitionscreen").append("<p>Click to continue</p>");
        }, 4000);
        $("#transitionscreen").on("tap", function(){
            $("#transitionscreen").hide();
            game.start();
        });
    },

    start: function(){
        //apply black transition here

        $(".gameset").hide();
        $("#gamecanvas").show();
        $("#npcs").show();
        $("#pad").show();
        $("#transitionscreen").hide();
        box2d.init();

        for (var i = scenedata.entities.length - 1; i >= 0; i--){
            var entity = scenedata.entities[i];
            entities.create(entity);
        };

        for (var body = box2d.world.GetBodyList(); body; body = body.GetNext()) {
            var entity = body.GetUserData();
            if(entity){
                if(entity.type == "player"){
                    game.player = body;
                    game.player.width = entity.width;
                    game.player.height = entity.height;
                    game.player.SetPosition({x: (game.xCharCoor + game.xOffset + game.player.width/2)/box2d.scale, y: (game.yCharCoor + game.player.height/2)/box2d.scale});
                }
            }
        }
        game.ended = false;
        setInterval(function(){
            game.animate();            
        }, game.interval);
    },

    animate: function(){
        if(game.ended){
            console.log("You Win~");
        }
        if($("#dialogues").is(":visible")){
            game.dialoged = true;
        }     
        if(game.diaryed){
            dialogue.white.investigate[3].privacy = "shown";
//            console.log(            dialogue.white.investigate[3].privacy        );
        }
        if(!$("#dialogues").is(":visible")){
            $("#white").addClass("pressednpc");
            $("#black").addClass("pressednpc");
            $("#gray").addClass("pressednpc");
            $("#orange").addClass("pressednpc");
            game.dialoged = false;
        }
        camera.follow();
        game.player.SetPosition({x: (game.xCharCoor + game.xOffset + game.player.width/2)/box2d.scale,
            y: (game.yCharCoor + game.player.height/2)/box2d.scale});
        game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
        game.context.drawImage(gamebackground, game.xOffset, game.yOffset, 800, 450,0,0,800,450);
//        game.context.drawImage(mainchar, game.xCharCoor, game.yCharCoor);
        game.drawAllBody();
    },
    
    drawAllBody: function(){
        box2d.world.Step(1/50, 8, 11);
        box2d.world.ClearForces();
        box2d.world.DrawDebugData();
        
        for (var body = box2d.world.GetBodyList(); body; body = body.GetNext()) {
            var entity = body.GetUserData();
            if(entity){
                if(entity.type == "player"){
                    game.yCharCoor = body.GetPosition().y * box2d.scale- game.player.height/2;
                //    console.log(game.yCharCoor);
                }
                entities.draw(entity, body.GetPosition(), body.GetAngle());
            }
        }
    },
}

$(()=>{
    game.init();
    $(".ui-loader").remove();

    $("#leftC").on("vmousedown", function(){
        $("#leftC").addClass("pressedbtn");
        game.xSpeed = -8;

        if(game.dialoged){
            $("#leftC").addClass("pressedbtn");
            if($(".selected").is(":first-child")){
                $(".selected").removeClass("selected");
                $("#selection p").last().addClass("selected");
            }
            else{
                var current = $(".selected");
                current.prev().addClass("selected");
                current.removeClass("selected");
            }
        }
    }).on("vmouseup", function(){
        $("#leftC").removeClass("pressedbtn");
        game.xSpeed = 0;
    });
    
    $("#rightC").on("vmousedown", function(){
        $("#rightC").addClass("pressedbtn");
        game.xSpeed = 8;

        if(game.dialoged){
            $("#rightC").addClass("pressedbtn");
            if($(".selected").is(":last-child")){
                $(".selected").removeClass("selected");
                $("#selection p").first().addClass("selected");
            }
            else{
                var current = $(".selected");
                current.next().addClass("selected");
                current.removeClass("selected");
            }
        }
    }).on("vmouseup", function(){
        $("#rightC").removeClass("pressedbtn");
        game.xSpeed = 0;
    });

    var handelselection = false;
    var finalhandle = false;

    $("#ctrl").on("vmousedown", function(){
        $("#ctrl").addClass("pressedbtn");
        game.flag = true;

        if(game.dialoged && !handelselection){
            handelselection = true;
            game.flag = false;
            if(game.selected){
                if($(".selected").html() == game.currentObj.name){
                    readDialogue(game.currentObj);
                }
                else if (($(".selected").html() == game.currentObj2.name)){
                    game.currentObj = game.currentObj2;
                    readDialogue(game.currentObj);                        
                }
                else {
                    $(".message").remove();
                    $("#dialcontent").html(" ");
                    $("#dialogues").hide();
                    $("#selection").hide();                    
                }
                game.selected = false;
            }
            else {
                var currsel = $(".selected").html();
                console.log(currsel);
                if(currsel == "back"){
                    $(".message").remove();
                    $("#dialcontent").html(" ");
                    $("#dialogues").hide();
                    $("#selection").hide();
                    finalhandle = false;
                }
                else if(currsel == "investigate"){
                    var invlen = game.currentObj.investigate.length;
                    if(invlen == 1){
                        setTimeout(function(){
                            $("#dialcontent").html(game.currentObj.investigate[0]);
                                $(".selected").remove();
                                $("#back").addClass("selected");
                        }, 1000);
                    }
                    else{
                        $("#selection > p").remove();
                        $("#dialcontent").html("Which to investigate?");
                        for(var i = 0; i < invlen; i++){
                            if(game.currentObj.investigate[i].privacy == "hidden"){
                                console.log(game.currentObj.investigate[i].privacy);
                                continue;
                            }
                            var sbutton = "<p id=\"investigate\" class=\"message\">" + game.currentObj.investigate[i].name + "</p>";
                            $("#selection").append(sbutton);
                        }
                        var sbutton = "<p id=\"back\" class=\"message\">back</p>";
                        $("#selection").append(sbutton);
                        $("#selection > p").first().addClass("selected");
                    }
                }
                else if(currsel == "I know who the thief is"){
                    $("#dialcontent").html("Warning, I didn't have time to complete the debut section of the game(\"like court section in Ace Attorney\"). Choose yes to end game, though only one message in console log will tell you you wiin the game.");
                    $("#selection > p").remove();
                    var sbutton = "<p id=\"yes\" class=\"message\">yes</p>";
                    $("#selection").append(sbutton);
                    var sbutton = "<p id=\"back\" class=\"message\">back</p>";
                    $("#selection").append(sbutton);
                    $("#selection > p").first().addClass("selected");
                }
                else{
                    if($(".selected").html() == "yes"){
                        game.ended = true;
                        return;
                    }
                    else if(finalhandle){
                        console.log(game.currentObj);
                            var contlen = game.currentObj.investigate[1].content.length;
                            for(var i = 0; i < contlen; i++){
                                if($(".selected").html() == game.currentObj.investigate[1].content[i].name){
                                    $("#dialcontent").html(game.currentObj.investigate[1].content[i].content);
                                }
                            }
                    }
                    else{
                        var invlen = game.currentObj.investigate.length;
                        for(var i = 0; i < invlen; i++){
                            if($(".selected").html() == game.currentObj.investigate[i].name){
                                var contlen = game.currentObj.investigate[i].content.length;
                                if(contlen == 1){
                                    $("#dialcontent").html(game.currentObj.investigate[i].content); 
                                }
                                else {
                                    finalhandle = true;
                                    $("#selection > p").remove();
                                    $("#dialcontent").html("Who do you like to know?");
                                    for(var i = 0; i < contlen; i++){
                                        var sbutton = "<p id=\"investigate\" class=\"message\">" + game.currentObj.investigate[1].content[i].name + "</p>";
                                        $("#selection").append(sbutton);
                                    }
                                    var sbutton = "<p id=\"back\" class=\"message\">back</p>";
                                    $("#selection").append(sbutton);
                                    $("#selection > p").first().addClass("selected");
                                }
                            }
                        }
                    }
                }
            }
        }
    }).on("vmouseup", function(){
        $("#ctrl").removeClass("pressedbtn");
        game.flag = false;
        handelselection = false;

    });

    $("#jump").on("vmousedown", function(){
        game.ySpeed -= 15; 
        game.jumphandle = true;
        $("#jump").addClass("pressedbtn");
    }).on("vmouseup", function(){
        $("#jump").removeClass("pressedbtn");
        setTimeout(() => {
            game.jumphandle = false;
        }, 1500);
    });

    $(".npc").on("tap", function(e){
        var name = e.target.id;
        if(!game.dialoged){
            game.npcdial = true;
            switch(name){
                case "gray":
                    $("#gray").removeClass("pressednpc");
                    readDialogue(dialogue.gray);
                    break;
                case "white":
                $("#white").removeClass("pressednpc");

                    readDialogue(dialogue.white);
                    break;
                case "black":
                $("#black").removeClass("pressednpc");

                readDialogue(dialogue.black);
                    break;
                case "orange":
                $("#orange").removeClass("pressednpc");

                readDialogue(dialogue.orange);
                    break;
            }
        }
    });

});

function readDialogue(toberead){
    if($("#dialogues").is(":visible") && !game.selected){
        return;
    }
    game.selected = false;
    game.currentObj = toberead;
    $("#dialogues").show();
    $("#dialcontent").html(toberead.intro);
    $("#selection").show();
    if(game.npcdial){
        var invlen = game.currentObj.investigate.length;
        for(var i = 0; i < invlen; i++){
            if(game.currentObj.investigate[i].privacy == "hidden"){
                continue;
            }
            var sbutton = "<p id=\"investigate\" class=\"message\">" + game.currentObj.investigate[i].name + "</p>";
            $("#selection").append(sbutton);
        }
        $("#selection > p").first().addClass("selected");
    }
    else{
        let optionlength = toberead.investigate.length;
        $("#selection > p").remove();
        if(optionlength != 0){
            var sbutton = "<p id=\"investigate\" class=\"message\">investigate</p>";    
            $("#selection").append(sbutton);
        }
    }
    var sbutton = "<p id=\"back\" class=\"message\">back</p>";
    $("#selection").append(sbutton);
    $("#selection > p").first().addClass("selected");
    game.npcdial = false;
}

function selectDialogue(read1, read2){
    if($("#dialogues").is(":visible")){
        return;
    }
    game.selected = true;
    game.currentObj = read1;
    game.currentObj2 = read2;
    $("#dialogues").show();
    $("#selection").show();
    $("#dialcontent").html("Which one to invetigate?");
    var sbutton = "<p id=\"back\" class=\"message\">" + read1.name + "</p>";
    $("#selection").append(sbutton);
    var sbutton = "<p id=\"back\" class=\"message\">" + read2.name + "</p>";
    $("#selection").append(sbutton);
    var sbutton = "<p id=\"back\" class=\"message\">back</p>";
    $("#selection").append(sbutton);    
    $("#selection > p").first().addClass("selected");
}

var box2d = {
    scale: 30,
    
    init: function(){
        var gravity = new b2Vec2(0, 98);
        box2d.world = new b2World(gravity, true);

        var debugContext = document.getElementById('debugcanvas').getContext('2d');
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(debugContext);
        debugDraw.SetDrawScale(box2d.scale);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        box2d.world.SetDebugDraw(debugDraw);

        var listener = new Box2D.Dynamics.b2ContactListener;
        listener.PreSolve = function(contact){
            var body1 = contact.GetFixtureA().GetBody().GetUserData();
            var body2 = contact.GetFixtureB().GetBody().GetUserData();
            if((body1.type == "player" && body2.type == "interactives")){
                contact.SetEnabled(false);
                if(game.flag && !game.dialoged){
                    switch(body2.name){
                        case "door":
                            readDialogue(dialogue.door);
                            break;
                        case "shoerack":
                            readDialogue(dialogue.shoerack);
                            break;    
                        case "stereo":
                            readDialogue(dialogue.stereo);
                            break; 
                        case "tv":
                            selectDialogue(dialogue.tv, dialogue.sofa);
                            break;    
                        case "sofa":
                            selectDialogue(dialogue.sofa, dialogue.tv);
                            break; 
                        case "pot":
                            readDialogue(dialogue.pot);
                            break;    
                        case "catstand":
                            readDialogue(dialogue.catstand);
                            break; 
                        case "desk":
                            game.diaryed = true;
                            selectDialogue(dialogue.desk, dialogue.window);                
                            break;    
                        case "window":
                            selectDialogue(dialogue.window, dialogue.desk);
                            break; 
                        case "shelf":
                            readDialogue(dialogue.shelf);
                            break;    
                        case "catbed":
                            selectDialogue(dialogue.catbed, dialogue.photo);
                            break; 
                        case "bed":
                            selectDialogue(dialogue.bed, dialogue.photo);
                            break;    
                        case "photo":
                            readDialogue(dialogue.photo);
                            break; 
                        case "bedside":
                            readDialogue(dialogue.bedside);
                            break;
                    }
                }
            }
        }
        
        listener.BeginContact = function(contact){
            var body1 = contact.GetFixtureA().GetBody().GetUserData().type;
            var body2 = contact.GetFixtureB().GetBody().GetUserData().type;
            if((body1 == "player" && body2 == "interactives")
                || (body2 == "player" && body1 == "interactives")){
            }
        }  
        
        box2d.world.SetContactListener(listener); 
    },

    createRectangle:function(entity,definition){
        var bodyDef = new b2BodyDef;
        if(entity.isStatic){
            bodyDef.type = b2Body.b2_staticBody;
        } else {
//            console.log(entity.name);
            bodyDef.type = b2Body.b2_dynamicBody;
        }
        bodyDef.position.x = entity.x/box2d.scale;
        bodyDef.position.y = entity.y/box2d.scale;
        if (entity.angle) {
            bodyDef.angle = Math.PI*entity.angle/180;
        }
    
        var fixtureDef = new b2FixtureDef;
        fixtureDef.density = definition.density;
        fixtureDef.friction = definition.friction;
        fixtureDef.restitution = definition.restitution;
        fixtureDef.shape = new b2PolygonShape;
        fixtureDef.shape.SetAsBox(entity.width/2/box2d.scale, entity.height/2/box2d.scale);
    
        var body = box2d.world.CreateBody(bodyDef);
        body.SetUserData(entity);
        var fixture = body.CreateFixture(fixtureDef);
        return body;
    },
}

var entities = {
    definition: {
        "player": {
            isStatic: false,
            shape: "rectangle",
            width: 60,
            height: 60,
            density: 100,
            restitution: 0.05,
            friction: 0.7,
        },
        "bricks": {
            isStatic: true,
            shape: "rectangle",
            density: 1,
            restitution: 0,
            friction: 0,
        },
        "door": {
            isStatic: true,
            width: 180,
            height: 350,
        },
        "shoerack": {
            isStatic: true,
            width: 260,
            height: 150,
        },
        "stereo": {
            isStatic: true,
            width: 90,
            height: 290,
        },
        "tv": {
            isStatic: true,
            width: 550,
            height: 290,
        },
        "sofa": {
            isStatic: true,
            width: 580,
            height: 190,
        },
        "pot": {
            isStatic: true,
            width: 90,
            height: 190,
        },
        "catstand": {
            isStatic: true,
            width: 390,
            height: 310,
        },
        "desk": {
            isStatic: true,
            width: 350,
            height: 220,
        },
        "window": {
            isStatic: true,
            width: 320,
            height: 260,
        },
        "shelf": {
            isStatic: true,
            width: 340,
            height: 370,
        },
        "catbed": {
            isStatic: true,
            width: 160,
            height: 160,
        },
        "bed": {
            isStatic: true,
            width: 380,
            height: 260,
        },
        "photo": {
            isStatic: true,
            width: 500,
            height: 180,
        },
        "bedside": {
            isStatic: true,
            width: 120,
            height: 100,
        },
    },

    create: function(entity){
        var definition = entities.definition[entity.name];

        switch(entity.type){
            case "player":
                entity.shape = "rectangle";
                entity.width = definition.width;
                entity.height = definition.height;
                entity.isStatic = definition.isStatic;
                entity.sprite = loader.loadImage("./img/" + entity.name + ".png");
                box2d.createRectangle(entity,definition);
                break;
            case "bricks":
                entity.shape = "rectangle";
                entity.isStatic = definition.isStatic;
                entity.sprite = loader.loadImage("./img/" + entity.name + ".png");
                box2d.createRectangle(entity,definition);
                break;
            case "interactives":
                entity.shape = "rectangle";
                entity.width = definition.width;
                entity.height = definition.height;
                entity.isStatic = definition.isStatic;
                entity.sprite = loader.loadImage("./img/" + entity.name + ".png");
                box2d.createRectangle(entity,definition);
                break;
            default:
                console.log("Undefined entity type");
                break;
        }
    },

    draw: function(entity, position, angle){
        game.context.translate(position.x * box2d.scale - game.xOffset, position.y * box2d.scale - game.yOffset);
        game.context.rotate(angle);
        switch(entity.type){
            case "player":
                game.context.drawImage(entity.sprite, 0, 0, entity.sprite.width, entity.sprite.height,
                    -entity.width/2-1, -entity.height/2-1, entity.width+2, entity.height+2);
                break;
            case "bricks":   
                game.context.drawImage(entity.sprite, 0, 0, entity.sprite.width, entity.sprite.height,
                    -entity.width/2-1, -entity.height/2-1, entity.width+2, entity.height+2);             
                break;
            case "interactives":
                game.context.drawImage(entity.sprite, 0, 0, entity.sprite.width, entity.sprite.height,
                    -entity.width/2-1, -entity.height/2-1, entity.width+2, entity.height+2);
                break;
        }

        game.context.rotate(-angle);
        game.context.translate(-position.x * box2d.scale + game.xOffset, -position.y * box2d.scale + game.yOffset);
    },
}

var loader = {  
    loadImage:function(url){
        var image = new Image();
        image.src = url;
        return image;
    },
}

var camera = {
    follow: function(){
        if(!game.dialoged){
            if(game.xSpeed < 0){
                if(game.xCharCoor > 325){
                    game.xCharCoor += game.xSpeed;
                    if(game.xCharCoor < 325){
                        game.xCharCoor = 325;
                    }
                }
                else if(game.xOffset > 0){
                    game.xOffset += game.xSpeed;
                    if(game.xOffset <= 0){
                        game.xOffset = 0;
                    }
                }
                else{
                    game.xCharCoor += game.xSpeed;
                    game.xOffset = 0;
                    if(game.xCharCoor < 0){
                        game.xCharCoor = 0;
                    }
                }
            } 
            else if(game.xSpeed > 0){
                if(game.xCharCoor < 325){
                    game.xCharCoor += game.xSpeed;
                    if(game.xCharCoor > 325){
                        game.xCharCoor = 325;
                    }                
                }
                else if(game.xOffset < (gamebackground.width - game.canvas.width)){
                    game.xOffset += game.xSpeed;
                    if(game.xOffset >= (gamebackground.width - game.canvas.width)){
                        game.xOffset = (gamebackground.width - game.canvas.width);
                    }
                }
                else{
                    game.xCharCoor += game.xSpeed;
                    game.xOffset = (gamebackground.width - game.canvas.width);
                    if(game.xCharCoor > game.canvas.width - game.player.width){
                        game.xCharCoor = game.canvas.width - game.player.width;
                    }
                }
            }
        }
        
        if(game.ySpeed < 0){
            game.ySpeed += 9.8/100;
        }    
        game.yCharCoor += game.ySpeed;     
    },
}

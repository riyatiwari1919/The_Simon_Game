var selectRandomBtn = "";
var getSrcParent = "";
var score = 0;

function makeAnimation(value){
    document.querySelector("." + value).classList.add("clicked");
    var audio = new Audio("sounds/click.wav");
    audio.play();

    setTimeout(function(){
        document.querySelector("." + value).classList.remove("clicked");
    }, 100);
}

function levelChengedAnimation(){
    document.querySelector(".grid-container").classList.add("level-changed");
    var audio = new Audio("sounds/win.wav");
    audio.play();

    setTimeout(function(){
        document.querySelector(".grid-container").classList.remove("level-changed");
    }, 1000);
}

function gameOver(name){
        var audio = new Audio("sounds/loose.wav");
        audio.play();
        document.querySelector(".heading").classList.add("text-red");
        document.querySelector(".heading").innerHTML = "You Loose !<br> Refresh to play again !";
        document.querySelector(".score").innerHTML = name +"'s Score : " + score;
        document.querySelector(".grid-container").remove();
}


function generateRandomNumber(){
    var randomNo = Math.random();
    randomNo = Math.floor(randomNo * 4) + 1;
    return randomNo;
}

function changeColor(){
    randomNo = generateRandomNumber();
    console.log("random number generated to change color is : ", randomNo);

    let list = [0,1,2,3,4,1,2,3,4];
    
    for(var i = 0; i<4; i++){
        document.querySelectorAll(".image")[i].setAttribute("src",`images/color` + list[randomNo+i] + `.png`) ;
    }
}

function checkit(value, name){

    console.log("selected btn src : ",selectRandomBtn);
    console.log("clicked btn src : ",value);

    if(value == selectRandomBtn){
        score = score +10;
        getSrcParent.classList.remove("done");
        document.querySelector(".heading").classList.add("text-green");
        if(score==100 || score==200 || score==300){
            levelChengedAnimation();
            let level = document.querySelector(".heading").innerHTML;
            document.querySelector(".heading").innerHTML = level + "<br><marquee width='90%' direction='right'>Completed !</marquee>";
        }
        if(0<score && score<100){
            document.querySelector(".heading").innerHTML = "Level 1";
            console.log("score : ",score);
            console.log("level 1");
        }
        else if(100<score && score<200){
            document.querySelector(".heading").innerHTML = "Level 2";
            console.log("level 2");
        }
        else if(200<score && score<300){
            document.querySelector(".heading").innerHTML = "Level 3";
            console.log("level 3");
        }
        else if(score > 300){
            var audio = new Audio("sounds/drumJ.mp3");
            audio.play();
            document.querySelector(".heading").innerHTML = "Baap ho tum is Game ke! <br> Aur kya karna hai Khelke!";
            document.querySelector(".grid-container").remove();
            document.querySelector(".score").classList.add("hidden");
            console.log("Kya kroge Khelke!");
        }
        document.querySelector(".score").innerHTML = name +"'s Score : " + score;
    }
    else{
        gameOver(name);
    }

    if(score != 0){
        changeColor();
    }
}

document.querySelector(".play").addEventListener("click", function(){
    makeAnimation("play");

    document.querySelector(".play").disabled = true;
    let randomNo = generateRandomNumber();
    console.log("random number generated to select button is : ", randomNo);

    for(var i = 0; i<4; i++){
        getSrcParent = document.querySelectorAll(".image")[i];
        let getSrc = document.querySelectorAll(".image")[i].getAttribute("src");
        let tim = "images/color" + randomNo + ".png";
        if(getSrc == tim){
            getSrcParent.classList.add("done");
            selectRandomBtn = getSrc;
            break;
        }  
    }
    console.log("selected button is : " ,selectRandomBtn);
    alert("The button which appears in the white border at the begining (only once), has to be clicked each time. Remember that positions of buttons will changed after each click. Come on! play it. Good Luck!");

    let name = prompt("Enter player name : ");
    if (name == "" || name == null){
        name = "Player 1";
    }
    document.querySelector(".score").classList.remove("hidden");
    document.querySelector(".score").innerHTML = name + "'s Score";

    for(var i=0; i<4; i++){
        document.querySelectorAll(".image")[i].addEventListener("click", function(){
            makeAnimation(this.classList[0]);
            checkit(this.getAttribute("src"), name);
        });
    }
});

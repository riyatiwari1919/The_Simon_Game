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

function checkit(value){

    console.log("selected btn src : ",selectRandomBtn);
    console.log("clicked btn src : ",value);

    if(value == selectRandomBtn){
        score = score +10;
        getSrcParent.classList.remove("done");
        document.querySelector(".heading").classList.add("text-green");
        document.querySelector(".heading").innerHTML = "Right Click ! Carry ON !";
        document.querySelector(".score").innerHTML = "Your Score : " + score;
    }
    else{
        var audio = new Audio("sounds/loose.wav");
        audio.play();
        document.querySelector(".heading").classList.add("text-red");
        document.querySelector(".heading").innerHTML = "Wrong Click ! You Loose ! Refresh to play again !";
        document.querySelector(".score").innerHTML = "Your Score : " + score;
        document.querySelector(".grid-container").remove();
    }

    if(score != 0){
        changeColor();
    }
}

document.querySelector(".play").addEventListener("click", function(){
    makeAnimation("play");

    /*document.querySelector(".play").classList.add("clicked");
    var audio = new Audio("sounds/click.wav");
    audio.play();

    setTimeout(function(){
        document.querySelector("." + value).classList.remove("clicked");
    }, 100);*/

    document.querySelector(".play").disabled = true;
    let randomNo = generateRandomNumber();
    console.log("random number generated to select button is : ", randomNo);

    document.querySelector(".score").classList.remove("hidden");

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
    alert("The button which appears in the white border at the begining (only once), has to be clicked each time. Remember that positions of buttons will changed after each click. Come on! play it. Good Luck!")

    for(var i=0; i<4; i++){
        document.querySelectorAll(".image")[i].addEventListener("click", function(){
            makeAnimation(this.classList[0]);
            checkit(this.getAttribute("src"));
        });
    }
});
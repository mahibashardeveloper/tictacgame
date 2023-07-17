// declare some variable in css class and tag

const

    startingBox = document.querySelector(".starting-box"),

    selectX = startingBox.querySelector(".select-options .playerX"),

    selectO = startingBox.querySelector(".select-options .playerO"),

    boxContent = document.querySelector(".box-content"),

    players = document.querySelector(".players"),

    allBox = document.querySelectorAll("section span"),

    resultBox = document.querySelector(".result-box"),

    winText = resultBox.querySelector(".win-text"),

    replayBtn = resultBox.querySelector("button");

    soundEffect = document.querySelector('#sound-effect')

let

    // here declare play icons

    playerXIcon = "fas fa-times",

    playerOIcon = "far fa-circle",

    // have if playerSign = X then runBox = O otherwise playerSign 0 then runBox = O

    playerSign = "X",

    runBot = true;

// this is sound effect function for use of start game play

function playSoundEffect() {

    soundEffect.play();

}

// when click btn work for click button after start game in box-area

window.onload = ()=>{

    for (let i = 0; i < allBox.length; i++) {

        allBox[i].setAttribute("onclick", "clickedBox(this)");

    }

}

// when click x button this moment hide starting box and also buttons

selectX.onclick = ()=>{

    startingBox.classList.add("hide");

    boxContent.classList.add("show");

}

// when click y button this moment hide starting box and also buttons

selectO.onclick = ()=>{

    startingBox.classList.add("hide");

    boxContent.classList.add("show");

    players.setAttribute("class", "players active player");

}

// this clickedBox work when game starting box hide and visible game box-area

function clickedBox(element){

    playSoundEffect()

    if(players.classList.contains("player")){

        playerSign = "O";

        element.innerHTML = `<i class="${playerOIcon}"></i>`;

        players.classList.remove("active");

        element.setAttribute("id", playerSign);

    }else{

        element.innerHTML = `<i class="${playerXIcon}"></i>`;

        element.setAttribute("id", playerSign);

        players.classList.add("active");

    }

    selectWinner();

    element.style.pointerEvents = "none";

    boxContent.style.pointerEvents = "none";

    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();

    setTimeout(()=>{

        bot(runBot);

    }, randomTimeDelay);

}

// this is bot which is work play with me as an opponent

function bot(){

    playSoundEffect();

    let array = [];

    if(runBot){

        playerSign = "O";

        for (let i = 0; i < allBox.length; i++) {

            if(allBox[i].childElementCount === 0){

                array.push(i);

            }
        }

        let randomBox = array[Math.floor(Math.random() * array.length)];

        if(array.length > 0){

            if(players.classList.contains("player")){

                playerSign = "X";

                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;

                allBox[randomBox].setAttribute("id", playerSign);

                players.classList.add("active");

            }else{

                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;

                players.classList.remove("active");

                allBox[randomBox].setAttribute("id", playerSign);

            }

            selectWinner();

        }

        allBox[randomBox].style.pointerEvents = "none";

        boxContent.style.pointerEvents = "auto";

        playerSign = "X";

    }

}

// this function work as box id for random click by me and bot

function getIdVal(classname){

    return document.querySelector(".box" + classname).id;

}

// this function work as match three value or same to provide sign

function checkIdSign(val1, val2, val3, sign){

    if(getIdVal(val1) === sign && getIdVal(val2) === sign && getIdVal(val3) === sign){

        return true;

    }

}

// this function work when previous function successfully apply checkIdSign to provide who is winner bot or me

function selectWinner(){

    if(checkIdSign(1,2,3,playerSign) || checkIdSign(4,5,6, playerSign) || checkIdSign(7,8,9, playerSign) || checkIdSign(1,4,7, playerSign) || checkIdSign(2,5,8, playerSign) || checkIdSign(3,6,9, playerSign) || checkIdSign(1,5,9, playerSign) || checkIdSign(3,5,7, playerSign)){

        runBot = false;

        bot(runBot);

        setTimeout(()=>{

            resultBox.classList.add("show");

            boxContent.classList.remove("show");

        }, 350);

        winText.innerHTML = `Player <p>${playerSign}</p> won the game!`;

    }else{

        if(getIdVal(1) !== "" && getIdVal(2) !== "" && getIdVal(3) !== "" && getIdVal(4) !== "" && getIdVal(5) !== "" && getIdVal(6) !== "" && getIdVal(7) !== "" && getIdVal(8) !== "" && getIdVal(9) !== ""){

            runBot = false;

            bot(runBot);

            setTimeout(()=>{

                resultBox.classList.add("show");

                boxContent.classList.remove("show");

            }, 700);

            winText.textContent = "Match has been drawn!";

        }

    }

}

// this is the replayBtn when is reload button for reset game

replayBtn.onclick = ()=>{

    window.location.reload();

}
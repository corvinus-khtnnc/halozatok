﻿window.onload = function () {
    letöltés();

}

var sorszam = 0;
var kérdések;
var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában


function letöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) { //!!!!!!!!!!!!!
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
        )
    válasz1.style.backgroundColor = "steelblue";
    válasz2.style.backgroundColor = "steelblue";
    válasz3.style.backgroundColor = "steelblue";
    válasz1.style.color = "#d8edf0";
    válasz2.style.color = "#d8edf0";
    válasz3.style.color = "#d8edf0";


}

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d;
    kerdesMegjelenites(0)
}

fetch('/questions/4')
    .then(response => response.json())
    .then(data => console.log(data)
    );

fetch('/questions/1')
    .then(response => response.json())
    .then(data => kérdésMegjelenítés(data)
);

function kérdésMegjelenítés() {

    
    let kérdés_szöveg = document.getElementById("kérdés_szöveg");
    let elem = document.createElement("div");
    kérdés_szöveg.innerHTML = kérdések[sorszam].questionText
    kérdés_szöveg.appendChild(elem);


    let kép = document.getElementById("kép");
    let válasz1 = document.getElementById("válasz1");
    let válasz2 = document.getElementById("válasz2");
    let válasz3 = document.getElementById("válasz3");
    kép.src = "https://szoft1.comeback.hu/hajo/" + kérdések[sorszam].image;
    válasz1.innerText = kérdések[sorszam].answer1;
    válasz2.innerText = kérdések[sorszam].answer2;
    válasz3.innerText = kérdések[sorszam].answer3;

    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
}

function vissza() {
    if (sorszam == 0) {
        sorszam = 2;
        letöltés();

    }
    else {
        sorszam = sorszam - 1;
        letöltés();
    }
}

function elore() {
    if (sorszam == 2) {
        sorszam = 0;
        letöltés();

    }
    else {
        sorszam = sorszam + 1;
        letöltés();
    }
}

function ellenorzes() {
    let helyes = kérdések[sorszam].correctAnswer;
    console.log(helyes)

    if (helyes == 1) {
        válasz1.style.backgroundColor = "#b3ffc3";
        válasz1.style.color = "#287674";
        válasz2.style.backgroundColor = "#fdc6c6";
        válasz2.style.color = "#287674";
        válasz3.style.backgroundColor = "#fdc6c6";
        válasz3.style.color = "#287674";
    }


    if (helyes == 2) {
        válasz1.style.backgroundColor = "#fdc6c6";
        válasz1.style.color = "#287674";
        válasz2.style.backgroundColor = "#b3ffc3";
        válasz2.style.color = "#287674";
        válasz3.style.backgroundColor = "#fdc6c6";
        válasz3.style.color = "#287674";
    }


    if (helyes == 3) {
        válasz1.style.backgroundColor = "#fdc6c6";
        válasz1.style.color = "#287674";
        válasz2.style.backgroundColor = "#fdc6c6";
        válasz2.style.color = "#287674";
        válasz3.style.backgroundColor = "#b3ffc3";
        válasz3.style.color = "#287674";
    }

}

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data));
}    

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(válaszfeldolgozás)
        .then(kérdésMegjelenítés);
}

function válaszfeldolgozás(válasz) {
    if (!válasz.ok) {
        console.error(`Hibás válasz: ${response.status}`)
    }
    else {
        return válasz.json()
    }
}

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    //Első kérdések letöltése
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}
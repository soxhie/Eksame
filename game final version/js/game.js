window.addEventListener("load", showTitle);

// deklarerer variablerne point og tid
let point;
let liv;

// deklarerer constanterne carljohan og fluesvamp
const nicebaby = document.querySelector("#nicebaby_container");
const nicebaby2 = document.querySelector("#nicebaby_container2");

const evilbaby = document.querySelector("#evilbaby_container");

const bagmusic=document.querySelector("#forside_music");

function showTitle() {
  console.log("showTitle");

  // Skjuler alle skærme
  hideAllScreens();

  // Viser titelskærm
  document.querySelector("#start").classList.remove("hide");

  // Når man klikker på knappen så går man til startGame
  document.querySelector("#play").addEventListener("click", startGame);
}

function startGame() {
  console.log("startGame");

  // Skjuler alle skærme
  hideAllScreens();

  // nulstiller liv og point (sætter til startværdien)
  point = 0;
  liv = 3;

  bagmusic.play();
  
  // opdaterer point på htmlsiden
  document.querySelector("#mine_points").textContent = point;

  // nulstiller liv (hjerter) ved at fjerne klassen gray så de bliver "røde" igen
  document.querySelector("#heart1").classList.remove("gray");
  document.querySelector("#heart2").classList.remove("gray");
  document.querySelector("#heart3").classList.remove("gray");

  // starter timer
  document.querySelector("#sand").classList.add("timer");

  // går til endGame når tiden er gået (når timer-animationen er færdig)
  document.querySelector("#sand").addEventListener("animationend", endGame);

  
  nicebaby.classList.add("fald");
  let rnd = generateRandomNumber(10);
  nicebaby.classList.add("posFall" + rnd);
  rnd = generateRandomNumber(3);
  nicebaby.classList.add("speed" + rnd);
  nicebaby.classList.add("delay" + rnd);

  

  

  // starter falde-animation på FL svamp
  evilbaby.classList.add("fald");
  rnd = generateRandomNumber(5);
  evilbaby.classList.add("posFall" + rnd);
  rnd = generateRandomNumber(2);
  evilbaby.classList.add("speed" + rnd);
  rnd = generateRandomNumber(4);
  evilbaby.classList.add("delay" + rnd);

  // lytter efter klik på carljohan, gå til funktionen clicCarlJohan hvis der klikkes
  nicebaby.addEventListener("mousedown", clickNiceBaby);
  nicebaby2.addEventListener("mousedown", clickNiceBaby);
  
  // lytter efter klik på fluesvamp, gå til funktionen clicFlueSvamp hvis der klikkes
  evilbaby.addEventListener("mousedown", clickEvilBaby);

  // når carljohan har hoppet 1 gang, skal den dukke op et nyt sted (gå til reset funktionen)
  nicebaby.addEventListener("animationiteration", resetNiceBaby);
  nicebaby2.addEventListener("animationiteration", resetNiceBaby);
  
  // når fluesvamp har hoppet 1 gang, skal den dukke op et nyt sted (gå til reset funktionen)
  evilbaby.addEventListener("animationiteration", resetEvilBaby);
}

function clickNiceBaby() {
  console.log("clickNiceBaby");
  console.log(this);

  // stopper med at lytte efter klik (fjerner eventlistener)
  this.removeEventListener("click", clickNiceBaby);

  // afspiller carljohan lyd

  // Tæller op på point (kan også skrives: point++;)
  point = point + 1;
  // Skriver point ud (vis nyt pointtal på siden)
  document.querySelector("#mine_points").textContent = point;

  // Stopper hoppe-animation på container (sæt på pause ved at tilføje klassen frys)
  this.classList.add("frys");

  // Starter forsvind-animation på sprite
  this.firstElementChild.classList.add("forsvind");

  // Går til reset funktionen når forsvind-animationen er færdig
  this.addEventListener("animationend", resetNiceBaby);
}

function clickEvilBaby() {
  console.log("clickEvilBaby");

  // stopper med at lytte efter klik (fjerner eventlistener)
  evilbaby.removeEventListener("click", clickEvilBaby);

 


  // Hvis der er mere end 1 liv tilbage (liv > 1), så skal det (aktuelle) hjerte have effekten "gray"
  // Det aktuelle hjerte er det hjerte der svarer til det antal liv vi har tilbage (variablen: antalLiv)
  // Vi finder det aktuelle hjerte ved at sige "#liv" + antalliv
  // Ellers går vi til funktionen gameover
  if (liv > 1) {
    document.querySelector("#heart" + liv).classList.add("gray");
    liv = liv - 1;
    console.log(liv);
  } else {
    document.querySelector("#heart" + liv).classList.add("gray");
    endGame();
  }

  // Stopper falde-animation på container (sæt på pause ved at tilføje klassen frys)
  evilbaby.classList.add("frys");

  // Starter forsvind-animation på sprite
  document.querySelector("#evilbaby_sprite").classList.add("forsvind");

  // Går til reset funktionen når forsvind-animationen er færdig
  evilbaby.addEventListener("animationend", resetEvilBaby);
}

function resetNiceBaby() {
  console.log("Nicebaby reset");

  //fjerner alle klasser fra carljohans container (hop, frys og pos)
  this.classList = "";
  //fjerner alle klasser fra carljohans sprite (forsvind)
  this.firstElementChild.classList = "";

  // gør det muligt at sætte hoppeanimationen på igen med det samme
  this.offsetHeight;
  // genstarter hoppe-animation (hoppeanimation sættes på igen)
  this.classList.add("fald");

  // ny random position til svampen
  let rnd = generateRandomNumber(10);
  this.classList.add("pos" + rnd);
  // ny random speed
  rnd = generateRandomNumber(3);
  this.classList.add("speed" + rnd);

  // lytter efter klik på CarlJohan, går til funktionen clicCarlJohan hvis der klikkes
  this.addEventListener("mousedown", clickNiceBaby);
}

function resetEvilBaby() {
  console.log("Evil baby reset");

  //fjerner alle klasser fra carljohans container (hop, frys og pos)
  document.querySelector("#evilbaby_container").classList = "";
  //fjerner alle klasser fra carljohans sprite (forsvind)
  document.querySelector("#evilbaby_sprite").classList = "";

  // Giver containeren en ny random position/speed/delay
  let rnd = generateRandomNumber(5);
  document.querySelector("#evilbaby_container").classList.add("posFall" + rnd);
  rnd = generateRandomNumber(2);
  document.querySelector("#evilbaby_container").classList.add("speed" + rnd);
  rnd = generateRandomNumber(4);
  // document.querySelector("#fluesvamp_container").classList.add("delay" + rnd);

  // genstarter hoppe-animation (hoppeanimation sættes på igen)
  document.querySelector("#evilbaby_container").offsetHeight;
  document.querySelector("#evilbaby_container").classList.add("fald");

  // lytter efter klik på CarlJohan, gå til funktionen clicCarlJohan hvis der klikkes
  document.querySelector("#evilbaby_container").addEventListener("mousedown", clickEvilBaby);
}

function endGame() {
  console.log("endGame");

  if (liv <= 0) {
    gameOver();
  } else if (point >= 10) {
    levelComplete();
  } else {
    gameOver();
  }

  // stop timer og fjern eventlistener
  document.querySelector("#sand").classList.remove("timer");
  document.querySelector("#sand").removeEventListener("animationend", endGame);

  // Fjerner alle eventlistnere fra elementerne
  carljohan.removeEventListener("animationend", resetNiceBaby);
  carljohan.removeEventListener("animationiteration", resetNiceBaby);
  carljohan.removeEventListener("mousedown", clickNiceBaby);

  fluesvamp.removeEventListener("mousedown", clickEvilBaby);
  fluesvamp.removeEventListener("animationend", resetEvilBaby);
  fluesvamp.removeEventListener("animationiteration", resetEvilBaby);

  // Fjerner alle klasser fra elementerne
  nicebaby.classList = "";
  document.querySelector("#nicebaby_sprite").classList = "";
  evilbaby.classList = "";
  document.querySelector("#evilbaby_sprite").classList = "";
}

function gameOver() {
  console.log("gameOver");

  document.querySelector("#nicebaby_container").classList = "";

  // skjuler alle skærme
  hideAllScreens();

  // viser gameover skærm
  document.querySelector("#game_over").classList.remove("hide");

  // når der klikkes på knappen spil-igen går vi til startGame
  document.querySelector("#play_again_1").addEventListener("click", startGame);
}

function levelComplete() {
  console.log("levelComplete");

  // skjuler alle skærme
  hideAllScreens();

  // viser levelcomplete skærm
  document.querySelector("#level_complete").classList.remove("hide");

  // når der klikkes på knappen spil-igen går vi til startGame
  document.querySelector("#play_again_2").addEventListener("click", startGame);
}

function generateRandomNumber(num) {
  let rndNumber = Math.random();
  rndNumber = rndNumber * num;
  rndNumber = Math.floor(rndNumber);
  rndNumber = rndNumber + 1;

  return rndNumber;

  // return Math.floor(Math.random()*num)+1;
}

function hideAllScreens() {
  document.querySelector("#start").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
}

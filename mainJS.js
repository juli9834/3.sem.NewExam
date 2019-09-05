"use srict";

const personDataTemp = {
  fornavn: "navn",
  efternavn: "efternavn",
  email: "email",
  password: "password",
  tlfnummer: "tlfnummer",
  cpr: "cpr",
  bynavn: "",
  vejnavn: "vejnavn",
  husnummer: "husnummer",
  postnummer: "postnummer",
  land: "land"
}

const lang = `da-DK`

let speakText;

let person = Object.create(personDataTemp);

let personData = [];

let dataChecker = [];

const form = document.querySelector(".WonForm")

form.querySelector('input[name="fornavn"]').value = ""

form.querySelector('input[name="bynavn"]').value = ""

const formSignup1 = document.querySelector(".Signup1")

const formSignup2 = document.querySelector(".Signup2")

window.addEventListener("DOMContentLoaded", init);

let rolled = 0;

let LiveList;

let modal = document.querySelector(".formContainer");

let modalSignUp = document.querySelector(".formContainerSignup1");

let modalSignUp2 = document.querySelector(".formContainerSignup2");

let tilmeldKnap = document.querySelector(".tilmeld")

let rollButton = document.querySelector(".startButton");

let closeButtonWon = document.querySelector(".closeButton");

let closeButtonSignup1 = document.querySelector(".closeButton1");

let closeButtonSignup2 = document.querySelector(".closeButton2");


function init() {
  getPersonData()
  get();
  fetch("BingoMachine.svg").then(Response => Response.text()).then(svgData => {
    document.querySelector("#bingoWheel").insertAdjacentHTML("afterbegin", svgData);
  });
}

function rollDice() {
  let rolls = [];
  while (rolls.length < 4) {
    let = no1 = Math.ceil(Math.random() * 4);
    if (!rolls.includes(no1)) {
      rolls.push(no1)
    }
  }
  return rolls;
}

document.addEventListener("click", function (event) {
  if (event.target.closest(".Form")) return;
  document.querySelector(".formContainer").style.display = "none";
  console.log("hello")
})

rollButton.addEventListener("click", () => {
  rollButton.style.display = "none"
  document.querySelector(".formContainer").style.display = "grid";
  let bingoRolls = rollDice();
  let myRolls = rollDice()
  const t = document.querySelectorAll(".bingoRolls p")
  const t2 = document.querySelectorAll(".myRolls p")
  let i = 0;
  let win = 0;
  rolled += 1;
  speak(`Det første nummer er på vej`)

  t2.forEach((element, index) => {
    element.textContent = "-"
    element.style.backgroundColor = ""
  })

  t.forEach((element, index) => {
    element.textContent = ""
    element.style.backgroundColor = ""
  })

  function myLoop() {

    setTimeout(function () {
      t[i].textContent = bingoRolls[i]
      if (i == 0) {
        speak(`Det første nummer er ${bingoRolls[i]}`)
      } else if (i == 1) {
        speak(`andet nummer er ${bingoRolls[i]}`)
      } else if (i == 2) {
        speak(`tredje nummer er ${bingoRolls[i]}`)
      } else {
        speak(`og det sidste nummer er ${bingoRolls[i]}`)
      }
      if (myRolls.includes(Number(t[i].textContent))) {
        t[i].style.backgroundColor = "#3cbc8d";
        win += 1;
        console.log(win)
      };
      if (i == 3) {

        t2.forEach((element, index) => {

          if (bingoRolls.includes(myRolls[index])) {
            rollButton.style.display = "block";
            console.log(`rolled is ${rolled}`)
            if (rolled >= 3) {
              signUp();
            }
            element.style.backgroundColor = "#3cbc8d"
          }
        });
        if (win == 4) {
          winning();
          console.log("win")
        }
      };
      i++;
      if (i < t.length) {
        myLoop();
      }
    }, 4000)
  };

  myLoop();
  t2.forEach((element, index) => {
    element.textContent = myRolls[index]
  })
});

function winning() {
  speak("Du vinder")
  modal.style.display = "grid";
}

function signUp() {
  modalSignUp.style.display = "grid";
};

// rest API Live Feed

function get() {
  fetch("https://rockstardata-e28c.restdb.io/rest/minibingovindere", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5cf21329102f585b7c8536c9",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(json => {
      LiveList = json;
      console.table(json);
      liveDisplay(json);
    });
}

function getPersonData() {
  fetch("https://rockstardata-e28c.restdb.io/rest/danskespil", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5cf21329102f585b7c8536c9",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(json => {
      dataChecker = json;
      console.table(json);
    });
}

function liveDisplay(person) {
  document.querySelector(".liveContainer").textContent = "";
  for (let i = 0; i < 10; i++) {
    let nr = person.length - i - 1;
    let temp = document.querySelector("#liveFeedTemp").cloneNode(true).content;
    temp.querySelector(".dataNavn").textContent = `${person[nr].fornavn}`
    temp.querySelector(".dataBynavn").textContent = `Fra ${person[nr].bynavn}`
    document.querySelector(".liveContainer").appendChild(temp);
  }
}

form.addEventListener("submit", e => {
  e.preventDefault();
  person.fornavn = form.elements.fornavn.value
  person.bynavn = form.elements.bynavn.value
  console.log(personData)
  if (!form.elements.fornavn.value == "" && !form.elements.bynavn.value == "") {
    personData.push(person);
    modal.style.display = "none"
    console.log(person)
    post(personData, "minibingovindere")
    modalSignUp.style.display = "grid";
    formSignup1.querySelector('input[name="fornavn"]').value = person.fornavn;
  }
})

function post(NewPerson, link) {
  fetch(`https://rockstardata-e28c.restdb.io/rest/${link}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5cf21329102f585b7c8536c9",
      "cache-control": "no-cache"
    },
    body: JSON.stringify(NewPerson)
  })
    .then(res => res.json())
    .then(data => {
      console.log("hello");
      if (data.status) {
        console.log("ERROR");
      } else {
        get();
      }
    });
}

// Forms

formSignup1.elements.submit.disabled = true;
formSignup1.elements.email.value = ""
formSignup1.querySelector('input[name="submit"]').style.opacity = 0.5;
formSignup2.querySelector('input[name="submit"]').style.opacity = 1;

tilmeldKnap.addEventListener("click", () => {
  modalSignUp.style.display = "grid";
})



// sumit opacity
let emailCheck = 0;
let passCheck = 0;

function setSumitOp() {

  if (emailCheck == 1 && passCheck == 1) {

    formSignup1.querySelector('input[name="submit"]').style.opacity = 1;
  } else {

    formSignup1.querySelector('input[name="submit"]').style.opacity = 0.5;
  }

}

// email checker

formSignup1.elements.email.addEventListener("keyup", () => {
  let rawInput = formSignup1.elements.email.value;
  let inputData = rawInput.trim();
  let error = document.querySelector(".errormessage")
  let real = false
  let notSame = false

  if (
    formSignup1.elements.email.validity.valid &&
    formSignup1.elements.email.value !== ""
  ) {
    console.log("test")



    real = true;
    error.textContent = ""
  } else {

    real = false;
    error.textContent = "*Indtast venligst en rigtig email"
    formSignup1.elements.submit.disabled = true;
  }


  for (let i = 0; i < dataChecker.length; i++) {
    if (inputData == dataChecker[i].email) {
      console.log(dataChecker[i].email);
      console.log("user already exist");
      error.textContent = "*Denne email er allerede i brug"
      notSame = false;

      formSignup1.elements.submit.disabled = true;
      emailCheck = 0;
      setSumitOp()

      break;
    } else if (
      inputData !== dataChecker[i].email &&
      i == dataChecker.length - 1
    ) {
      if (
        formSignup1.elements.email.validity.valid &&
        formSignup1.elements.email.value !== ""
      ) {
        setSumitOp()
        emailCheck = 1;
        notSame = true
        error.textContent = ""
        console.log(inputData);
        console.log("user created");
      }
    }
  };


  if (real == true && notSame == true) {
    formSignup1.elements.submit.disabled = false;
  }
});


// password checker

formSignup1.elements.reenter.addEventListener("keyup", () => {
  let password = formSignup1.elements.password.value;
  let reenteredPassword = formSignup1.elements.reenter.value;
  let inputData = reenteredPassword.trim();
  let error = document.querySelector(".errormessagePass")

  if (
    password == inputData
  ) {
    setSumitOp()
    passCheck = 1;
    error.textContent = " "
    console.log("true")

  } else {
    setSumitOp()
    passCheck = 0
    error.textContent = "*Password has to match"
    console.log("not true")
  }

});

//signup Forms


formSignup1.addEventListener("submit", e => {
  e.preventDefault();

  person.fornavn = formSignup1.elements.fornavn.value
  person.efternavn = formSignup1.elements.efternavn.value
  person.email = formSignup1.elements.email.value
  person.tlfnummer = formSignup1.elements.tlfnummer.value
  person.password = formSignup1.elements.password.value
  modalSignUp.style.display = "none";
  modalSignUp2.style.display = "grid";
  formSignup2.querySelector('input[name="bynavn"]').value = person.bynavn;

  console.log(person)
});

formSignup2.addEventListener("submit", e => {
  e.preventDefault();

  person.cpr = formSignup2.elements.cpr.value
  person.land = formSignup2.elements.land.value
  person.bynavn = formSignup2.elements.bynavn.value
  person.vejnavn = formSignup2.elements.vejnavn.value
  person.husnummer = formSignup2.elements.husnummer.value
  person.postnummer = formSignup2.elements.postnummer.value
  personData = []
  personData.push(person);
  post(personData, "danskespil")

  console.log(personData);
  modalSignUp2.style.display = "none"
})

// text to speach

function speak(word) {
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(word));
}

// close buttons
closeButtonWon.addEventListener("click", () => {
  modal.style.display = "none";
});
closeButtonSignup1.addEventListener("click", () => {
  modalSignUp.style.display = "none";
});
closeButtonSignup2.addEventListener("click", () => {
  modalSignUp2.style.display = "none";
});


// pop up info

let infoButton = document.querySelector(".infoButton")
let infoButtonModal = document.querySelector(".popUp")

infoButton.addEventListener("click", () => {
  infoButtonModal.style.display = "none";
})

infoButtonModal.addEventListener("click", () => {
  infoButtonModal.style.display = "none";
})


// ===============================
// ELEMENTS
// ===============================

const loginScreen = document.getElementById("loginScreen");
const interestScreen = document.getElementById("interestScreen");
const mealChoiceScreen = document.getElementById("mealChoiceScreen");
const confirmationScreen = document.getElementById("confirmationScreen");
const dashboardScreen = document.getElementById("dashboardScreen");

const loginForm = document.getElementById("loginForm");

const rollInput = document.getElementById("rollInput");
const passwordInput = document.getElementById("passwordInput");

const interestButtons = document.querySelectorAll(".interest");
const interestContinue = document.getElementById("interestContinue");
const interestCount = document.getElementById("interestCount");

const mealChoices = document.querySelectorAll(".meal-choice");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

let selectedInterests = [];
let mealChoice = "";


// ===============================
// SCREEN SWITCH
// ===============================

function showScreen(screen){

  [
    loginScreen,
    interestScreen,
    mealChoiceScreen,
    confirmationScreen,
    dashboardScreen
  ].forEach(item => {
    item.classList.add("hidden");
  });

  screen.classList.remove("hidden");
}


// ===============================
// LOGIN
// ===============================

loginForm.addEventListener("submit", function(event){

  event.preventDefault();

  const roll = rollInput.value.trim();
  const password = passwordInput.value.trim();

  if(!roll || !password){
    showToast("Please enter your roll and password.");
    return;
  }

  localStorage.setItem(
    "foodLoopStudentRoll",
    roll
  );

  document.getElementById("studentRoll").textContent = roll;
  document.getElementById("dashRoll").textContent =
    `Student ${roll}`;

  showScreen(interestScreen);

});


// ===============================
// INTEREST SELECTION
// ===============================

interestButtons.forEach(button => {

  button.addEventListener("click", () => {

    const interest = button.dataset.interest;

    if(selectedInterests.includes(interest)){

      selectedInterests =
        selectedInterests.filter(item => item !== interest);

      button.classList.remove("selected");

    }else{

      selectedInterests.push(interest);

      button.classList.add("selected");

    }

    updateInterestButton();

  });

});


function updateInterestButton(){

  const count = selectedInterests.length;

  if(count < 2){

    interestCount.textContent =
      `Select ${2 - count} more interest${2-count > 1 ? "s" : ""}`;

    interestContinue.disabled = true;

  }else{

    interestCount.textContent =
      `${count} interests selected ✓`;

    interestContinue.disabled = false;

  }

}


// ===============================
// INTEREST CONTINUE
// ===============================

interestContinue.addEventListener("click", () => {

  localStorage.setItem(
    "foodLoopInterests",
    JSON.stringify(selectedInterests)
  );

  showScreen(mealChoiceScreen);

});


// ===============================
// TOMORROW'S MEAL
// ===============================

mealChoices.forEach(button => {

  button.addEventListener("click", () => {

    mealChoice = button.dataset.choice;

    saveMealChoice();

    updateConfirmation();

    showScreen(confirmationScreen);

  });

});


function saveMealChoice(){

  localStorage.setItem(
    "foodLoopTomorrowMeal",
    mealChoice
  );

}


// ===============================
// CONFIRMATION
// ===============================

function updateConfirmation(){

  const title =
    document.getElementById("confirmationTitle");

  const text =
    document.getElementById("confirmationText");

  const status =
    document.getElementById("choiceStatus");

  if(mealChoice === "yes"){

    title.textContent =
      "You're counted in.";

    text.textContent =
      "We've added your meal to tomorrow's cafeteria demand.";

    status.textContent =
      "✓ Meal confirmed";

  }else{

    title.textContent =
      "Thanks for letting us know.";

    text.textContent =
      "The cafeteria won't count your meal in tomorrow's expected demand.";

    status.textContent =
      "✓ No meal required";

  }

}


// ===============================
// DASHBOARD
// ===============================

document
  .getElementById("dashboardBtn")
  .addEventListener("click", () => {

    const roll =
      localStorage.getItem("foodLoopStudentRoll") ||
      "1907001";

    document.getElementById("dashRoll").textContent =
      `Student ${roll}`;

    document.getElementById("studentName").textContent =
      roll === "1907001" ? "Sunzid" : `Student ${roll}`;

    if(mealChoice === "no"){

      document.getElementById("dashboardChoice").textContent =
        "✓ Not eating";

    }else{

      document.getElementById("dashboardChoice").textContent =
        "✓ Confirmed";

    }

    showScreen(dashboardScreen);

  });


// ===============================
// ADMIN PORTAL
// ===============================

document
  .getElementById("adminPortalBtn")
  .addEventListener("click", () => {

    window.location.href = "admin.html";

  });


// ===============================
// TOAST
// ===============================

let toastTimer;

function showToast(message){

  toastMessage.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 3000);

}


// ===============================
// LOAD SAVED DATA
// ===============================

const savedRoll =
  localStorage.getItem("foodLoopStudentRoll");

const savedInterests =
  JSON.parse(
    localStorage.getItem("foodLoopInterests") || "[]"
  );

const savedMeal =
  localStorage.getItem("foodLoopTomorrowMeal");

if(savedRoll){

  rollInput.value = savedRoll;

}

if(savedInterests.length){

  selectedInterests = savedInterests;

  interestButtons.forEach(button => {

    if(selectedInterests.includes(button.dataset.interest)){

      button.classList.add("selected");

    }

  });

  updateInterestButton();

}

if(savedMeal){

  mealChoice = savedMeal;

}
// ===============================
// API CONFIGURATION
// ===============================

const API_URL =
  "https://forkathon2026-team-kuet-kumropotash.onrender.com";


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

const changeMealChoiceBtn =
  document.getElementById("changeMealChoiceBtn");

let selectedInterests = [];
let mealChoice = "";


// ===============================
// SCREEN SWITCH
// ===============================

function showScreen(screen) {

  [
    loginScreen,
    interestScreen,
    mealChoiceScreen,
    confirmationScreen,
    dashboardScreen
  ].forEach(item => {

    if (item) {
      item.classList.add("hidden");
    }

  });

  if (screen) {
    screen.classList.remove("hidden");
  }

}


// ===============================
// STUDENT LOGIN
// ===============================

loginForm.addEventListener("submit", async function (event) {

  event.preventDefault();

  const roll = rollInput.value.trim();
  const password = passwordInput.value.trim();

  if (!roll || !password) {

    showToast("Please enter your roll and password.");

    return;

  }


  try {

    const response = await fetch(
      `${API_URL}/api/student/login`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          roll: roll,
          password: password
        })
      }
    );


    if (!response.ok) {

      throw new Error(
        `Server returned ${response.status}`
      );

    }


    const data = await response.json();


    if (!data.success) {

      showToast(
        data.message || "Login failed."
      );

      return;

    }


    // Save student roll locally
    localStorage.setItem(
      "foodLoopStudentRoll",
      roll
    );


    const studentRoll =
      document.getElementById("studentRoll");

    const dashRoll =
      document.getElementById("dashRoll");


    if (studentRoll) {
      studentRoll.textContent = roll;
    }

    if (dashRoll) {
      dashRoll.textContent = `Student ${roll}`;
    }


    console.log(
      data.new_student
        ? "New student registered successfully."
        : "Existing student logged in successfully."
    );


    showScreen(interestScreen);


  } catch (error) {

    console.error(
      "Login error:",
      error
    );

    showToast(
      "Could not connect to the server."
    );

  }

});


// ===============================
// INTEREST SELECTION
// ===============================

interestButtons.forEach(button => {

  button.addEventListener("click", () => {

    const interest =
      button.dataset.interest;


    if (selectedInterests.includes(interest)) {

      selectedInterests =
        selectedInterests.filter(
          item => item !== interest
        );

      button.classList.remove("selected");

    } else {

      selectedInterests.push(interest);

      button.classList.add("selected");

    }


    updateInterestButton();

  });

});


// ===============================
// UPDATE INTEREST BUTTON
// ===============================

function updateInterestButton() {

  const count =
    selectedInterests.length;


  if (count < 2) {

    interestCount.textContent =
      `Select ${2 - count} more interest${2 - count > 1 ? "s" : ""}`;

    interestContinue.disabled = true;

  } else {

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

    mealChoice =
      button.dataset.choice;


    saveMealChoice();

    updateConfirmation();

    showScreen(confirmationScreen);

  });

});


// ===============================
// SAVE MEAL CHOICE TO BACKEND
// ===============================

async function saveMealChoice() {

  const roll =
    localStorage.getItem(
      "foodLoopStudentRoll"
    );


  if (!roll) {

    console.error(
      "Student roll not found."
    );

    return;

  }


  try {

    const response = await fetch(
      `${API_URL}/api/meal-choice`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          roll: roll,

          choice: mealChoice,

          interests: selectedInterests

        })
      }
    );


    if (!response.ok) {

      throw new Error(
        `Server returned ${response.status}`
      );

    }


    const data =
      await response.json();


    if (data.success) {

      localStorage.setItem(
        "foodLoopTomorrowMeal",
        mealChoice
      );


      console.log(
        "Meal choice saved to MongoDB:",
        data
      );

    } else {

      console.error(
        "Failed to save meal choice:",
        data
      );

    }


  } catch (error) {

    console.error(
      "Backend connection error:",
      error
    );

  }

}


// ===============================
// CONFIRMATION
// ===============================

function updateConfirmation() {

  const title =
    document.getElementById(
      "confirmationTitle"
    );

  const text =
    document.getElementById(
      "confirmationText"
    );

  const status =
    document.getElementById(
      "choiceStatus"
    );


  if (mealChoice === "yes") {

    title.textContent =
      "You're counted in.";

    text.textContent =
      "We've added your meal to tomorrow's cafeteria demand.";

    status.textContent =
      "✓ Meal confirmed";

  } else {

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
      localStorage.getItem(
        "foodLoopStudentRoll"
      ) || "1907001";


    const dashRoll =
      document.getElementById(
        "dashRoll"
      );

    const studentName =
      document.getElementById(
        "studentName"
      );


    if (dashRoll) {

      dashRoll.textContent =
        `Student ${roll}`;

    }


    if (studentName) {

      studentName.textContent =
        roll === "1907001"
          ? "Sunzid"
          : `Student ${roll}`;

    }


    const dashboardChoice =
      document.getElementById(
        "dashboardChoice"
      );

    const dashboardChoiceText =
      document.getElementById(
        "dashboardChoiceText"
      );


    if (mealChoice === "yes") {

      dashboardChoice.textContent =
        "✓ Confirmed";

      dashboardChoiceText.textContent =
        "Your response has been recorded.";

    }

    else if (mealChoice === "no") {

      dashboardChoice.textContent =
        "✓ Not eating";

      dashboardChoiceText.textContent =
        "The cafeteria won't prepare a meal for you.";

    }

    else {

      dashboardChoice.textContent =
        "Not selected";

      dashboardChoiceText.textContent =
        "You haven't selected your meal yet.";

    }


    showScreen(
      dashboardScreen
    );

  });


// ===============================
// CHANGE MEAL CHOICE
// ===============================

document
  .getElementById("changeMealChoiceBtn")
  .addEventListener("click", () => {

    showScreen(
      mealChoiceScreen
    );

  });


// ===============================
// ADMIN PORTAL
// ===============================

document
  .getElementById("adminPortalBtn")
  .addEventListener("click", () => {

    window.location.href =
      "admin.html";

  });


// ===============================
// TOAST
// ===============================

let toastTimer;


function showToast(message) {

  toastMessage.textContent =
    message;


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
  localStorage.getItem(
    "foodLoopStudentRoll"
  );


const savedInterests =
  JSON.parse(
    localStorage.getItem(
      "foodLoopInterests"
    ) || "[]"
  );


const savedMeal =
  localStorage.getItem(
    "foodLoopTomorrowMeal"
  );


// Restore roll

if (savedRoll) {

  rollInput.value =
    savedRoll;

}


// Restore interests

if (savedInterests.length) {

  selectedInterests =
    savedInterests;


  interestButtons.forEach(button => {

    if (
      selectedInterests.includes(
        button.dataset.interest
      )
    ) {

      button.classList.add(
        "selected"
      );

    }

  });


  updateInterestButton();

}


// Restore meal choice

if (savedMeal) {

  mealChoice =
    savedMeal;

}
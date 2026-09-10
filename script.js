const meals = [
  {id:1,name:"Chicken Biryani",subtitle:"Basmati rice · egg · salad",price:85,left:36,time:"12:00–2:30 PM",tag:"Popular",tone:"amber",emoji:"🍛"},
  {id:2,name:"Vegetable Khichuri",subtitle:"Lentils · seasonal vegetables",price:60,left:22,time:"12:00–2:30 PM",tag:"Low waste",tone:"sage",emoji:"🥣"},
  {id:3,name:"Grilled Chicken Bowl",subtitle:"Chicken · greens · rice",price:95,left:14,time:"1:00–3:00 PM",tag:"High protein",tone:"blue",emoji:"🥗"}
];

let reserved = JSON.parse(
  localStorage.getItem("foodLoopReserved") || "[]"
);

const grid = document.getElementById("mealGrid");
const navCount = document.getElementById("navCount");
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");


// ===============================
// STUDENT INFO
// ===============================

const studentRoll =
  localStorage.getItem("foodLoopStudentRoll") || "1907001";


// ===============================
// DYNAMIC STUDENT NAME / ROLL
// ===============================

const pageTitle = document.getElementById("pageTitle");

if (pageTitle) {
  pageTitle.textContent =
    studentRoll === "1907001"
      ? "Good morning, Sunzid."
      : `Good morning, Student ${studentRoll}.`;
}


// Sidebar student name
const userRow = document.querySelector(".user-row strong");

if (userRow) {
  userRow.textContent = `Student ${studentRoll}`;
}


// ===============================
// MEALS
// ===============================

function renderMeals(filter = "") {

  const q = filter.trim().toLowerCase();

  const visible = meals.filter(m =>
    `${m.name} ${m.subtitle}`
      .toLowerCase()
      .includes(q)
  );

  grid.innerHTML = visible.length
    ? visible.map(meal => {

        const isReserved =
          reserved.includes(meal.id);

        return `
          <article class="meal-card">

            <div class="meal-visual ${meal.tone}">
              <span>${meal.emoji}</span>
              <b>${meal.tag}</b>
              <button title="More options">•••</button>
            </div>

            <div class="meal-info">

              <div class="meal-name">

                <div>
                  <strong>${meal.name}</strong>
                  <small>${meal.subtitle}</small>
                </div>

                <span>৳${meal.price}</span>

              </div>

              <div class="meal-details">
                <span>◷ ${meal.time}</span>
                <span>💧 ${meal.left} left</span>
              </div>

              <div class="meal-action">

                <small>
                  Freshly prepared today
                </small>

                <button
                  class="reserve ${isReserved ? "reserved" : ""}"
                  data-id="${meal.id}"
                >
                  ${isReserved
                    ? "✓ Reserved"
                    : "🎟 Reserve"}
                </button>

              </div>

            </div>

          </article>
        `;

      }).join("")

    : `
      <div style="
        grid-column:1/-1;
        padding:30px;
        text-align:center;
        color:#7d8982;
        background:#fff;
        border:1px solid #dce5dc;
        border-radius:18px
      ">
        No meals found.
      </div>
    `;


  document.querySelectorAll(".reserve")
    .forEach(btn => {

      btn.addEventListener("click", () => {

        reserveMeal(
          Number(btn.dataset.id)
        );

      });

    });

}


// ===============================
// RESERVE MEAL
// ===============================

function reserveMeal(id) {

  const meal =
    meals.find(m => m.id === id);

  if (reserved.includes(id)) {

    showToast(
      `${meal.name} is already reserved.`
    );

    return;
  }

  reserved.push(id);

  localStorage.setItem(
    "foodLoopReserved",
    JSON.stringify(reserved)
  );

  updateCount();

  renderMeals(
    document.getElementById("searchInput").value
  );

  showToast(
    `${meal.name} reserved. Pickup token LP-${String(id).padStart(3,"0")} is ready.`
  );

}


// ===============================
// RESERVATION COUNT
// ===============================

function updateCount() {

  if (navCount) {
    navCount.textContent =
      reserved.length;
  }

}


// ===============================
// TOAST
// ===============================

function showToast(message) {

  toastText.textContent =
    message;

  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer =
    setTimeout(
      () => toast.classList.remove("show"),
      3200
    );

}


// ===============================
// SEARCH
// ===============================

document
  .getElementById("searchInput")
  .addEventListener("input", e => {

    renderMeals(e.target.value);

  });


// ===============================
// CLOSE TOAST
// ===============================

document
  .getElementById("toastClose")
  .addEventListener("click", () => {

    toast.classList.remove("show");

  });


// ===============================
// NAVIGATION
// ===============================

document
  .querySelectorAll(".nav-item")
  .forEach(item => {

    item.addEventListener("click", () => {

      document
        .querySelectorAll(".nav-item")
        .forEach(n =>
          n.classList.remove("active")
        );

      item.classList.add("active");

      const page =
        item.dataset.page;


      if (page === "Overview") {

        pageTitle.textContent =
          studentRoll === "1907001"
            ? "Good morning, Sunzid."
            : `Good morning, Student ${studentRoll}.`;

      } else {

        pageTitle.textContent =
          page;

      }


      if (page === "Today's Menu") {

        document
          .getElementById("fullMenuBtn")
          .scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

      }


      if (page === "Reservations") {

        showToast(
          reserved.length
            ? `${reserved.length} meal reservation${reserved.length > 1 ? "s" : ""} active.`
            : "You have no reservations yet."
        );

      }


      if (page === "Rescue Meals") {

        showToast(
          "7 surplus meals are available nearby."
        );

      }


      if (page === "My Impact") {

        document
          .querySelector(".impact-card")
          .scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

      }


      document
        .getElementById("sidebar")
        .classList.remove("open");

    });

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
// MOBILE MENU
// ===============================

document
  .getElementById("menuBtn")
  .addEventListener("click", () => {

    document
      .getElementById("sidebar")
      .classList.toggle("open");

  });


// ===============================
// HERO BUTTONS
// ===============================

document
  .getElementById("menuBtnHero")
  .addEventListener("click", () => {

    document
      .getElementById("fullMenuBtn")
      .scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

  });


document
  .getElementById("impactBtn")
  .addEventListener("click", () => {

    document
      .querySelector(".impact-card")
      .scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

  });


document
  .getElementById("fullMenuBtn")
  .addEventListener("click", () => {

    document
      .querySelector(".meal-grid")
      .scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

  });


// ===============================
// OTHER BUTTONS
// ===============================

document
  .getElementById("historyBtn")
  .addEventListener("click", () => {

    showToast(
      "Impact history is ready for the next prototype screen."
    );

  });


document
  .getElementById("rescueBtn")
  .addEventListener("click", () => {

    showToast(
      "7 surplus meals nearby — rescue window ends at 3:30 PM."
    );

  });


document
  .getElementById("notificationBtn")
  .addEventListener("click", () => {

    showToast(
      "No new notifications. You're all caught up."
    );

  });


// ===============================
// LOGOUT
// ===============================

document
  .getElementById("logoutBtn")
  .addEventListener("click", () => {

    // Clear student session
    localStorage.removeItem(
      "foodLoopStudentRoll"
    );

    localStorage.removeItem(
      "foodLoopInterests"
    );

    localStorage.removeItem(
      "foodLoopTomorrowMeal"
    );

    localStorage.removeItem(
      "foodLoopReserved"
    );

    // Back to login
    window.location.href =
      "student.html";

  });


// ===============================
// INITIAL LOAD
// ===============================

renderMeals();

updateCount();
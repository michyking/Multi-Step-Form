const slidePage = document.querySelector(".slide-page");

const circle = document.querySelector(".circle");
const circleBg = document.querySelector(".circle-bg");
const monthlyText = document.querySelector("#monthly-text");
const yearlyText = document.querySelector("#yearly-text");

const plans = document.querySelectorAll(".plan");
const durations = document.querySelectorAll(".duration");
const bonus = document.querySelectorAll(".bonus");
const arcadeYearlyPrice = document.querySelector(".amount1");
const advancedYearlyPrice = document.querySelector(".amount2");
const proYearlyPrice = document.querySelector(".amount3");

// GETTING THE ERRORS
const nameErrors = document.querySelector(".error1");
const emailErrors = document.querySelector(".error2");
const phoneErrors = document.querySelector(".error3");

// GETTING THE INPUTS
let fullNameInput = document.querySelector(".name");
let emailInput = document.querySelector(".email");
let phoneNumberInput = document.querySelector(".phone");

// GET NEXT BUTTONS
const firstNext = document.querySelector(".firstNext");
const secondNext = document.querySelector(".next-1");
const thirdNext = document.querySelector(".next-2");
const confirm = document.querySelector(".confirm");

// GET PREVIOUS BUTTONS
const firstPrev = document.querySelector(".prev-1");
const secondPrev = document.querySelector(".prev-2");
const thirdPrev = document.querySelector(".prev-3");

// THE STEPS
const stepOne = document.querySelector(".step-1");
const stepTwo = document.querySelector(".step-2");
const stepThird = document.querySelector(".step-3");
const stepFour = document.querySelector(".step-4");

// GETTING THE SUMMARY ITEMS 
const summarizedPlanName = document.querySelector(".summarized-plan");
const summarizedPlanPrice = document.querySelector(".plan-price");
const changeBtn = document.querySelector(".change");
const planDuration = document.querySelector(".plan-duration");
const totalDuration = document.querySelector(".total-duration");
const sumTotal = document.querySelector(".sum-total");
let addonsSummaryElement = document.querySelector(".addons-summary");

// CLICK FUNCTIONALITY ON THE NEXT BUTTONS

stepOne.classList.add("active");
firstNext.addEventListener("click", (e) => {
  e.preventDefault();

  // CLEAR ALL ERRORS
  nameErrors.textContent = "";
  emailErrors.textContent = "";
  phoneErrors.textContent = "";

  // Get the values from the input fields
  let fullName = fullNameInput.value;
  let email = emailInput.value;
  let phoneNumber = phoneNumberInput.value;

  if (fullName === "" || email === "" || phoneNumber === "") {
    if (fullName === "") {
      nameErrors.textContent = "Full name is required";
    }
    if (email === "") {
      emailErrors.textContent = "Email address is required";
    }
    if (phoneNumber === "") {
      phoneErrors.textContent = "Phone Number is required";
    }
  } else {
    slidePage.style.marginLeft = "-40%";
    stepOne.classList.remove("active");
    stepTwo.classList.add("active");
  }
});

// FUNCTIONALITY FOR THE SECOND PAGE

const monthlyPrices = {
  Arcade: 9,
  Advanced: 12,
  Pro: 15,
};

let selectedPlan = null;
let planPrice = undefined;
let selectedPlanName = "";

plans.forEach((plan) => {
  plan.addEventListener("click", (e) => {
    if (selectedPlan) {
      selectedPlan.classList.remove("active-plan");
    }

    //  Select the clicked plan
    selectedPlan = plan;
    selectedPlan.classList.add("active-plan");

    selectedPlanName = selectedPlan.querySelector("h3").textContent;

    updatePlanPrice();
    enableSecondNext();
    summaryPage();
  });
});

let isToggled = false;

circleBg.addEventListener("click", (e) => {
  if (isToggled) {
    circle.style.transform = "translateX(0)"; // Move to the left
    monthlyText.classList.add("active-text");
    yearlyText.classList.remove("active-text");
  } else {
    circle.style.transform = "translateX(100%)"; // Move to the right
    yearlyText.classList.add("active-text");
    monthlyText.classList.remove("active-text");
  }

  isToggled = !isToggled;

  updatePlanPrice();
});

function updatePlanPrice() {

   const selectedPlanKey = selectedPlanName;
   const basePrice = monthlyPrices[selectedPlanKey];

   if (isToggled) {
     planPrice = basePrice * 10;
   } else {
     planPrice = basePrice;
   }

  if (isToggled) {
    arcadeYearlyPrice.textContent = monthlyPrices.Arcade * 10;
    advancedYearlyPrice.textContent = monthlyPrices.Advanced * 10;
    proYearlyPrice.textContent = monthlyPrices.Pro * 10;

    durations.forEach((duration) => {
      duration.textContent = "/yr";
    });

    bonus.forEach((element)=>{
      element.textContent = "2 months free";
    })

    planDuration.textContent = "(yearly)";
    totalDuration.textContent = "(per year)";
  } else {
    arcadeYearlyPrice.textContent = monthlyPrices.Arcade;
    advancedYearlyPrice.textContent = monthlyPrices.Advanced;
    proYearlyPrice.textContent = monthlyPrices.Pro;

    durations.forEach((duration) => {
      duration.textContent = "/mo";
    });

    bonus.forEach((element) => {
      element.textContent = "";
    });
    planDuration.textContent = "(monthly)";
    totalDuration.textContent = "(per month)";

  }
  summaryPage(); // Update the summary page
}

// Function to enable the 'secondNext' button
function enableSecondNext() {
  secondNext.removeAttribute("disabled");
}
// Initial state: Disable the 'secondNext' button
secondNext.setAttribute("disabled", "disabled");

secondNext.addEventListener("click", (e) => {
  e.preventDefault();

  if (!selectedPlan) {
    // console.log("select plan");
    return;
  }
  slidePage.style.marginLeft = "-80%";
  stepTwo.classList.remove("active");
  stepThird.classList.add("active");
});

// FUNCTIONALITY FOR THE THIRD PAGE & BUTTON 

const selectedAddOns = [];
const addonsName =[];
function storeAddOns(){
  // Clear arrays before adding new selections
  selectedAddOns.length = 0;
  addonsName.length = 0;

  const checkboxes = document.querySelectorAll('input[type = "checkbox"]');
  checkboxes.forEach((checkbox) => {

    if (checkbox.checked) {
      selectedAddOns.push(checkbox.value);
      addonsName.push(checkbox.name);
    }
  });

  summaryPage();
}


thirdNext.addEventListener("click", (e) => {
  e.preventDefault();
  storeAddOns();

  if(selectedAddOns.length === 0){
    return;
  }else{
    slidePage.style.marginLeft = "-120%";
    stepThird.classList.remove("active");
    stepFour.classList.add("active");
  }

});

// FUNCTON FOR THE SUMMARY PAGE

function summaryPage(){

  summarizedPlanName.textContent = selectedPlanName;
  summarizedPlanPrice.textContent = planPrice;

  // Clear the content of addonsSummaryElement before adding new addons
  addonsSummaryElement.innerHTML = "";

  let totalAddOns = 0;

  selectedAddOns.forEach((addon, index) => {
    let addonName = addonsName[index];
    addonsSummaryElement.innerHTML += `
      <div class ="oya-addon">
          <p>${addonName}</p>
          <p>+$<span>${addon}</span></p>
      </div>
      `;

      totalAddOns += parseInt(addon);

      let grandTotal = totalAddOns + planPrice;
    sumTotal.textContent = `$${grandTotal}`
  });
}

changeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  slidePage.style.marginLeft = "-40%"; // Set the margin to go back to the second step
  stepFour.classList.remove("active");
  stepTwo.classList.add("active");
});

// FUNCTIONALITY FOR THE CONFRIM BUTTON 

confirm.addEventListener("click", (e)=>{
  e.preventDefault();
    slidePage.style.marginLeft = "-160%";
})

// CLICK FUNCTIONALITY ON THE PREVIOUS BUTTONS

firstPrev.addEventListener("click", (e) => {
  e.preventDefault();
  slidePage.style.marginLeft = "0%";
  stepOne.classList.add("active");
  stepTwo.classList.remove("active");
});

secondPrev.addEventListener("click", (e) => {
  e.preventDefault();
  slidePage.style.marginLeft = "-40%";
  stepTwo.classList.add("active");
  stepThird.classList.remove("active");
});

thirdPrev.addEventListener("click", (e) => {
  e.preventDefault();
  slidePage.style.marginLeft = "-80%";
  stepThird.classList.add("active");
  stepFour.classList.remove("active");
});
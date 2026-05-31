const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


// Dropdown Currency Options
for (let select of dropdowns) {

    for (currCode in countryList) {

        let newOption = document.createElement("option");

        newOption.innerText = currCode;
        newOption.value = currCode;

        // Default Selected Options
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";

        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    // Flag Change
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}


// Update Flag Function
const updateFlag = (element) => {

    let currCode = element.value;

    let countryCode = countryList[currCode];

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");

    img.src = newSrc;
};


// Button Click Event
btn.addEventListener("click", async (evt) => {

    evt.preventDefault();

    let amount = document.querySelector(".amount input");

    let amtVal = amount.value;

    // Invalid Input Handling
    if (amtVal === "" || amtVal < 1) {

        amtVal = 1;
        amount.value = "1";
    }

    // API URL
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    // Fetch API Data
    let response = await fetch(URL);

    let data = await response.json();

    // Exchange Rate
    let rate =
        data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    // Final Converted Amount
    let finalAmount = amtVal * rate;

    // Show Result
    msg.innerText =
        `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.getElementById("loading").style.display = "none";
    document.getElementById("pageContent").style.display = "flex";
  }, 1500);
});
let purchased =JSON.parse(localStorage.getItem("purchased")) || [];;
let checkoutCount = document.getElementById("checkoutCount");

let main = document.querySelector("main");
let items = JSON.parse(localStorage.getItem("items"));
let searchButton = document.getElementById("searchButton");
let searchInput = document.getElementById("searchInput");

let pastryButton = document.getElementById("pastryButton");
let croissantsButton = document.getElementById("croissantsButton");
let bagelButton = document.getElementById("bagelButton");
let biscoffeeButton = document.getElementById("biscoffeeButton");
let cafeButton = document.getElementById("cafeButton");
let filterButton = document.getElementById("filterButton");
let clearButton = document.getElementById("clearButton");
//search function duurh
function searchItems() {
  const searchValue = searchInput.value.toLowerCase(); //taking in the search value from the input
  const currentItems = getCurrentItems(); //applying active class
  const filteredItems = currentItems.filter(
    //search by name and type
    (item) =>
      item.name.toLowerCase().includes(searchValue) || //display/include everything or item
      item.type.toLowerCase().includes(searchValue)
  );
  itemsToShow(filteredItems);
}
checkoutCount.textContent = `${purchased.length}`
searchInput.addEventListener("change", searchItems); //basically onchange
searchButton.addEventListener("click", searchItems); //same as ontop

const pastry = items.filter((item) => item.type.toLowerCase() === "pastry");
const croissants = items.filter(
  (item) => item.type.toLowerCase() === "croissants"
);
const bagel = items.filter((item) => item.type.toLowerCase() === "bagel");
const biscoffee = items.filter(
  (item) => item.type.toLowerCase() === "biscoffee"
);
const cafe = items.filter((item) => item.type.toLowerCase() === "cafe");
const filter = items.filter((item) => item.type.toLowerCase() === "filter");

itemsToShow(items);

function itemsToShow(items) {
  main.innerHTML = items
    .map(function (item, index) {
      return `
       <div class="productCard">
          <img class="photo width-25 rounded-2 border p-4 bg-white" src=${item.url}>
          <h2 class="itemName">${item.name}</h2>
          <p class="text">${item.description}</p>
          <p>R${item.price}</p>
          <button class="button text-white rounded-4 " value='${index}' data-add>Add To Cart</button>
          </div>
          `;
    })
    .join("");
}

itemsToShow(items);

function checkoutCounterRealtime() {
  checkoutCount.textContent = `${purchased.length}`;
} //this is the function I made for the items thats in the cart to show in realtime
function add(itemsArray, index) {
  purchased.push(itemsArray[index]);
  localStorage.setItem("purchased", JSON.stringify(purchased));
  checkoutCounterRealtime();
}
main.addEventListener("click", function (event) {
  if (event.target.hasAttribute("data-add")) {
    const currentItems = getCurrentItems();
    add(currentItems, event.target.value);
  }
});

function getCurrentItems() {
  if (pastryButton.classList.contains("active")) {
    return pastry;
  } else if (croissantsButton.classList.contains("active")) {
    return croissants;
  } else if (bagelButton.classList.contains("active")) {
    return bagel;
  } else if (biscoffeeButton.classList.contains("active")) {
    return biscoffee;
  } else if (cafeButton.classList.contains("active")) {
    return cafe;
  } else if (filterButton.classList.contains("active")) {
    return filter;
  } else {
    return items;
  }
}

pastryButton.addEventListener("click", function () {
  itemsToShow(pastry);
  activateButton(pastryButton);
});
croissantsButton.addEventListener("click", function () {
  itemsToShow(croissants);
  activateButton(croissantsButton);
});
bagelButton.addEventListener("click", function () {
  itemsToShow(bagel);
  activateButton(bagelButton);
});
biscoffeeButton.addEventListener("click", function () {
  itemsToShow(biscoffee);
  activateButton(biscoffeeButton);
});
cafeButton.addEventListener("click", function () {
  itemsToShow(cafe);
  activateButton(cafeButton);
});
filterButton.addEventListener("click", function () {
  itemsToShow(filter);
  activateButton(filterButton);
});
clearButton.addEventListener("click", function () {
  itemsToShow(items);
  deactivateAllButtons(clearButton);
});

function activateButton(button) {
  deactivateAllButtons();
  button.classList.add("active");
}

function deactivateAllButtons() {
  pastryButton.classList.remove("active");
  croissantsButton.classList.remove("active");
  bagelButton.classList.remove("active");
  biscoffeeButton.classList.remove("active");
  cafeButton.classList.remove("active");
  filterButton.classList.remove("active");
}


function getCurrentYear() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  document.getElementById("currentYear").innerText = currentYear;
}

// Call the function to set the current year when the page loads
getCurrentYear();

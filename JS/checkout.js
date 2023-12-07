let purchased = JSON.parse(localStorage.getItem("purchased"));
let table = document.querySelector("main");
let totalAmountElement = document.getElementById("totalAmount");
let payNowButton = document.getElementById("payNow");

// Create an object to store item counts
let itemCounter = {};

// Function to remove an item from the purchased array
function removeFromCheckout(itemName) {
  purchased = purchased.filter((item) => item.name !== itemName);
  checkOutItems();
  // Update the local storage with the modified purchased array
  localStorage.setItem("purchased", JSON.stringify(purchased));
}

// Function to update the display after modifying the purchased array
function checkOutItems() {
  // Count the occurrences of each item
  itemCounter = {};
  let totalCost = 0;

  purchased.forEach((item) => {
    const itemName = item.name;
    itemCounter[itemName] = (itemCounter[itemName] || 0) + 1;
    totalCost += item.price;
  });

  // Generate HTML with item information and counts
  table.innerHTML = Object.keys(itemCounter).map((itemName) => {
    const item = purchased.find((purchasedItem) => purchasedItem.name === itemName);
    const count = itemCounter[itemName];
    const totalPriceForItem = item.price * count;

    return `
        <div class="productCard">
          <img class="photo width-25 rounded-2 border p-3" src=${item.url}>
          <h3 class="itemName">${itemName}</h3>
          <p class="text">${item.description}</p>
          <p>Count: ${count}</p>
          <p> R${totalPriceForItem.toFixed(2)}</p>
          <button class="checkoutRemoveBtn" onclick="removeFromCheckout('${itemName}')">Remove</button>
        </div>
    `;
  }).join('');

  // Update the total amount in the HTML
  totalAmountElement.innerText = `R${totalCost.toFixed(2)}`;
}

// Event listener for the "Pay Now" button
payNowButton.addEventListener("click", handlePayment);

// Function to handle the payment
function handlePayment() {
  localStorage.removeItem("purchased");
  purchased = [];
  totalAmountElement.textContent = "R0.00";
  payNowButton.style.display = "none";
  alert("Payment successful!");
  checkOutItems(); // You can also call renderCheckoutItems() if that's the correct function
}

checkOutItems();

function getCurrentYear() {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    document.getElementById("currentYear").innerText = currentYear;
  } catch (error) {
    alert("Error during getCurrentYear:", error);
  }
}

// Call the function to set the current year when the page loads
getCurrentYear();
let purchased = JSON.parse(localStorage.getItem("purchased"));
let table = document.querySelector("table");
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

  //this code iterates through each item in the purchased array, counts the occurrences of each item's name using an object itemCounter and calculates the total cost by summing up the prices of all items in the array.
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

    // <img class="photo width-25 rounded-2 border p-3" src=${item.url}>
    return `
        <tr class="">
          <td><img class="itemUrl " src="${item.url}"</td>
          <td  class=" col-2">${itemName}</td>
          <td class="text col-2">${item.description}</td>
          <td class="col-2">Count: ${count}</td>
          <td class="col-2"> R${totalPriceForItem.toFixed(2)}</td>
          <td class="col-1">
          <button class="checkoutRemoveBtn" onclick="removeFromCheckout('${itemName}')">Remove</button>
          </td>
        </tr>
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
  // alert("Payment successful!");
  document.getElementById("customAlertModal").style.display = "block";
  checkOutItems(); // You can also call renderCheckoutItems() if that's the correct function
}

checkOutItems();

let closeModalPaymentBtn = document.getElementById("closeModalPaymentBtn")

let closeModalPayment = closeModalPaymentBtn.addEventListener("click", closeCustomAlertModal);

function closeCustomAlertModal() {
  document.getElementById("customAlertModal").style.display = "none";
}



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
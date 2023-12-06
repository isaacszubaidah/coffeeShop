let purchased = JSON.parse(localStorage.getItem("purchased"));
let table = document.querySelector("main");

// Create a map to store item counts
let itemCounter = new Map();

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
  itemCounter.clear();
  purchased.forEach((item) => {
    const itemName = item.name;
    itemCounter.set(itemName, (itemCounter.get(itemName) || 0) + 1);
  });

  // Generate HTML with item information and counts
  table.innerHTML = [...itemCounter.keys()].map((itemName) => {
    const item = purchased.find((purchasedItem) => purchasedItem.name === itemName);
    const count = itemCounter.get(itemName);

    return `
      <div class="productCard">
        <img class="photo width-25 rounded-2 border p-3" src=${item.url}>
        <h3 class="itemName">${itemName}</h3>
        <p class="text">${item.description}</p>
        <p>R${item.price}</p>
        <p>Count: ${count}</p>
        <button onclick="removeFromCheckout('${itemName}')">Remove</button>
      </div>
    `;
  }).join('');
}
checkOutItems();

function getCurrentYear() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  document.getElementById("currentYear").innerText = currentYear;
}

// Call the function to set the current year when the page loads
getCurrentYear();

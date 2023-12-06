let purchased = JSON.parse(localStorage.getItem("purchased"));
let table = document.querySelector("main");

table.innerHTML = purchased.map((item, index) => {
  return `
   <div class="productCard">
   <img class="photo width-25 rounded-2 border p-3" src=${item.url}>
   <h3 class="itemName">${item.name}</h3>
   <p class="text">${item.description}</p>
   <p>R${item.price}</p>
</div>

    `
}).join('');
function getCurrentYear() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  document.getElementById("currentYear").innerText = currentYear;
}

// Call the function to set the current year when the page loads
getCurrentYear();

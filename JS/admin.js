//this is where all products will be stored
let items = [];

//function to create objects
function Constructor(id, name, description, price, url, type) {
  this.id = id;
  this.name = name;
  this.description = description;
  this.price = price;
  this.url = url;
  this.type = type;
}

// this the function to sort the products in all the sorts I have
let itemsSavedInLocalStorage = JSON.parse(localStorage.getItem("items")) || [];

function sortItems(option) {
  switch (option) {
    case "nameAsc":
      itemsSavedInLocalStorage.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "nameDesc":
      itemsSavedInLocalStorage.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "priceAsc":
      itemsSavedInLocalStorage.sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      itemsSavedInLocalStorage.sort((a, b) => b.price - a.price);
      break;
    default:
      // Default sorting (by ID)
      itemsSavedInLocalStorage.sort((a, b) => a.id - b.id);
  }

  // Refresh the table after sorting
  storeItems();
}

// Add an event listener for the select element to trigger sorting
document.getElementById("sortSelect").addEventListener("change", function () {
  const selectedOption = this.value;
  sortItems(selectedOption);
});

// //second item created using contructive
document
  .getElementById("submitButton")
  .addEventListener("click", addToLocalStorage);
function addToLocalStorage(event) {
  event.preventDefault();

  const itemPrice = document.getElementById("itemPrice").value;
  const itemName = document.getElementById("itemName").value;
  const itemDescription = document.getElementById("itemDescription").value;
  const itemUrl = document.getElementById("itemUrl").value;
  const itemType = document.getElementById("itemType").value;

  if (isNaN(itemPrice) || !itemName || !itemDescription || !itemUrl || !itemType) {
    alert("Please add in all values.");
    return;
  }

  const objectConstruct = new Constructor(
    items.length + 1,
    itemName,
    itemDescription,
    itemPrice,
    itemUrl,
    itemType
  );

  console.log("objectConstruct", objectConstruct);
  items.push(objectConstruct);


  document.getElementById("itemPrice").value = "";
  document.getElementById("itemName").value = "";
  document.getElementById("itemDescription").value = "";
  document.getElementById("itemUrl").value = "";
  document.getElementById("itemType").value = "";

  setArrayItems();
  storeItems();
}
// this function edits the products on the page
function editItem(index) {
  const modal = document.getElementById("staticBackdrop");
  const editedNameInput = document.getElementById("editedName");
  const editedDescriptionInput = document.getElementById("editedDescription");
  const editedPriceInput = document.getElementById("editedPrice");
  const editedUrlInput = document.getElementById("editedUrl");
  const editedType = document.getElementById("editedType");
  const saveButton = document.getElementById("saveEdit");

  editedNameInput.value = items[index].name;
  editedDescriptionInput.value = items[index].description;
  editedPriceInput.value = items[index].price;
  editedUrlInput.value = items[index].url;
  editedType.value = items[index].type;

  modal.style.display = "block";

  saveButton.onclick = function () {
    const editedName = editedNameInput.value;
    const editedDescription = editedDescriptionInput.value;
    const editedPrice = parseFloat(editedPriceInput.value);
    const editedUrl = editedUrlInput.value;
    const editedTypes = editedType.value;

    if (
      editedName &&
      editedDescription &&
      !isNaN(editedPrice) &&
      editedUrl &&
      editedType
    ) {
      items[index].name = editedName;
      items[index].description = editedDescription;
      items[index].price = editedPrice;
      items[index].url = editedUrl;
      items[index].type = editedTypes;

      setArrayItems();
      storeItems();
      modal.style.display = "none";
    } else {
      alert("Invalid input. Editing canceled.");
    }
  };
}

if (itemsSavedInLocalStorage.length > 0) {
  items = itemsSavedInLocalStorage;
} else {
  // add default items if local storage is empty
  let item1 = new Constructor(
    1,
    "Pastry Catering",
    "This is better than the fake",
    15,
    "https://i.postimg.cc/hv84NT0F/Espresso-Yourself-3.png",
    "pastry"
  );
  let item2 = new Constructor(
    2,
    "Fresh Croissants",
    "A little bliss in every bite",
    15,
    "https://i.postimg.cc/253pnhbk/Espresso-Yourself-2.png",
    "croissants"
  );
  let item3 = new Constructor(
    3,
    "Breakfast Bagel",
    "I am a bagel with soul.",
    50,
    "https://i.postimg.cc/pr4vchPK/Fully-Loaded-Salmon-Bagel-Sandwich-Something-About-Sandwiches-1.jpg",
    "bagel"
  );
  let item4 = new Constructor(
    4,
    "Biscoffee",
    "Iced Coffee with a side of Lotus Biscoff Desserts.",
    75,
    "https://i.postimg.cc/GtSV3ZNR/Dalgona-Coffee-Inspo.jpg",
    "biscoffee"
  );
  let item5 = new Constructor(
    5,
    "Caffe Latte",
    " Sip into a world of possibilities with our lattes",
    45,
    "https://i.postimg.cc/0jGtRBSk/download.jpg",
    "cafe"
  );
  let item6 = new Constructor(
    6,
    "Filter Coffee",
    "Better Beans, Better Coffee",
    50,
    "https://i.postimg.cc/k595FjNQ/Dining-Essentials-Made-Easy-with-Your-Bloomingdale-s-Registry.jpg",
    "filter"
  );
  // push default items into the array
  items.push(item1, item2, item3, item4, item5, item6);
  // set the array in local storage
  setArrayItems()
}


let table = document.querySelector("table");
function storeItems() {

  let headerRow = `
  <tr>
    <th scope="col">Product Image</th>
    <th scope="col">Product ID</th>
    <th scope="col">Product Name</th>
    <th scope="col">Product Price</th>
    <th scope="col">Product Description</th>
    <th scope="col">Edit Product</th>
    <th scope="col">Delete Product</th>
  </tr>
`;

  let products = itemsSavedInLocalStorage.map(function (item, index) {
    return `
    <tr class="adminTable col-12">
      <td><img class="itemUrl col-1" src="${item.url}"</td>
      <td class="col-2">${item.id}</td>
      <td class="col-2">${item.name}</td>
      <td class="col-2">R${item.price}</td>
      <td class="col-2">${item.description}</td>
      <td class="col-1"><button class="editBtn" onclick="editItem(${index})" data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button">Edit</button></td>
      <td class="col-1"><button class="delete" value='${index}'>Delete</button></td>
    </tr>
  `;
  });


  // table.innerHTML = products.join("");
  table.innerHTML = headerRow + products.join("");

  let deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      remove(button.value);
    });
  });
}

// this function removes only the first item
function remove(position) {
  console.log("🚀 ~ file: admin.js:238 ~ remove ~ position:", position)
  items.splice(position, 1);
  setArrayItems();
  storeItems();
}

function setArrayItems() {
  localStorage.setItem("items", JSON.stringify(items));
  //sets the array from local storage array(items)in code
}

setArrayItems();
storeItems();


function getCurrentYear() {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    document.getElementById("currentYear").innerText = currentYear;
  } catch (error) {
    console.error("Error during getCurrentYear:", error);
  }
}

// Call the function to set the current year when the page loads
getCurrentYear();



















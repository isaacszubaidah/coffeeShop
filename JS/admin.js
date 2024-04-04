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

  //below I am using DOM Manipulation
  const itemPrice = document.getElementById("itemPrice").value;
  const itemName = document.getElementById("itemName").value;
  const itemDescription = document.getElementById("itemDescription").value;
  const itemUrl = document.getElementById("itemUrl").value;
  const itemType = document.getElementById("itemType").value;

  //this code creates a validation check on the retrieved values
  if (isNaN(itemPrice) || !itemName || !itemDescription || !itemUrl || !itemType) {
    alert("Please add in all values.");
    return;
  }

  //here I am creating an object
  const objectConstruct = new Constructor(
    items.length + 1, //this is used to generate a new index or Id for theobject created
    itemName,
    itemDescription,
    itemPrice,
    itemUrl,
    itemType
  );

  console.log("objectConstruct", objectConstruct);
  items.push(objectConstruct);

// this code below is setting the property values to an empty string
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
  // calling the ids I set in the html to enable DOM M anipulation

  editedNameInput.value = items[index].name;
  editedDescriptionInput.value = items[index].description;
  editedPriceInput.value = items[index].price;
  editedUrlInput.value = items[index].url;
  editedType.value = items[index].type;

  modal.style.display = "block";//this sets the style the modal to display block

  saveButton.onclick = function () {
    const editedName = editedNameInput.value;
    const editedDescription = editedDescriptionInput.value;
    const editedPrice = parseFloat(editedPriceInput.value);
    const editedUrl = editedUrlInput.value;
    const editedTypes = editedType.value;

    //If all inputs are valid  not empty, price is a valid number, and URL is present, it updates the corresponding items array at the specified index with the new values.
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
      //calls the functions mentioned above in order to modify the edited products
      modal.style.display = "none"; //then the modal will be hidden with this 
    } else {
      alert("Invalid input. Editing canceled.");//this alert will come up once 
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
    "https://lh3.googleusercontent.com/drive-viewer/AEYmBYRfLlY9-qnuXdbVOTTHaZYMI5_auhHVCOaBU2f_wdNdWvtPkARDdYQnill8KnwC-9Es2oqsi4_NEj_V_pSjo_9vCbvERg=s2560",
    "pastry"
  );
  let item2 = new Constructor(
    2,
    "Fresh Croissants",
    "A little bliss in every bite",
    15,
    "https://lh3.googleusercontent.com/drive-viewer/AKGpihaDRKJqmPzY9VUip1ooEdDIQimI0bhjRO4trMFoMK8KLXXaUllQo-FskP-ZAgiQOYiGg3Ejc37RaKLOTB5VEXHtSCGk3r2cAg=s2560",
    "croissants"
  );
  let item3 = new Constructor(
    3,
    "Breakfast Bagel",
    "I am a bagel with soul.",
    50,
    "https://lh3.googleusercontent.com/drive-viewer/AKGpihZRPzPGaJC_H3XLpAk5yp6bEtDU6W7zpnQWL4bwC9LoukiQHJj39Ap2AdlzeH_W5m_wu8gmf_sgiqJebbBYxjjDWuQpaBCLukk=s1600-v0",
    "bagel"
  );
  let item4 = new Constructor(
    4,
    "Biscoffee",
    "Iced Coffee with a side of Lotus Biscoff Desserts.",
    75,
    "https://lh3.googleusercontent.com/drive-viewer/AKGpihZ_r0KRhkjY9XLrw-p4D_zxCYCC5B912uS8Lx5_zs2HCaA3UC3T4MGLeU3u8dm5nQSPaZ3rz7iAG66oaeR54mDVd_taCBpzd_A=s2560",
    "biscoffee"
  );
  let item5 = new Constructor(
    5,
    "Caffe Latte",
    " Sip into a world of possibilities with our lattes",
    45,
    "https://lh3.googleusercontent.com/drive-viewer/AKGpihaOXr54xHDghlhzMUvi6WeRU8bhfJawMYWcjST8Z0haJ2UJ18VL7A7Qta46d9rPQDg1J0vWzm7c3lrJiaFRcCz0Ad0yfke6rpM=s1600-v0",
    "cafe"
  );
  let item6 = new Constructor(
    6,
    "Filter Coffee",
    "Better Beans, Better Coffee",
    50,
    "https://lh3.googleusercontent.com/drive-viewer/AKGpihY4yk279gXeTrZxEMbGSOTTxJnu42keL2zgxsEVrmpneIUSIx2ugtQtbMdXdl9ZndNPbXFkOGmG-OHqB00XeFaTrnrynOb2Zmg=s1600-v0",
    "filter"
  );
  // push default items into the array
  items.push(item1, item2, item3, item4, item5, item6);
  // set the array in local storage
  setArrayItems()
}


let table = document.querySelector("table");

//this function displays the items into a table so when loaded the content will be presented into the table
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
  let products = items.map(function (item, index) {
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
//here I am joinig both the row and the products
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
  items.splice(position, 1); //this deletes only the first item
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



















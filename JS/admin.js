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
// //second item created using contructive
document
  .getElementById("submitButton")
  .addEventListener("click", addToLocalStorage);
function addToLocalStorage() {
  event.preventDefault();
  let itemPrice = document.getElementById("itemPrice").value;
  let itemName = document.getElementById("itemPrice").value;
  let itemDescription = document.getElementById("itemPrice").value;
  let itemUrl = document.getElementById("itemPrice").value;
  let itemType = document.getElementById("itemPrice").value;
  if (
    isNaN(itemPrice) ||
    !itemName ||
    !itemDescription ||
    !itemUrl ||
    !itemType
  ) {
    alert("Please add in all values.");
    return; //stops the execution of function
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
  favourite();
}

//THESE NEED TO BE CREATED VIA NEW FUCNCTION AND A FORM!!!
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

//pushing items into the array
items.push(item1, item2, item3, item4, item5, item6);
//set the array in local storage

let table = document.querySelector("table");
function anything() {
  itemsSavedInLocalStorage = JSON.parse(localStorage.getItem("items"));
  let products = itemsSavedInLocalStorage.map(function (item, index) {
    return `
           <tr>
              <td>${item.id}</td>
              <td>${item.name}</td>
              <td>R${item.price}</td>
              <td>${item.description}</td>
              <td><img class src =${item.url}</td>
              <td><button>Edit</button></td>
              <td><button class="delete" value= '${index}'>Delete</button></td>

           </tr>
        `;
  });

  function remove(position) {
    items.splice(position, 1);
    favourite();
    anything();
  }

  let deleteButton = document.querySelector(".delete");
  table.addEventListener("click", function () {
    if (event.target.classList.contains("delete")) {
      remove(event.target.value);
    }
  });
  table.innerHTML = products.join("");
}

function favourite() {
  localStorage.setItem("items", JSON.stringify(items));
  //sets the array from local storage array(items)in code
}

favourite();
anything();

table.style.backgroundColor = "#87ceeb";

// function one(){

// }
// function two(callBack){
//          callBack()
// };
// two(one())

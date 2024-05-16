let doener = [
  {
    dishes: "Yufka",
    ingredients: "mit Dönerfleisch, Salat und Sauce",
    prices: "9.50",
    image: "./img/shawarma.jpg",
  },
  {
    dishes: "Döner",
    ingredients: "im Fladenbrot mit Dönerfleisch, Salat und Sauce",
    prices: "7.50",
    image: "./img/doner.jpg",
  },
  {
    dishes: "Dönerteller",
    ingredients: "mit Dönerfleisch, Salat, Sauce und Pommes frites",
    prices: "14.00",
    image: "./img/food-photo.jpg",
  },
];
let pizza = [
  {
    dishes: "Pizza Armor",
    ingredients: "mit frischen Tomaten und Oliven",
    prices: "9.50",
    image: "./img/pizza.jpg",
  },
  {
    dishes: "Pizza Bruschetta",
    ingredients: "mit Hähnchenbrust, Mais, Zwiebeln und Champignons",
    prices: "9.50",
    image: "./img/pizza3.jpg",
  },
  {
    dishes: "Pizza Hawai",
    ingredients: "mit Putenschinken und Ananas",
    prices: "9.50",
    image: "./img/pizza4.jpg",
  },
];
let drink = [
  {
    dishes: "Coca Cola 0,33l",
    prices: "2.00",
    description: "zzgl. Pfand (0,25 €), Enthält Koffein (10,00 mg/100 ml), 6,06 €/l, 330ml",
  },
  {
    dishes: "Coca Cola 0,5l",
    prices: "2.50",
    description: "zzgl. Pfand (0,25 €), Enthält Koffein (10,00 mg/100 ml), 5,00 €/l, 500ml",
  },
  {
    dishes: "Coca Cola 1,0l",
    prices: "3.85",
    description: "zzgl. Pfand (0,15 €), Enthält Koffein (10,00 mg/100 ml), 3,85 €/l, 1l",
  },
];

let pricesOfOne = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let manyDishes = ["Doener", "Pizza", "Drink"];
let manyDishesHelp = [doener, pizza, drink];

let j; // Zähler für die Anzahl und Summe der einzelnen Gerichte

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

function render() {
  document.getElementById("showDishResponsive").classList.add("d-none");
  for (let k = 0; k < manyDishes.length; k++) {
    const moreDishes = manyDishes[k];
    let dish = document.getElementById(`dish${moreDishes}`);
    dish.innerHTML = "";
    for (let i = 0; i < manyDishesHelp[k].length; i++) {
      const single = manyDishesHelp[k][i];

      dish.innerHTML += renderHTML(single, i, k, moreDishes);
    }
  }
}

function renderHTML(single, i, k, moreDishes) {
  if (Object.keys(single).length > 3) {
    return /*html*/ `
      <div class="dish" onclick='add(${i}, ${k}, "${moreDishes}", event)'>
        <div class="eat">
            <div id="singleEat${moreDishes}${i}" class="singleEat"><h3>${single["dishes"]}</h3><img src="./img/info.png" alt=""></div>
            <div id="ingredients${moreDishes}${i}" class="ingredients">${single["ingredients"]}</div>
            <div id="price${moreDishes}${i}" class="price"><h3>${single["prices"].replace(".", ",")} €</h3> </div>
          </div>
          <div class="eatImage">
            <img src="${single["image"]}" alt="" />
          </div>
          <div>
            <button onclick="add(${i}, ${k}, '${moreDishes}', event)" class="addEat">+</button>
          </div>
        </div>
      </div>
      `;
  } else {
    return /*html*/ `
        <div class="dish" onclick='add(${i}, ${k}, "${moreDishes}", event)'>
          <div class="eat">
              <div id="single${moreDishes}${i}" class="singleEat"><h3>${single["dishes"]}</h3><img src="./img/info.png" alt=""></div>
              <div id="price${moreDishes}${i}" class="price"><h3>${single["prices"].replace(".", ",")} €</h3></div>
              <div id="description${moreDishes}${i}" class="description">${single["description"]}</div>
            </div> 
            <div>
              <button onclick="add(${i}, ${k}, '${moreDishes}', event)" class="addEat">+</button>
            </div>
          </div>
        </div>
        `;
  }
}

function renderBasket() {
  for (let k = 0; k < manyDishes.length; k++) {
    const moreDishes = manyDishes[k];
    let basket = document.getElementById(`amount${moreDishes}`);
    basket.innerHTML = "";
    for (let i = 0; i < manyDishesHelp[k].length; i++) {
      basket.innerHTML += /*html*/ `
    <div id="amounts${moreDishes}${i}" class="amount"></div>
     `;
    }
  }
  result();
}

//Add-Functions

function add(i, k, moreDishes, event) {
  let dishes = document.getElementById(`amounts${moreDishes}${i}`);
  dishes.innerHTML = "";
  j = pricesOfOne[k][i];
  j++;
  let resultPrices = manyDishesHelp[k][i]["prices"] * j;
  resultPrices = resultPrices.toFixed(2);
  pricesOfOne[k][i] = j;
  if (j <= 1) {
    dishes.innerHTML += addReomveHTML(j, i, k, moreDishes, resultPrices);
  } else {
    dishes.innerHTML = addReomveHTML(j, i, k, moreDishes, resultPrices);
  }

  event.stopPropagation();
  result();
}

function addReomveHTML(j, i, k, moreDishes, resultPrices) {
  return /*html*/ `
  <div id="amounts${moreDishes}${i}" class="amount">
  <div>${j}</div>
  <div><h3>${manyDishesHelp[k][i]["dishes"]}</h3></div>
  <button onclick='add(${i}, ${k}, "${moreDishes}", event)'>+</button>
   <button onclick="remove(${i}, ${k}, '${moreDishes}')">-</button>
   <div><h3>${resultPrices.replace(".", ",")} €</h3></div>
  </div>
   `;
}

function result() {
  let result = document.getElementById("result");
  result.innerHTML = "";
  let sum = 0;
  for (let k = 0; k < manyDishes.length; k++) {
    //Ja, ich kann das auch alles in einer For-Schleife machen. Die Längen könnten sich aber unterscheiden.
    for (let i = 0; i < manyDishesHelp[k].length; i++) {
      sum = sum + pricesOfOne[k][i] * manyDishesHelp[k][i]["prices"];
    }
  }
  if (sum != 0) {
    document.getElementById("line").classList.remove("d-none");
    document.getElementById("orderButton").classList.remove("d-none");
    result.innerHTML = resultHTML();
    sum = sum.toFixed(2);
    document.getElementById("subtotal").innerHTML = `${sum.replace(".", ",")} €`;
    document.getElementById("total").innerHTML = `${sum.replace(".", ",")} €`;
  } else {
    document.getElementById("line").classList.add("d-none");
    document.getElementById("orderButton").classList.add("d-none");
    result.innerHTML = resultEmptyHTML();
  }
}

function resultHTML() {
  return /*html*/ `
    <div class="subtotal">
      <div>Zwischensumme</div>
      <div id="subtotal"></div>
    </div>
    <div class="forwardingCharges">
      <div>Lieferkosten</div>
      <div>Kostenlos</div>
    </div>
    <div class="total">
      <div>Gesamt</div>
      <div id="total"></div>
    </div>
  `;
}

function resultEmptyHTML() {
  return /*html*/ `
    <div class="emptyResult">
      <img src="./img/shoppingbasket.png" alt="">
      <h2>Fülle deinen Warenkorb</h2>
      <span>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</span>
    </div>
  `;
}

//Remove-Functions

function remove(i, k, moreDishes) {
  let dishes = document.getElementById(`amounts${moreDishes}${i}`);
  dishes.innerHTML = "";
  j = pricesOfOne[k][i];
  j--;
  let resultPrices = manyDishesHelp[k][i]["prices"] * j;
  resultPrices = resultPrices.toFixed(2);
  pricesOfOne[k][i] = j;
  if (j > 0) {
    if (j <= 1) {
      dishes.innerHTML += addReomveHTML(j, i, k, moreDishes, resultPrices);
    } else {
      dishes.innerHTML = addReomveHTML(j, i, k, moreDishes, resultPrices);
    }
  } else {
    dishes.innerHTML = "";
  }
  result();
}

function order() {
  for (let k = 0; k < pricesOfOne.length; k++) {
    pricesOfOne[k] = [0, 0, 0];
  }
  renderBasket();
  alert("Danke für die Testbestellung");
}

function showBasketResponsive() {
  document.getElementById("marketBasket").classList.add("marketBasketShow");
  document.getElementById("showBasketResponsive").classList.add("d-none");
  document.getElementById("showDishResponsive").classList.remove("d-none");
  document.getElementById("slider").classList.add("d-none");
}

function showDishResponsive() {
  document.getElementById("marketBasket").classList.remove("marketBasketShow");
  document.getElementById("showDishResponsive").classList.add("d-none");
  document.getElementById("showBasketResponsive").classList.remove("d-none");
  document.getElementById("slider").classList.remove("d-none");
}

window.onscroll = function () {
  let marketBasket = document.getElementById("marketBasket");
  let marketBasketHeightFixed = 72 - window.scrollY;
  if (marketBasketHeightFixed >= 0) {
    marketBasket.style = `top: ${marketBasketHeightFixed}px`;
  } else {
    marketBasket.style = `top: 0px`;
  }
  if (window.scrollY >= 608) {
    document.getElementById("slider").classList.add("sliderTop");
  } else {
    document.getElementById("slider").classList.remove("sliderTop");
  }
};

function infoWindow() {
  document.getElementById("greyBackground").classList.remove("d-none");
}

function hideBackground() {
  document.getElementById("greyBackground").classList.add("d-none");
}

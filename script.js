let doener = [
  {
    dishes: "Yufka",
    ingredients: ["mit Dönerfleisch, Salat und Sauce"],
    prices: "9.50",
    image: "./img/shawarma.jpg",
  },
  {
    dishes: "Döner",
    ingredients: ["im Fladenbrot mit Dönerfleisch, Salat und Sauce"],
    prices: "7.50",
    image: "./img/doner.jpg",
  },
  {
    dishes: "Dönerteller",
    ingredients: ["mit Dönerfleisch, Salat, Sauce und Pommes frites"],
    prices: "14.00",
    image: "./img/food-photo.jpg",
  },
];
let pizza = [
  {
    dishes: "Pizza Armor",
    ingredients: ["mit frischen Tomaten und Oliven"],
    prices: "9.50",
    image: "./img/pizza.jpg",
  },
  {
    dishes: "Pizza Bruschetta",
    ingredients: ["mit Hähnchenbrust, Mais, Zwiebeln und Champignons"],
    prices: "9.50",
    image: "./img/pizza3.jpg",
  },
  {
    dishes: "Pizza Hawai",
    ingredients: ["mit Putenschinken und Ananas"],
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

let pricesOfOneDoener = [0, 0, 0];
let pricesOfOnePizza = [0, 0, 0];
let pricesOfOneDrink = [0, 0, 0];

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
  let dishDoener = document.getElementById("dishDoener");
  let dishPizza = document.getElementById("dishPizza");
  let dishDrink = document.getElementById("dishDrink");
  dishDoener.innerHTML = "";
  dishPizza.innerHTML = "";
  dishDrink.innerHTML = "";
  renderDishes(dishDoener, dishPizza, dishDrink);
 }

function renderDishes(dishDoener, dishPizza, dishDrink) {
  for (let i = 0; i < doener.length; i++) {
    const singleDoener = doener[i];
    dishDoener.innerHTML += renderDoenerHTML(singleDoener, i);
  }
  for (let i = 0; i < pizza.length; i++) {
    const singlePizza = pizza[i];
    dishPizza.innerHTML += renderPizzaHTML(singlePizza, i);
  }
  for (let i = 0; i < drink.length; i++) {
    const singleDrink = drink[i];
    dishDrink.innerHTML += renderDrinkHTML(singleDrink, i);
  }
}

function renderDoenerHTML(singleDoener, i) {
  return /*html*/ `
    <div class="dish" onclick='addDoener(${i}, event)'>
      <div class="eat">
          <div id="singleEatDoener${i}" class="singleEat"><h3>${singleDoener["dishes"]}</h3><img src="./img/info.png" alt=""></div>
          <div id="ingredientsDoener${i}" class="ingredients">${singleDoener["ingredients"]}</div>
          <div id="priceDoener${i}" class="price"><h3>${singleDoener["prices"].replace(".", ",")} €</h3> </div>
        </div>
        <div class="eatImage">
          <img src="${singleDoener["image"]}" alt="" />
        </div>
        <div>
          <button onclick="addDoener(${i}, event)" class="addEat">+</button>
        </div>
      </div>
    </div>
    `;
}

function renderPizzaHTML(singlePizza, i) {
  return /*html*/ `
  <div class="dish" onclick='addPizza(${i}, event)'>
    <div class="eat">
        <div id="singleEatPizza${i}" class="singleEat"><h3>${singlePizza["dishes"]}</h3><img src="./img/info.png" alt=""></div>
        <div id="ingredientsPizza${i}" class="ingredients">${singlePizza["ingredients"]}</div>
        <div id="pricePizza${i}" class="price"><h3>${singlePizza["prices"].replace(".", ",")} €</h3></div>
      </div>
      <div class="eatImage">
        <img src="${singlePizza["image"]}" alt="" />
      </div>
      <div>
        <button onclick="addPizza(${i}, event)" class="addEat">+</button>
      </div>
    </div>
  </div>
  `;
}

  function renderDrinkHTML(singleDrink, i) {
    return /*html*/ `
  <div class="dish" onclick='addDrink(${i}, event)'>
    <div class="eat">
        <div id="singleDrink${i}" class="singleEat"><h3>${singleDrink["dishes"]}</h3><img src="./img/info.png" alt=""></div>
        <div id="priceDrink${i}" class="price"><h3>${singleDrink["prices"].replace(".", ",")} €</h3></div>
        <div id="descriptionDrink${i}" class="description">${singleDrink["description"]}</div>
      </div> 
      <div>
        <button onclick="addDrink(${i}, event)" class="addEat">+</button>
      </div>
    </div>
  </div>
  `;
  }


function renderBasket() {
  let basketDoener = document.getElementById("amountDoener");
  basketDoener.innerHTML = "";
  let basketPizza = document.getElementById("amountPizza");
  basketPizza.innerHTML = "";
  let basketDrink = document.getElementById("amountDrink");
  basketDrink.innerHTML = "";
  renderBasketDoener(basketDoener);
  renderBasketPizza(basketPizza);
  renderBasketDrink(basketDrink);
  result();
}

function renderBasketDoener(basketDoener) {
  for (let i = 0; i < doener.length; i++)
    basketDoener.innerHTML += /*html*/ `
  <div id="amountsDoener${i}" class="amount"></div>
   `;
}

function renderBasketPizza(basketPizza) {
  for (let i = 0; i < pizza.length; i++)
    basketPizza.innerHTML += /*html*/ `
  <div id="amountsPizza${i}" class="amount"></div>
   `;
}

function renderBasketDrink(basketDrink) {
  for (let i = 0; i < drink.length; i++)
    basketDrink.innerHTML += /*html*/ `
  <div id="amountDrink${i}" class="amount"></div>
   `;
}

//Add-Functions

function addDoener(i, event) {
  document.getElementById(`amountsDoener${i}`).innerHTML = "";
  j = pricesOfOneDoener[i];
  j++;
  let resultPricesDoener = doener[i]["prices"] * j;
  resultPricesDoener = resultPricesDoener.toFixed(2);
  pricesOfOneDoener[i] = j;
  if (j <= 1) {
    document.getElementById(`amountsDoener${i}`).innerHTML += addDoenerHTML(j, i, resultPricesDoener);
  } else {
    document.getElementById(`amountsDoener${i}`).innerHTML = addDoenerHTML(j, i, resultPricesDoener);
  }
  event.stopPropagation();
  result();
}

function addDoenerHTML(j, i, resultPricesDoener) {
  return /*html*/ `
<div id="amountsDoener${i}" class="amount">
<div>${j}</div>
<div><h3>${doener[i]["dishes"]}</h3></div>
<button onclick='addDoener(${i}, event)'>+</button>
 <button onclick="removeDoener(${i})">-</button>
 <div><h3>${resultPricesDoener.replace(".", ",")} €</h3></div>
</div>
 `;
}

function addPizza(i, event) {
  document.getElementById(`amountsPizza${i}`).innerHTML = "";
  j = pricesOfOnePizza[i];
  j++;
  let resultPricesPizza = pizza[i]["prices"] * j;
  resultPricesPizza = resultPricesPizza.toFixed(2);
  pricesOfOnePizza[i] = j;
  if (j <= 1) {
    document.getElementById(`amountsPizza${i}`).innerHTML += addPizzaHTML(j, i, resultPricesPizza);
  } else {
    document.getElementById(`amountsPizza${i}`).innerHTML = addPizzaHTML(j, i, resultPricesPizza);
  }
  event.stopPropagation();
  result();
}

function addPizzaHTML(j, i, resultPricesPizza) {
  return /*html*/ `
<div id="amountsPizza${i}" class="amount">
<div>${j}</div>
<div><h3>${pizza[i]["dishes"]}</h3></div>
<button onclick='addPizza(${i}, event)'>+</button>
 <button onclick='removePizza(${i})'>-</button>
 <div><h3>${resultPricesPizza.replace(".", ",")} €</h3></div>
</div>
 `;
}

function addDrink(i, event) {
  document.getElementById(`amountDrink${i}`).innerHTML = "";
  j = pricesOfOneDrink[i];
  j++;
  let resultPricesDrink = drink[i]["prices"] * j;
  resultPricesDrink = resultPricesDrink.toFixed(2);
  pricesOfOneDrink[i] = j;
  if (j <= 1) {
    document.getElementById(`amountDrink${i}`).innerHTML += addDrinkHTML(j, i, resultPricesDrink);
  } else {
    document.getElementById(`amountDrink${i}`).innerHTML = addDrinkHTML(j, i, resultPricesDrink);
  }
  event.stopPropagation();
  result();
}

function addDrinkHTML(j, i, resultPricesDrink) {
  return /*html*/ `
<div id="amountDrink${i}" class="amount">
<div>${j}</div>
<div><h3>${drink[i]["dishes"]}</h3></div>
<button onclick='addDrink(${i}, event)'>+</button>
 <button onclick='removeDrink(${i})'>-</button>
 <div><h3>${resultPricesDrink.replace(".", ",")} €</h3></div>
</div>
 `;
}

//result

function result() {
  let result = document.getElementById("result");
  result.innerHTML = "";
  let sum = 0;
  //Ja, ich kann das auch alles in einer For-Schleife machen. Die Längen könnten sich aber unterscheiden.
  for (let i = 0; i < doener.length; i++) {
    sum = sum + pricesOfOneDoener[i] * doener[i]["prices"];
  }
  for (let i = 0; i < pizza.length; i++) {
    sum = sum + pricesOfOnePizza[i] * pizza[i]["prices"];
  }
  for (let i = 0; i < drink.length; i++) {
    sum = sum + pricesOfOneDrink[i] * drink[i]["prices"];
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

function removeDoener(i) {
  document.getElementById(`amountsDoener${i}`).innerHTML = "";
  j = pricesOfOneDoener[i];
  j--;
  let resultPricesDoener = doener[i]["prices"] * j;
  resultPricesDoener = resultPricesDoener.toFixed(2);
  pricesOfOneDoener[i] = j;
  if (j > 0) {
    if (j <= 1) {
      document.getElementById(`amountsDoener${i}`).innerHTML += addDoenerHTML(j, i, resultPricesDoener);
    } else {
      document.getElementById(`amountsDoener${i}`).innerHTML = addDoenerHTML(j, i, resultPricesDoener);
    }
  } else {
    document.getElementById(`amountsDoener${i}`).innerHTML = "";
  }
  result();
}

function removePizza(i) {
  document.getElementById(`amountsPizza${i}`).innerHTML = "";
  j = pricesOfOnePizza[i];
  j--;
  let resultPricesPizza = pizza[i]["prices"] * j;
  resultPricesPizza = resultPricesPizza.toFixed(2);
  pricesOfOnePizza[i] = j;
  if (j > 0) {
    if (j <= 1) {
      document.getElementById(`amountsPizza${i}`).innerHTML += addPizzaHTML(j, i, resultPricesPizza);
    } else {
      document.getElementById(`amountsPizza${i}`).innerHTML = addPizzaHTML(j, i, resultPricesPizza);
    }
  } else {
    document.getElementById(`amountsPizza${i}`).innerHTML = "";
  }
  result();
}

function removeDrink(i) {
  document.getElementById(`amountDrink${i}`).innerHTML = "";
  j = pricesOfOneDrink[i];
  j--;
  let resultPricesDrink = drink[i]["prices"] * j;
  resultPricesDrink = resultPricesDrink.toFixed(2);
  pricesOfOneDrink[i] = j;
  if (j > 0) {
    if (j <= 1) {
      document.getElementById(`amountDrink${i}`).innerHTML += addDrinkHTML(j, i, resultPricesDrink);
    } else {
      document.getElementById(`amountDrink${i}`).innerHTML = addDrinkHTML(j, i, resultPricesDrink);
    }
  } else {
    document.getElementById(`amountDrink${i}`).innerHTML = "";
  }
  result();
}

function order() {
  pricesOfOneDoener = [0, 0, 0];
  pricesOfOnePizza = [0, 0, 0];
  pricesOfOneDrink = [0, 0, 0];
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


function infoWindow(){
  document.getElementById('greyBackground').classList.remove('d-none');
  
}

function hideBackground(){
  document.getElementById('greyBackground').classList.add('d-none');
}

function productInfo(){

}

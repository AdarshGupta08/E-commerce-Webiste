let user = JSON.parse(localStorage.getItem("user"));
let login = document.querySelector("#Loginbtn");
let right = document.querySelector(".right");
console.log(user, login, right);
let menSection = document.querySelector("#menSection");
let womenSection = document.querySelector("#womenSection");
let kidsSection = document.querySelector("#kidsSection");
let eletronicsSection = document.querySelector("#eletronicsSection");
let designSection = document.querySelector(".design");
let cartSection = document.querySelector("#cart");
let closeSection = document.querySelector("#close");
let cartCont = document.querySelector("#cart-cont");
let total = document.querySelector("#total");
let cartStorage = [];

closeSection.addEventListener("click", () => {
  cartSection.style.right = "-100%";
});

if (user) {
  login.remove();
  right.innerHTML = `<a href="./index.html" id="Logout"><button>Logout</button></a>
    <span style="color:white;">${user.userName}</span>
    <a href="" style="color:white;"><i class="fa-solid fa-cart-arrow-down"></i></a>`;
}
let Logout = document.querySelector("#Logout");
Logout.addEventListener("click", () => {
  localStorage.removeItem("user");
});

async function products() {
  let data = await fetch(
    "https://www.shoppersstack.com/shopping/products/alpha"
  );
  let allData = await data.json();
  console.log(data, allData);
  let menData = allData.data.filter((e) => {
    if (e.category == "men") {
      return e;
    }
  });

  let womenData = allData.data.filter((e) => {
    if (e.category == "women") {
      return e;
    }
  });

  let kidsData = allData.data.filter((e) => {
    if (e.category == "kids") {
      return e;
    }
  });

  let electronicsData = allData.data.filter((e) => {
    if (e.category == "electronics") {
      return e;
    }
  });
  console.log(menData, womenData, electronicsData, kidsData);
  menData.map((e) => {
    menSection.innerHTML += `<div id="${e.productId}">
        <img src="${e.productImageURLs[0]}" alt="">
        <h2>${e.name}</h2>
        <p>${e.description}</p>
        <h3>${e.price}</h3>
        <button>Add to cart</button>
    </div>`;
  });

  womenData.map((e) => {
    womenSection.innerHTML += `<div id="${e.productId}">
        <img src="${e.productImageURLs[0]}" alt="">
        <h2>${e.name}</h2>
        <p>${e.description}</p>
        <h3>${e.price}</h3>
        <button>Add to cart</button>
    </div>`;
  });

  kidsData.map((e) => {
    kidsSection.innerHTML += `<div id="${e.productId}">
        <img src="${e.productImageURLs[0]}" alt="">
        <h2>${e.name}</h2>
        <p>${e.description}</p>
        <h3>${e.price}</h3>
        <button>Add to cart</button>
    </div>`;
  });

  electronicsData.map((e) => {
    eletronicsSection.innerHTML += `<div id="${e.productId}">
        <img src="${e.productImageURLs[0]}" alt="">
        <h2>${e.name}</h2>
        <p>${e.description}</p>
        <h3>${e.price}</h3>
        <button>Add to cart</button>
    </div>`;
  });

  let designBtn = designSection.querySelectorAll("button");
  console.log(designBtn);
  designBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      cartSection.style.right = "0";

      let parentElement = btn.parentElement.id;
      console.log(parentElement);
      let product = allData.data.find((e) => {
        if (parentElement == e.productId) {
          return e;
        }
      });

      cartStorage = cartStorage.filter((e) => {
        if (e.productId != product.productId) {
          return e;
        }
      });
      cartStorage.push(product);

      cartProduct();
    });
  });
}
products();

function cartProduct() {
  cartCont.innerHTML = "";
  //   console.log(product,cartStorage);
  cartStorage.map((e) => {
    cartCont.innerHTML += `<div class="cart-item" id="${e.productId}">
    <div>
    <img src="${e.productImageURLs[0]}" alt="">
    </div>
    <div>
    <h3>${e.name}</h3>
            <input type="number">
            <h5>${e.price}</h5>
        </div>
        <div>
            <h4 class="sub">${e.price}</h4>
        </div>
        <div>
            <i class="fa-solid fa-trash-can"></i>
        </div>
    </div>`;
  });
  RemoveProducts();
  Subtotal();
  grandTotal();
}

function RemoveProducts() {
  let del = document.querySelectorAll(".fa-trash-can");

  del.forEach((btn) => {
    btn.addEventListener("click", () => {
      // console.log(btn);
      let parentId = btn.parentElement.parentElement.id;

      cartStorage = cartStorage.filter((e) => {
        if (e.productId != parentId) {
          return e;
        }
      });
      console.log(cartStorage);
      cartProduct();
    });
  });
}

function Subtotal() {
  let input = document.querySelectorAll("input");
  input.forEach((quantity) => {
    quantity.addEventListener("input", (e) => {
      if (quantity.value < 1) {
        quantity.value = 1;
      }

      let parent = quantity.parentElement.parentElement;
      let price = parent.querySelector("h5");
      let sub = parent.querySelector("h4");

      sub.innerHTML = quantity.value * price.innerHTML;
      console.log(parent, price, sub);
      grandTotal();
    });
  });
}

function grandTotal() {
  let sub = document.querySelectorAll(".sub");
  let temp = 0;
  sub.forEach((e) => {
    let subNumber = parseInt(e.innerHTML);
    temp += subNumber;
  });
  total.innerHTML = `Total :${temp};`;
}

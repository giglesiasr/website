//ARREGLO de productos: reloj, audífonos y silla

const productos = [
  {
    id: 1,
    nombre: "Apple Watch Series 7 GPS, 45mm Blue Aluminium Case",
    precio: 300,
    imagenP: "https://www.pcfactory.cl/public/foto/43910/1.jpg?t=1647479413",
  },
  {
    id: 2,
    nombre: "Audífono Gamer PRO X edición League of Legends",
    precio: 200,
    imagenP: "https://www.pcfactory.cl/public/foto/44384/1.jpg?t=1647473536",
  },
  {
    id: 3,
    nombre: "Audífonos de Monitoreo ATH-M30X ",
    precio: 100,
    imagenP: "https://www.pcfactory.cl/public/foto/43873/1.jpg?t=1647480049",
  },
  {
    id: 4,
    nombre: "Silla Gamer Omilen V2 Black/Blue (Despacho gratis)",
    precio: 400,
    imagenP: "https://www.pcfactory.cl/public/foto/39567/1.jpg?t=1631044608",
  },
];

let arrayProductos = document.getElementById("listaProductos");

function buscarB() {
  let buscarInput = document.getElementById("buscar").value;
  if (buscarInput != "") {
    const arrayFiltrar = productos.filter(
      (cosa) =>
        cosa.nombre.toUpperCase().indexOf(buscarInput.toUpperCase()) > -1
    );
    {
      listaProductos.innerHTML = "";
      arrayFiltrar.map((item) => {
        arrayProductos.innerHTML += `<div class="col-12 col-sm-6 col-md-3 p-3">
                    <div id="1" class="card">
                        <h3 id="producto" class="card__title p-3">${item.nombre}</h3>
                        <img id="imagenP" class="card__img  px-5" src="${item.imagenP}" alt="productos">
                        <div class="card-body">
                            <p id="precio" class="card__text">${item.precio}</p>
                            <button type="button" class="btn btn-sm btn-2">Ver más</button>
                            <button type="button" id="botonAnidir" class="btn btn-sm btn-3 addToCart">Añadir a carrito</button>
                            
                        </div>
                    </div> 
                </div>`;
      });
    }
  }
}

productos.map((item) => {
  arrayProductos.innerHTML += `<div class="col-12 col-sm-6 col-md-3 p-3">
            <div id="1" class="card">
                <h3 id="producto" class="card__title p-3">${item.nombre}</h3>
                <img id="imagenP" class="card__img  px-5" src="${item.imagenP}" alt="productos">
                <div class="card-body">
                    <p id="precio" class="card__text">${item.precio}</p>
                    <button type="button" class="btn btn-sm btn-2">Ver más</button>
                    <button type="button" id="botonAnidir" class="btn btn-sm btn-3 addToCart">Añadir a carrito</button>
                    
                </div>
            </div>
        </div>`;
});

const addToShoppingCartButtons = document.querySelectorAll(".addToCart");
addToShoppingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener("click", addToCartClicked);
});

const vaciarButton = document.querySelector(".vaciarButton");
vaciarButton.addEventListener("click", vaciarClicked);

const shoppingCartItemsContainer = document.querySelector(
  ".shoppingCartItemsContainer"
);

function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest(".card");

  const itemTitle = item.querySelector(".card__title").textContent;
  const itemPrice = item.querySelector(".card__text").textContent;
  const itemImage = item.querySelector(".card__img").src;

  addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    "shoppingCartItemTitle"
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        ".shoppingCartItemQuantity"
      );
      elementQuantity.value++;

      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingCartRow = document.createElement("div");
  const shoppingCartContent = `
      <div class="row shoppingCartItem">
            <div class="col-6">
                <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <img src=${itemImage} class="shopping-cart-image">
                    <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
                </div>
            </div>
            <div class="col-2">
                <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
                </div>
            </div>
            <div class="col-4">
                <div
                    class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                    <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                        value="1">
                    <button class="btn btn-danger buttonDelete" type="button">X</button>
                </div>
            </div>
        </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector(".buttonDelete")
    .addEventListener("click", removeShoppingCartItem);

  shoppingCartRow
    .querySelector(".shoppingCartItemQuantity")
    .addEventListener("change", quantityChanged);

  updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector(".shoppingCartTotal");

  const shoppingCartItems = document.querySelectorAll(".shoppingCartItem");

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      ".shoppingCartItemPrice"
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace("$", "")
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      ".shoppingCartItemQuantity"
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `$${total}`;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest(".shoppingCartItem").remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = "";
  updateShoppingCartTotal();
}

function vaciarClicked() {
  shoppingCartItemsContainer.innerHTML = "";
  updateShoppingCartTotal();
}

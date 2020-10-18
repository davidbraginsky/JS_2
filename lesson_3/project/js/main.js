const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ не использовать fetch а Promise
// let getRequest = (url, cb) => {
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) {
//       if (xhr.status !== 200) {
//         console.log('Error');
//       } else {
//         cb(xhr.responseText);
//       }
//     }
//   };
//   xhr.send();
// };

let getRequestPromise = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {

        if (xhr.status === 200) {
          resolve(xhr.responseText)
        } else {
          reject('Error');
        }
      }
    };

    xhr.send();
  }

  );
}

getRequestPromise(`${API}/catalogData.json`)
  .then((response) => JSON.parse(response))
  .catch((error) => console.log(error));

// –--------------------------------

class ProductList {
  #goods;

  constructor(container = '.products') {
    this.container = container;
    this.#goods = [];
    this._allProducts = [];

    this.#getProducts().then((data) => {
      this.#goods = [...data];
      this.#render();
      this.addEventListeners();
    });

    console.log(this.sum());
  }

  #getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then(response => response.json())
      .catch((error) => {
        console.log(error);
      });
  }

  sum() {
    return this.#goods.reduce((sum, { price }) => sum + price, 0);
  }

  #render() {
    const block = document.querySelector(this.container);

    for (let product of this.#goods) {
      const productObject = new ProductItem(product);

      this._allProducts.push(productObject);

      block.insertAdjacentHTML('beforeend', productObject.getGoodHTML());
    }

  }


  addItemToCart(event) {
    console.dir(event);
  }

  addEventListeners() {
    const buyButtons = document.querySelectorAll('.buy-btn');

    buyButtons.forEach(item => {
      item.addEventListener('click', this.addItemToCart)
    })
  }



}

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }



  getGoodHTML() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
            </div>`;
  }
}

const list = new ProductList();






//----------------------------------------------


class CartItem extends ProductItem {
  constructor(product, img = 'https://placehold.it/100x50') {
    super(product, img)
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
  }

  getCartItemHTML() {
    return `<div class="cart-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="cart-desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="cart-buy-btn">Купить</button>
              </div>
            </div>`;
  }
}

const cartButton = document.querySelector('.btn-cart');

const randomButton = document.querySelector('.randomButton');

const cart = document.querySelector('.cart');

cartButton.addEventListener('click', () => {
  cart.classList.toggle('showCart');
})

randomButton.addEventListener('click', () => {
  let markup = phone.getCartItemHTML();
  cart.insertAdjacentHTML('beforeend', markup)
})


let object = {
  "id_product": 123,
  "product_name": "Ноутбук",
  "price": 45600,
  "quantity": 1
}

let phone = new CartItem(object);

console.log(phone)

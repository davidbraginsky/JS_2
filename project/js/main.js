const products = [
  { id: 1, title: 'Notebook', price: 20000 },
  { id: 2, title: 'Mouse', price: 1500 },
  { id: 3, title: 'Keyboard', price: 5000 },
  { id: 4, title: 'Gamepad', price: 4500 },
];

const renderProduct = (title, price, img = 'https://via.placeholder.com/170') => {
  return `<div class="product-item">
            <img class='product-item-photo' src="${img}" alt="">
            <h3 class='product-item-title'>${title}</h3>
            <p class='product-item-price'>${price}</p>
            <button class="product-item-button">Добавить в корзину</button>
          </div>`;
};

const productDiv = document.querySelector('.products');

const renderProducts = list => {
  productDiv.innerHTML = list.map(item => renderProduct(item.title, item.price)).join('');
}

renderProducts(products);

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://placehold.it/200x150',
        searchLine: '',
        isVisibleCart: false,
        filtered: [],
        hasMatches: false,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            console.log(product.id_product)
        },
        filterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            this.products.forEach(el => {
                const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
                if (!this.filtered.includes(el)) {
                    block.classList.add('invisible');
                } else {
                    block.classList.remove('invisible');
                }
            });
            this.checkMatches()
        },
        checkMatches() {
            const block = document.querySelector('.goods-list');
            if (this.filtered == 0) {
                block.classList.remove('invisible')
            } else {
                block.classList.add('invisible');
            }
        }
    },
    created() {
        this.getJson(`${API}${this.catalogUrl}`)
            .then(data => {
                for (el of data) {
                    this.products.push(el);
                }
            });
    },
});

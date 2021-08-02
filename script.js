"use strict"
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject('Error')
                } else {
                    resolve(xhr.responseText)
                }
            }
        };
        xhr.send();
    })
};

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.name = product.product_name;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    getHTMLString() {
        return `
            <div class="product-cart">
                <div class="product-flex"><img class="product-img" src="${this.img}" alt="photo">
                    <div class="product-name">${this.name}</div>
                    <div>${this.price} руб.</div>
                </div>
                <button data-productId="${this.id}" class="buy-btn">Добавить</button>
            </div>`;
    }
}

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this._goods = [];
        this._allProducts = [];

        this._fetchGoods();
    }

    _fetchGoods() {
        getRequest(`${API}/catalogData.json`)
            .then(data => { this._goods = JSON.parse(data) })
            .then(() => this._render());
    }

    _render() {
        const block = document.querySelector(this.container);

        for (const product of this._goods) {
            const productObject = new ProductItem(product);
            this._allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }

    getSumOfAllProduct() {
        return this._goods.reduce(function (sum, good) {
            return sum + good.price;
        }, 0);
    }

}

const list = new ProductList();
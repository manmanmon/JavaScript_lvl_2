"use strict"

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    getHTMLString() {
        return `
            <div class="product-cart">
                <div class="product-flex"><img class="product-img" src="${this.img}" alt="photo">
                    <div class="product-name">${this.title}</div>
                    <div>${this.price} руб.</div>
                </div>
                <button data-productId="${this.id}" class="buy-btn">Добавить</button>
            </div>`;
    }
}

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];

        this.fetchGoods();
        this.render();
    }

    fetchGoods() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 20000 },
            { id: 2, title: 'Mouse', price: 1500 },
            { id: 3, title: 'Keyboard', price: 5000 },
            { id: 4, title: 'Gamepad', price: 4500 },
        ];
    }

    render() {
        const block = document.querySelector(this.container);

        for (const product of this.goods) {
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }

    getSumOfAllProduct() {
        return this.goods.reduce(function (sum, good) {
            return sum + good.price;
        }, 0);
    }

}

const list = new ProductList();
const goods = [
    { id: 1, title: 'Shirt', price: 150 },
    { id: 2, title: 'Socks', price: 50 },
    { id: 3, title: 'Jacket', price: 350 },
    { id: 4, title: 'Shoes', price: 250 },
];

const renderGoodsItem = (item, img = 'https://via.placeholder.com/200x150') =>
    `<div class="product-cart">
    <div class="product-flex"><img class="product-img" src="${img}" alt="photo">
        <div class="product-name">${item.title}</div>
        <div>${item.price} руб.</div>
    </div>
    <button data-productId="${item.id}" class="product-button">Добавить</button>
</div>`;

const renderGoodsList = list => {
    let goodsList = list.map(item => renderGoodsItem(item));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

renderGoodsList(goods);
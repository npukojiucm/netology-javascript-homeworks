const controlDecrement = Array.from(
    document.getElementsByClassName("product__quantity-control_dec"));
const controlIncrement = Array.from(
    document.getElementsByClassName("product__quantity-control_inc"));
const buttons = Array.from(
    document.getElementsByClassName("product__add"));

controlDecrement.forEach(elm => elm.onclick = () => {
    const parent = elm.closest(".product__quantity-controls");
    const quantityValue = parent.querySelector(".product__quantity-value");
    let quantity = +quantityValue.textContent - 1;

    if (quantity <= 1) {
        return quantityValue.textContent = 1;
    }

    return quantityValue.textContent = quantity;
});

controlIncrement.forEach(elm => elm.onclick = () => {
    const parent = elm.closest(".product__quantity-controls");
    const quantityValue = parent.querySelector(".product__quantity-value");
    let quantity = +quantityValue.textContent + 1;

    return quantityValue.textContent = quantity;
});

buttons.forEach(elm => elm.onclick = () => {
    const product = elm.closest(".product");
    const img = product.querySelector("img");
    const quantityValue = product.querySelector(".product__quantity-value");

    let addBlock = `
        <div class="cart__product" data-id=${product.dataset.id}>
            <img class="cart__product-image" src=${img.src}>
            <div class="cart__product-count">${quantityValue.textContent}</div>
        </div>
    `;

    const cart = document.querySelector(".cart__products");
    const productInCart = Array.from(
        cart.getElementsByClassName("cart__product"));
    const indexInCart = productInCart.findIndex(elm => elm.dataset.id == product.dataset.id);

    if (indexInCart !== -1) {
        const productCount = productInCart[indexInCart].querySelector(".cart__product-count")
        return productCount.textContent = +productCount.textContent + +quantityValue.textContent;
    }

    return cart.innerHTML += addBlock;

})
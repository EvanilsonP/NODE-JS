const name = 'Evanilson';
const userAge = 23;

const user = {
    name,
    age: userAge
}

console.log(user);

// Object destructuring

const product = {
    label: 'PC Gamer',
    stock: 10,
    price: undefined,
    rating: 88
}

// const {label: productLabel, stock, rating = 5} = product;
// console.log(productLabel);
// console.log(stock);
// console.log(rating);

const transaction = (type, {stock, label}) => {
    console.log(type, label, stock);
};

transaction('Order', product);
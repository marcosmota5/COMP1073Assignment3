/*
    COMP1073 Assignment 3
    Student Id: 200564426
    Student Name: Marcos Oliveira Mota
    Created on: 2024-11-23
*/

// Class to hold the smoothie information
class Smoothie {
    // Constructor that receives some properties of the smoothie
    constructor(name, base, fruits, toppings, size) {
        this.name = name;
        this.base = base;
        this.fruits = fruits;
        this.toppings = toppings;
        this.size = size;
        this.prices = {
            base: { milk: 2, "almond-milk": 3, "coconut-water": 2.5 },
            fruit: 1, // Per fruit
            topping: 0.5, // Per topping
            size: { small: 4, medium: 5.5, large: 7 }
        };
    }

    // Function to calculate the price of the smoothie based on the class properties
    calculatePrice() {
        const basePrice = this.prices.base[this.base];
        const fruitsPrice = this.fruits.length * this.prices.fruit;
        const toppingsPrice = this.toppings.length * this.prices.topping;
        const sizePrice = this.prices.size[this.size];
        return basePrice + fruitsPrice + toppingsPrice + sizePrice;
    }

    // Function to get the description for the order summary
    getDescription() {
        return `
            <h2>Smoothie Order Summary</h2>
            <p><strong>Order Id:</strong> ${String(Math.floor(Math.random() * 9999 + 1)).padStart(4, '0')}</p>
            <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Name:</strong> ${this.name}</p>
            <p><strong>Base:</strong> ${this.base.charAt(0).toUpperCase() + this.base.slice(1)}</p>
            <p><strong>Fruits:</strong> ${this.fruits.join(", ") || "None"}</p>
            <p><strong>Toppings:</strong> ${this.toppings.join(", ") || "None"}</p>
            <p><strong>Size:</strong> ${this.size.charAt(0).toUpperCase() + this.size.slice(1)}</p>
            <p><strong>Total Price:</strong> $${this.calculatePrice().toFixed(2)}</p>
        `;
    }
}


// Event listener for the order button
document.getElementById("orderButton").addEventListener("click", () => {
    // Get the form values
    const name = document.getElementById("name").value;
    const base = document.getElementById("base").value;

    // Map the fruits and toppings options to an array
    const fruits = Array.from(document.querySelectorAll('input[name="fruits"]:checked')).map(fruit => fruit.value);
    const toppings = Array.from(document.querySelectorAll('input[name="toppings"]:checked')).map(topping => topping.value);

    // Get the size
    const size = document.getElementById("size").value;

    // Validate form mandatory inputs
    if (!name || !base || !size) {
        alert("Please fill out all required fields!");
        return;
    }

    // Create a smoothie object
    const smoothie = new Smoothie(name, base, fruits, toppings, size);

    // Display the order summary
    const orderSummary = document.getElementById("orderSummary");
    orderSummary.style = "display: block;";
    orderSummary.innerHTML = smoothie.getDescription();
});
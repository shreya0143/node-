const express = require("express");
const app = express();

app.use(express.json());

let products = [
    { id: 1, name: "Apple iPhone 15", category: "Mobile", price: 79999, rating: 4.7, stock: 15, brand: "Apple" },
    { id: 2, name: "Samsung Galaxy S23", category: "Mobile", price: 74999, rating: 4.6, stock: 20, brand: "Samsung" },
    { id: 3, name: "Redmi Note 13", category: "Mobile", price: 15999, rating: 4.3, stock: 40, brand: "Xiaomi" },
    { id: 4, name: "HP Laptop i5", category: "Laptop", price: 59999, rating: 4.4, stock: 12, brand: "HP" },
    { id: 5, name: "Dell Inspiron i7", category: "Laptop", price: 69999, rating: 4.5, stock: 10, brand: "Dell" },
    { id: 6, name: "Lenovo ThinkPad", category: "Laptop", price: 84999, rating: 4.8, stock: 8, brand: "Lenovo" },
    { id: 7, name: "Boat Headphones", category: "Headphone", price: 1999, rating: 4.2, stock: 50, brand: "Boat" },
    { id: 8, name: "Sony WH-1000XM5", category: "Headphone", price: 29999, rating: 4.9, stock: 7, brand: "Sony" },
    { id: 9, name: "JBL Earbuds 135", category: "Headphone", price: 3499, rating: 4.1, stock: 35, brand: "JBL" },
    { id: 10, name: "Apple Watch Series 9", category: "Watch", price: 41999, rating: 4.6, stock: 14, brand: "Apple" },
    { id: 11, name: "Noise Smart Watch", category: "Watch", price: 1999, rating: 4.0, stock: 60, brand: "Noise" },
    { id: 12, name: "Fastrack Reflex", category: "Watch", price: 2999, rating: 4.2, stock: 33, brand: "Fastrack" },
    { id: 13, name: "ASUS Gaming Laptop", category: "Laptop", price: 109999, rating: 4.9, stock: 6, brand: "ASUS" },
    { id: 14, name: "Realme Narzo 70", category: "Mobile", price: 13999, rating: 4.4, stock: 25, brand: "Realme" },
    { id: 15, name: "Vivo V29", category: "Mobile", price: 32999, rating: 4.5, stock: 18, brand: "Vivo" },
    { id: 16, name: "Oppo F25", category: "Mobile", price: 27999, rating: 4.3, stock: 22, brand: "Oppo" },
    { id: 17, name: "LG 55 inch TV", category: "Television", price: 55999, rating: 4.6, stock: 9, brand: "LG" },
    { id: 18, name: "Sony Bravia TV", category: "Television", price: 85999, rating: 4.8, stock: 5, brand: "Sony" },
    { id: 19, name: "Samsung 4K TV", category: "Television", price: 75999, rating: 4.7, stock: 11, brand: "Samsung" },
    { id: 20, name: "Canon DSLR 1500D", category: "Camera", price: 42999, rating: 4.5, stock: 13, brand: "Canon" },
    { id: 21, name: "Nikon D5600", category: "Camera", price: 58999, rating: 4.7, stock: 9, brand: "Nikon" },
    { id: 22, name: "Logitech Keyboard", category: "Accessories", price: 1499, rating: 4.2, stock: 45, brand: "Logitech" },
    { id: 23, name: "HP Mouse", category: "Accessories", price: 799, rating: 4.1, stock: 70, brand: "HP" },
    { id: 24, name: "Sandisk 128GB Pendrive", category: "Accessories", price: 999, rating: 4.4, stock: 80, brand: "Sandisk" },
    { id: 25, name: "Seagate 1TB HDD", category: "Storage", price: 3499, rating: 4.6, stock: 30, brand: "Seagate" }
];

// Home
app.get("/", (req, res) => {
    res.send("Product API is working 🚀");
});

// Get all products
app.get("/products", (req, res) => {
    res.json(products);
});

// Get single product by id
app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);
    product ? res.json(product) : res.status(404).json({ message: "Product not found" });
});

// Add product
app.post("/products", (req, res) => {
    const newProduct = req.body;
    newProduct.id = products.length + 1;
    products.push(newProduct);
    res.json({ message: "Product added successfully", product: newProduct });
});

// Update product
app.put("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = products.findIndex(p => p.id === id);
    products[index] = { ...products[index], ...req.body };
    res.json({ message: "Product updated", product: products[index] });
});

// Delete product
app.delete("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    products = products.filter(p => p.id !== id);
    res.json({ message: "Product deleted" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

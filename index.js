// This is the brain of the backend (SERVER)
// We are using a library called nodemon which updates the server on it's own,
// without us having to close the server and restarting it again and again.
// This library can be seen in package.json and the command for it to keep updating this
// file without closing the server is "nodemon index.js"

const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const app = express();

// Configuring a middleware
// We are not allowed to pass JSON through nodeJS by default, so we need to set up a middleware to do so.
// This issue can be seen when we try to console log a request.body
app.use(express.json());

// Configuring middleware to accept form entries from postman to the DB:
app.use(express.urlencoded({ extended: false }));

// routes:
// This is how it is usually done professionally.
app.use("/api/products", productRoute);

// Connecting to the DB
// Link provided by mongoDB: mongodb+srv://sbokolia:<password>@backenddb.hgt9e9e.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB
// Replace the <password> with your own password.
// "Node-API" added below is the collection name

// First we connect to DB and then we start the server (listen)
mongoose
    .connect(
        "mongodb+srv://sbokolia:gsip1m2aVxUQ068q@backenddb.hgt9e9e.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
    )
    .then(() => {
        console.log("Connected to DB");
        // This causes the backend to run on port 3000
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch(() => {
        console.log("Connection failure");
    });

// Whatever the client sends to the server is a request.
// Whatever the server sends to the client is a response.
app.get("/", (req, res) => {
    res.send("Hello from node api server");
});

// <------- ALL FUNCTIONS HAVE BEEN ORGANIZED IN THEIR SPECIFIC FILES -------->

// Sending/Adding data to the DB.
// We create a post request to the link in postman and provide it JSON data,
// with the fields that we added to our model and it send it to the DB.
// app.post("/api/products", async (req, res) => {
//     try {
//         // create method creates a new entry in the DB and uses "Product" model for the fields.
//         // It required the await to be called.
//         const product = await Product.create(req.body);
//         res.status(200).json(product);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// View the items in the DB:
// app.get("/api/products", async (req, res) => {
//     try {
//         const products = await Product.find({});
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// Get specific item
// The :id is a parameter in the link that can be accessed to get specific value
// req.params provides the parameters in the url.
// app.get("/api/products/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findById(id);
//         res.status(200).json(product);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// Update an item in the DB:
// app.put("/api/products/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findByIdAndUpdate(id, req.body);
//         // if no product found:
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         // Getting the updates product:
//         const updatedProduct = await Product.findById(id);
//         res.status(200).json(updatedProduct);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// Deleting an item in the DB:
// app.delete("/api/products/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findByIdAndDelete(id);
//         // if no product found:
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//         res.status(200).json(await Product.find({}));
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

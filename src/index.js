const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const templatePath = path.join(__dirname, '../tempelates');

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    const { name, password, email } = req.body;

    const data = {
        name,
        password,
        email
    };

    try {
        await collection.create(data); // Use create to handle duplicates with unique index
        res.render("home");
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send("Email is already registered.");
        } else {
            console.error("Error during signup:", error);
            res.status(500).send("Internal Server Error.");
        }
    }
});

app.post("/login", async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await collection.findOne({ name });

        if (user && user.password === password) {
            res.render("home");
        } else {
            res.status(401).send("Invalid credentials.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error.");
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

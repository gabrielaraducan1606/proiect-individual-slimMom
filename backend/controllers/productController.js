import fs from "fs";
import path from "path";

export const getProducts = (req, res) => {
    const productsPath = path.resolve("data/products.json");

    fs.readFile(productsPath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Eroare la citirea fișierului." });
        }
        res.json(JSON.parse(data));
    });
};

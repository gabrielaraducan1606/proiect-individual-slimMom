import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsFilePath = path.join(__dirname, "../data/products.json");

// Citim fișierul JSON în mod sincron
const getProductsData = () => {
    try {
        if (!fs.existsSync(productsFilePath)) {
            console.error(" products.json does not exist!");
            return [];
        }
        const data = fs.readFileSync(productsFilePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error(" Error reading products.json:", error);
        return [];
    }
};

export const calculateCalories = (req, res) => {
    console.log(" Received data:", req.body);

    const { weight, height, age, desiredWeight, bloodType } = req.body;

    if (!weight || !height || !age || !desiredWeight || !bloodType) {
        console.error(" Missing fields:", { weight, height, age, desiredWeight, bloodType });
        return res.status(400).json({ message: "Toate câmpurile sunt obligatorii." });
    }

    try {
        const dailyCalories = 10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desiredWeight);
        
        const bloodIndex = parseInt(bloodType, 10);
        if (isNaN(bloodIndex) || bloodIndex < 1 || bloodIndex > 4) {
            return res.status(400).json({ message: "Grupă de sânge invalidă." });
        }

        const products = getProductsData();
        console.log(" Total Products Loaded:", products.length);

        const forbiddenFoods = products.filter(product => 
            product.groupBloodNotAllowed && product.groupBloodNotAllowed[bloodIndex] === true
        );

        console.log(" Forbidden Foods Found:", forbiddenFoods.length, forbiddenFoods);

        res.json({ dailyCalories, forbiddenFoods });
    } catch (error) {
        console.error(" Error calculating calories:", error);
        res.status(500).json({ message: "Eroare la calculul caloriilor." });
    }
};

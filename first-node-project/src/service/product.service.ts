import fs from "fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "./src/database/db.json")

export const productService = () => {
    // console.log(process.cwd())
    // console.log(filePath);
    const product = fs.readFileSync(filePath, "utf-8")

    return JSON.parse(product)
}
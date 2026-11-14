import type { IncomingMessage, ServerResponse } from "http";
import { productService } from "../service/product.service";
import type { IProduct } from "../types/product";

const productController = (req: IncomingMessage, res: ServerResponse) => {
    // product -> GET, POST, PUT
    const url = req.url
    const method = req.method

    const urlParams = url?.split("/")
    // console.log(urlParams) [ '', 'products', '1' ]
    const id = urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;

    console.log(id)

    // Get All Product
    if (url === "/products" && method === "GET") {
        // const products = [
        //     {
        //         id: 1,
        //         name: "Product-1",
        //         price: 20
        //     },
        //     {
        //         id: 2,
        //         name: "Product-2",
        //         price: 30
        //     },
        //     {
        //         id: 3,
        //         name: "Product-3",
        //         price: 40
        //     }
        // ]

        const products = productService()
        
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({ 
            message: "Products retrieved successfully!!!",
            data: products
        }))
    } else if ( method === "GET" && id !== null) {
        const products = productService() //[{}, {}, {}]
        const product = products.find((item: IProduct) => item.id === id)
        
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({ 
            message: "Product retrieved successfully!!!",
            data: product
        }))
    }
}

export default productController;
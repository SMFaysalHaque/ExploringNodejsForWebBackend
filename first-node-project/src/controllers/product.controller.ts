import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../service/product.service";
import type { IProduct } from "../types/product";
import { bodyParser } from "../utils/parseBody";
import { sendResponse } from "../utils/sendResponse";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
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

        try {
            sendResponse(res, true, 200, "Product retrieved successfully!!!", products)
        } catch (error) {
            sendResponse(res, false, 500, "Internal Server Error!")
        }

    } else if ( method === "GET" && id !== null) {
        try {
            const products = productService() //[{}, {}, {}]
            const product = products.find((item: IProduct) => item.id === id)

            if (!product) {
                return sendResponse(res, false, 404, "Product Not Found!")
            }

            return sendResponse(res, true, 200, "Product retrieved successfully!!!", product)
        } catch (error) {
            return sendResponse(res, false, 500, "Internal Server Error!")
        }

    } else if (method === "POST" && url === "/products") {

        const body = await bodyParser(req)
        // console.log(body)

        const newProduct = {
            id: Date.now(),
            ...body
        }

        // console.log(newProduct)

        const products = productService(); // [{}, {}]

        products.push(newProduct) // [{}, {}, {new}]

        createProduct(products)

        res.writeHead(201, {"content-type": "application/json"});
        res.end(JSON.stringify({ 
            message: "Product created successfully!!!",
            data: newProduct,
        }))
    } else if (method === "PUT" && id !== null) {

        const body = await bodyParser(req);
        const products = productService(); // [{}, {}]

        const index = products.findIndex((p: IProduct) => p.id === id)
        // console.log(index, products[index])

        if (index < 0) {
            res.writeHead(404, {"content-type": "application/json"});
            res.end(JSON.stringify({ 
                message: "Product not found!",
                // data: newProduct,
            }))
        }

        // console.log(products[index])
        products[index] = { id: products[index].id, ...body };
        createProduct(products)

        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({ 
            message: "Product update successfully!",
            data: products[index],
        }))
    } if ( method === "DELETE" && id !== null ) {
        // const body = await bodyParser(req);
        const products = productService(); // [{}, {}]

        const index = products.findIndex((p: IProduct) => p.id === id)
        // console.log(index, products[index])

        if (index < 0) {
            res.writeHead(404, {"content-type": "application/json"});
            res.end(JSON.stringify({ 
                message: "Product not found!",
                    // data: newProduct,
            }))

            // return
        }

        products.splice(index, 1)
        console.log(">>>>>>>:", products)

        createProduct(products)


        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({ 
            message: "Product Deleted Successfully!",
                // data: newProduct,
        }))
    }
}

export default productController;
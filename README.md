# ExploringNodejsForWebBackend

This is my practice project where I am learning how the backend works with Node.js. I am taking the Programming Hero course and this is the first project I built while learning. The main goal here was to understand how a server actually works from the ground, so I did NOT use Express. Everything is done with the built in `http` module of Node.

Basically it is a small products API (CRUD) that reads and writes data from a json file instead of a real database. I did it on purpose because I wanted to first understand the core things before jumping into Express and MongoDB.

## What I learned from this

- How to create a server using the `http` module
- How request and response actually work (req, res)
- How to read the url and method and send different response based on that
- Why we need `JSON.stringify` to send data (because raw json cannot go through TCP)
- How to read the request body chunk by chunk using streams
- Reading and writing a json file with the `fs` module
- Using TypeScript with node and running it with `tsx`
- Keeping the code organized (routes, controller, service, utils)

## Tech used

- Node.js (http module, no express)
- TypeScript
- tsx (to run ts file directly)
- dotenv (for the PORT)

## Folder structure

```
first-node-project/
  src/
    config/        -> load env and export the port
    controllers/   -> product controller (all crud logic)
    database/      -> db.json (acting like a database)
    routes/        -> route handler
    service/       -> read/write the json file
    types/         -> IProduct type
    utils/         -> parseBody and sendResponse helpers
    server.ts      -> create and start the server
```

## How to run

Go inside the project folder first:

```
cd first-node-project
```

Install the packages:

```
npm install
```

Make a `.env` file and put the port:

```
PORT=5000
```

Then run in dev mode:

```
npm run dev
```

If everything is fine you will see `Server is running 5000 successfully!!!` in the terminal.

## API Endpoints

Base url is `http://localhost:5000`

| Method | Endpoint | What it does |
|--------|----------------|------------------------------|
| GET | `/` | root route, just a message |
| GET | `/products` | get all products |
| GET | `/products/:id` | get single product by id |
| POST | `/products` | create a new product |
| PUT | `/products/:id` | update a product by id |
| DELETE | `/products/:id` | delete a product by id |

### Example body for POST / PUT

```json
{
  "name": "Symphony Z60",
  "price": 120
}
```

The `id` is added automatically using `Date.now()` when creating, so you don't need to send it.

## Note

This is only a learning project so there are some things I know can be improved, like the data is stored in a json file and not a real database, and there is no proper validation yet. I kept it simple on purpose. I will improve these things when I move to the Express and MongoDB part of the course.

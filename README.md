# Order Management System

A simple order management system using Express.js and Redis for handling order placement and queuing. This system ensures that only 100 units of an order are processed at a time, with any excess quantity added to a queue and processed sequentially.

## Features

- Processes orders with a limit of 100 units at a time.

- Excess quantity is queued and processed later.

- Uses Redis for temporary storage of processing quantities.

- Implements MongoDB (Mongoose) for order persistence.

## Installation & Setup

Prerequisites

Ensure you have the following installed:

- Node.js (v14+ recommended)

- MongoDB (Running locally or using a cloud service like MongoDB Atlas)

 - Redis (Running locally or using a Redis cloud service)

## Clone the Repository

```bash
        git clone https://github.com/your-username/order-management.git
        cd order-management
```

## Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a .env file in the root directory and set the following variables:

```bash
DB="mongodburl"
REDIS="redis databse URL"
```

## Start the Server
``` bash
npm run build
```


## API Endpoints

### Signup
```bash
http://localhost:3003/api/v1/auth/signup
  Request body: {
    "username":"shubham",
    "password":"shubham1234"
}

```

 ### Signin
 ```bash
  http://localhost:3003/api/v1/auth/signin
  Request body: {
    "username":"shubham",
    "password":"shubham1234"
}
```

### Order
```bash
http://localhost:3003/api/v1/orders
Request body: {
    "m_symbolId":420039090901, 
    "m_price":120, 
    "m_qty":200, 
    "m_side":"B"

}

```

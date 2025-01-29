import express from "express";
import { sendLoginMessage,sendLogOutMessage } from "./utils/message";
import { Auth } from "./controllers/auth";
import { OrderManagement } from "./controllers/order";

export const app = express();


app.use(express.json());
app.use(express.urlencoded())

/*
We have to build a exchange system
1. Login and Logout time                                    DONE
2. Login time is 10AM IST                                   DONE
3. Logout time is 1PM IST                                   DONE
4. For the above case we have use cron job to send the message
5. After 1pm IST order will be rejected.
6. Throttled order system
7. if 100 order is placed in 1sec then the next 100 order send to the queue
    after processing the first 100 order then process the queued 100 orders
8. Update the order. If there is an order that is present with same orderId 
    update the order in the queue without changing the order of the queue
*/

// Every Day it will send reminder to the users about the status of the market
sendLoginMessage();
sendLogOutMessage();





// Signup and SignIn Routes
app.post("/api/v1/auth/signup", Auth.userSignUp)
app.get("/api/v1/auth/signin", Auth.userSignIn)



// orderPlace

app.post("/api/v1/orders",OrderManagement.placeOrder);

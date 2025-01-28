import { app } from "./server";



app.listen(process.env.PORT || 3003 ,()=>{
    console.log("server is on")
})
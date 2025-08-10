const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


const port = 5000;

app.use(session({secret: "mysupersecretstring", resave:false, saveUninitialized: true}));

app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
})


app.get("/result",(req,res)=>{
    let {name = "vani"} = req.query;
    req.session.name = name;
    if(name === "vani")
    {
        req.flash("error", "Incorrect username");
    }   
    else{
        req.flash("success", "You are successfully logged");
    }
    console.log(req.session);
    res.redirect("/hello");
})

app.get("/hello" ,(req,res)=>{
    // res.send(`Hello ${req.session.name}`);

    res.render("flash.ejs", {name : req.session.name});
})

// app.get("/", (req,res)=>{
//     // req.session.count = 1;
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count = 1;
//     }
//     res.send(`It is the ${req.session.count} time`);
// })



















// app.use(cookieParser("secretCode"));


// app.get("/signedcookie",(req,res)=>{
//     res.cookie("colour", "green",{signed:true})
//     console.log(req.cookies)
//     res.send("signed is finished");
// })

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verified");
// })

// app.get("/getcookies", (req,res)=>{
//     res.cookie("geet", "Hello");
//     res.cookie("key", "value");
//     res.cookie("name", "vani");
//     res.send("good");
// })

// app.get("/",(req,res)=>{
//     console.log(req.cookies);
//     let {name = "mani" } = req.cookies;
//     console.log(name);
//     res.send(`Hello ${name}`);
// })


app.listen(port,()=>{
    console.log("server is listening");
})


// if(process.env.NODE_ENV != production){
    require("dotenv").config();
// 
// }

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const ListingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const port = 5000;


const dbUrl = process.env.ATLAS_URL;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));

app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname,"/public")))


const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto:{
        secret :  process.env.SECRET,
    },
    touchAfter : 24*3600
});

store.on("error",(err)=>{
    console.log("Error in Mongo Session", err);
})

const sessionoptions = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie :{
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge :  7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    }
}

app.use(session(sessionoptions));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connecting database

main()
    .then(()=>{
        console.log("Connection successful");
    })
    .catch((err)=>{
        console.log(err);
    })

async function main() {
    await mongoose.connect(dbUrl);
}

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.isAuthenticated() ? req.user : null;
    next();
})


// Listings 

app.use("/listings", ListingRouter);

// Reviews 

app.use("/listings/:id/reviews", reviewRouter);

// SignUp

app.use("/", userRouter);

// Error Handling

app.all("*",(req,res,next)=>{
    next(new ExpressError(403, "Page Not Found!"))
})

app.use((err,req,res,next)=>{
    let {statusCode = 401 , message = "Something went wrong"} = err;
    res.status(statusCode).render("error",{message});
})

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})

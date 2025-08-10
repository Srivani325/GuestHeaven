const User = require("../models/user.js");


module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup");
 }

 module.exports.signup = async(req,res)=>{
    try{
        let { username , email , password} =req.body;
        console.log(req.body);
        const newUser = new User({ username , email });
        const registereduser = await User.register(newUser, password);
        console.log(registereduser);
        req.login(registereduser,(err)=>{
            if(err){
            return next(err);
            }
            req.flash("success" , "Welcome to Wanderlust");
            res.redirect("/listings");
        })
    }
    catch(e){
        req.flash("error" , e.message );
        res.redirect("/signup")
    }
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login");
}

module.exports.login = async(req,res)=>{
    req.flash("success" , "Welcome back to Wanderlust");
    let redirectUrl = res.locals.redirectUrl || "\listings" ;
    if (redirectUrl && redirectUrl.includes("/reviews")) {
        const listingId = redirectUrl.split("/")[2]; 
        redirectUrl = `/listings/${listingId}`;
    }
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next)=>{
    req.logout((err) =>{
        if(err){
            return next(err);
        }
        req.flash("success" , "You are logged out");
        res.redirect("/listings");
    })
}
const WrapAsync = require("./utils/WrapAsync");
const listings = require("./models/listing.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/reviews.js");

module.exports.isLogged = (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Please login to proceed further");
        return res.redirect("/login");
    }
    next();
}


module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}


module.exports.isAllowed = WrapAsync(async(req,res,next)=>{
    let {id} = req.params;
    let listing = await listings.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id))
        {
            req.flash("error" , "You are not the owner of this list");
            return res.redirect(`/listings/${id}`);
        }
        next();
})

module.exports.validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map( (el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
}

module.exports. validateReview = (req,res,next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map( (el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
}


module.exports.isAuthorReview =WrapAsync( async (req,res,next)=>{
    let {reviewId ,id} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id))
        {
            req.flash("error" , "You are not the author of this review ");
            return res.redirect(`/listings/${id}`);
        }
        next();
})

const Review = require("../models/reviews.js");
const listings = require("../models/listing.js");

module.exports.createReview = async(req,res)=>{
    let listing = await listings.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log(newReview);
    req.flash("success", "New Review added successfully");
    res.redirect(`/listings/${req.params.id}`);
}

module.exports.destroyReview = async(req,res)=>{
    let {id , reviewId} = req.params;
    let review = await Review.findById(reviewId);
        let list = await listings.findByIdAndUpdate(id, {$pull : {reviews : reviewId}});
        await Review.findByIdAndDelete(reviewId);
        console.log("good");
        req.flash("success", "Review deleted successfully");
        res.redirect(`/listings/${id}`);

}
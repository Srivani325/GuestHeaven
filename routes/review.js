const express = require("express");
const router = express.Router({mergeParams: true});
const WrapAsync = require("../utils/WrapAsync.js");
const {isLogged, validateReview, isAuthorReview} = require("../middleware.js");
const ReviewsController = require("../controllers/reviews.js");


// Reviews - POST Route

router.post("/", isLogged,  validateReview, WrapAsync(ReviewsController.createReview));

// Reviews - DELETE Route

router.delete("/:reviewId", isLogged, isAuthorReview, WrapAsync(ReviewsController.destroyReview));


module.exports = router;
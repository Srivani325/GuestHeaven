
const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const {isLogged, isAllowed, validateListing} = require("../middleware.js");
const ListingController = require("../controllers/listings.js");
const multer  = require('multer');
const upload = require("../imagebbConfig.js");

// TO get all listings &  Inserting New list

router.route("/")
      .get(WrapAsync(ListingController.index ))
      .post(isLogged ,upload.single('listing[image]'), validateListing,  WrapAsync(ListingController.insertList), )
             

// create new listing

router.get("/new" , isLogged, ListingController.createList);

// To get trending page

router.get("/trending",WrapAsync(ListingController.trendingpage));

router.get("/apartments",WrapAsync(ListingController.apartmentspage));

router.get("/hotels",WrapAsync(ListingController.hotelspage));

router.get("/rooms",WrapAsync(ListingController.roomspage));

router.get("/mountains",WrapAsync(ListingController.mountainspage));

router.get("/pools",WrapAsync(ListingController.poolspage));

router.get("/farms",WrapAsync(ListingController.farmspage));

router.get("/private",WrapAsync(ListingController.privatepage));

router.get("/public",WrapAsync(ListingController.publicpage));

router.get("/greenstay",WrapAsync(ListingController.greenstaypage));


// Show only selected list   &  To update listing  &    Delete the listing
 
router.route("/:id")
      .get( WrapAsync(ListingController.showList))
      .put( isLogged, isAllowed, upload.single("image"), validateListing,  WrapAsync(ListingController.updateList))
      .delete( isLogged, isAllowed,  WrapAsync(ListingController.destroyList))


// to edit the listing

router.get("/:id/edit", isLogged , isAllowed, WrapAsync(ListingController.editList));

// To search for a listing

router.post("/search", isLogged, WrapAsync(ListingController.searchListing))



module.exports = router;


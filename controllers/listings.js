require("dotenv").config();
const listings = require("../models/listing.js");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");


module.exports.index =  async(req,res)=>{
    let allListings = await listings.find();
    res.render("home", {allListings}); 
}

module.exports.createList = (req,res)=>{
    res.render("create");
}

module.exports.showList = async(req,res)=>{
    let {id} = req.params;
    let list = await listings.findById(id).populate({path :"reviews" , populate: {path : "author"}}).populate("owner");
    if(!list){
        req.flash("error", "Listing does not exist");
        res.redirect("/listings");
    }
    console.log(list);
    res.render("show",{list});
}

module.exports.insertList = async(req,res,next)=>{
        const newListing = new listings({...req.body.listing,
        image : {
                url: `/uploads/${req.file.filename}`,
                filename: req.file.filename
              }
        });
        newListing.owner = req.user._id;
        if (req.file) {
            const form = new FormData();
            form.append('image', fs.createReadStream(req.file.path));
            try {
                const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
                form,
                { headers: form.getHeaders() }
                );
                // Save image URL to the listing
                newListing.image = {
                    url: response.data.data.url,
                    delete_url: response.data.data.delete_url
                };
            
                fs.unlinkSync(req.file.path); // delete local image
                } catch (err) {
                console.error('Image upload failed:', err.message);
                }
            }
            await newListing.save();
            req.flash("success", " New list created successfully");
            res.redirect("/listings",);
}

module.exports.updateList = async(req,res)=>{
    let {id} = req.params;
    let list = req.body.listing;
    let listing = await listings.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id))
    {
        req.flash("error" , "You are not allowed to update the list");
        return res.redirect(`/listings/${id}`);
    }
    if (req.file) {
        const form = new FormData();
        form.append("image", fs.createReadStream(req.file.path));
        try {
          const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
            form,
            { headers: form.getHeaders() }
          );
          console.log("Uploaded new image to ImgBB");
    
          // Update image field
          data.image = {
            url: response.data.data.url,
            delete_url: response.data.data.delete_url
          };
    
          // Remove local image
          fs.unlinkSync(req.file.path);
        } catch (err) {
          console.error("Image upload failed:", err.message);
        }
      }
    let updatedList = await listings.findByIdAndUpdate(id,{...list})
    req.flash("success", "list is updated successfully");
    res.redirect(`/listings/${id}`);
}

module.exports.editList = async(req,res)=>{
    let {id} = req.params;
    let info = await listings.findById(id);
    if(!info){
        req.flash("error","List does not exist");
        res.redirect("/listings");
    }
    if(!info.owner._id.equals(res.locals.currUser._id))
    {
        req.flash("error" , "You are not allowed to update the list");
        return res.redirect(`/listings/${id}`);
    }
    res.render("edit", {info});
}

module.exports.destroyList = async(req,res)=>{
    const {id} = req.params;
    await listings.findByIdAndDelete(id);
    req.flash("success", "List deleted successfully");
    res.redirect("/listings");
}

module.exports.searchListing = async(req,res)=>{
    let {title} = req.body
    console.log(title);
    let listing = await listings.findOne({title : title});
    let id = listing._id;
    console.log(id);
    res.redirect(`/listings/${id}`);
}

module.exports.trendingpage = async(req,res)=>{
    console.log("success");
    let allListings = await listings.find({});
    res.render("filters/trending", {allListings});
}


module.exports.greenstaypage = async(req,res)=>{
    console.log("success");
    let allListings = await listings.find({});
    res.render("filters/greenstay", {allListings});
}


module.exports.apartmentspage = async(req,res)=>{
    console.log("success");
    let allListings = await listings.find({});
    res.render("filters/apartments", {allListings});
}


module.exports.roomspage = async(req,res)=>{
    console.log("success");
    let allListings = await listings.find({});
    res.render("filters/rooms", {allListings});
}


module.exports.mountainspage = async(req,res)=>{
    console.log("success");
    let allListings = await listings.find({});
    res.render("filters/mountains", {allListings});
}


module.exports.poolspage = async(req,res)=>{
    console.log("success");
    let allListings = await listings.find({});
    res.render("filters/pools", {allListings});
}


module.exports.farmspage = async(req,res)=>{
    console.log("success");
    let allListings = await listings.find({});
    res.render("filters/farms", {allListings});
}


module.exports.privatepage = async(req,res)=>{
    console.log("success");
    let allListings = await listings.find({});
    res.render("filters/private", {allListings});
}


module.exports.publicpage = async(req,res)=>{
    console.log("success");
    let allListings = await listings.find({});
    res.render("filters/public", {allListings});
}


module.exports.hotelspage = async(req,res)=>{
    console.log("success");
    let allListings = await listings.find({});
    res.render("filters/hotels", {allListings});
}
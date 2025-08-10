console.log(process.env.ATLAS_URL);
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js")


main()
    .then(()=>{
        console.log("connected successfully");
    })
    .catch((err)=>{
        console.log(err);
    })

async function main() {
    await mongoose.connect(process.env.ATLAS_URL);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>( {...obj, owner :"688c9b1767805941090e34a1" }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}

initDB();

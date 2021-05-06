// const cloudinary = require('cloudinary')
// const dotenv =require('dotenv')

// dotenv.config();

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// // exports.uploads = (file, folder) =>{


// //     return new Promise(resolve =>{
// //         cloudinary.uploader.upload(file, (result) =>{

// //             resolve({
// //                 url : result.url,
// //                 id: result.public_id
// //             })
// //         },{
// //             resource_type : "auto",
// //             folder : folder
// //         })
// //     }) 
// // }

// module.exports = { cloudinary };        

// CLOUDINARY_CLOUD_NAME = https-not-nam-project-herokuapp-com
// CLOUDINARY_API_KEY = 625278141351419
// CLOUDINARY_API_SECRET = Vch7vZNTqRZ2V3NmTwvfMVKTfKY

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "project-ecommerce",
    api_key: "625278141351419",
    api_secret: "Vch7vZNTqRZ2V3NmTwvfMVKTfKY",
});

module.exports = cloudinary;
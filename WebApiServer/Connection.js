const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const URI = 'mongodb+srv://nhatnammongdb:nhatnam123@cluster0.ur6w9.mongodb.net/Emaking?retryWrites=true&w=majority'

const connectDB  = async () =>{
    await mongoose
    .connect(URI || process.env.DB_CONNECTSTRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true
  
    }).then(() => console.log('DB Connected!'))
    .catch(err => {
      console.log(err.message);
    });
  
} 
module.exports = connectDB;
const mongoose = require('mongoose');
const errorHandler = require('express-async-handler');


const connectDb = errorHandler(async () => {
    const connect = await mongoose.connect(process.env.CONNECTION);
    console.log('connectioin done ', connect.connection.name);
})


//! OR
// const connectDb1 = async () => {
//     try {
//         const connect = await mongoose.connect(process.env.CONNECTION);
//         console.log('connectioin done ', connect.connection.name);
//     } catch (err) {
//         console.log(err);
//         process.exit(1);
//     }
// }

module.exports = connectDb;
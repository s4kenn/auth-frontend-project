const mongoose = require('mongoose')

const connectToDB = async () => {

    try {

        mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.9yny4.mongodb.net/`)
        console.log(`MongoDB connected successfully`);

    } catch (error) {
        console.log(error.message);
        console.log(`MongoDB connection failed`);
    }

}

module.exports=connectToDB
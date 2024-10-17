import mongoose from 'mongoose'


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        const connection = mongoose.connection
        console.log(connection.host)
    } catch (error) {
        console.log(error)
    }
}

export { connectDb }
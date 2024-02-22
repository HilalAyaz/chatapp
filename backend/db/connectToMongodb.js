import mongoose from 'mongoose'

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log('Database connection established')
  } catch (error) {
    console.log(' Database connection error: ' + error.message)
  }
}
export default connectToMongoDB

import mongoose from "mongoose";

export async function connection() {
    try {
        await mongoose.connect(process.env.MONGDB_URL as string)
        console.log("Conected database")
    } catch (error) {
        console.error("Database connection lost")
    }
}

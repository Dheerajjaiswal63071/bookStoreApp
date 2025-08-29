import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose"
import cors from "cors";
import bookRoute from "./route/book.route.js"
import userRoute from "./route/user.route.js"

// Load environment variables first
dotenv.config()

const app = express()
const PORT = 4000
const URI = "mongodb://localhost:27017/bookStore";

console.log("🔧 Using hardcoded values:");
console.log("PORT:", PORT);
console.log("MongoDBURI:", URI);

// Connect to MongoDB
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("✅ Connected to MongoDB successfully")
})
.catch((error) => {
    console.error("❌ MongoDB connection error:", error)
    process.exit(1)
})
//middleware
app.use(cors())
app.use(express.json());
app.use("/book",bookRoute);
app.use("/user",userRoute)

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to BookStore API", endpoints: { books: "/book" } });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

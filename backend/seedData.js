import mongoose from "mongoose";
import Book from "./model/book.model.js";

const sampleBooks = [
    {
        name: "React Fundamentals",
        price: 29.99,
        category: "Paid",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
        title: "Learn React from scratch with hands-on projects"
    },
    {
        name: "JavaScript Basics",
        price: 0,
        category: "Free",
        image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop",
        title: "Master JavaScript fundamentals for web development"
    },
    {
        name: "Node.js Backend",
        price: 49.99,
        category: "Paid",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
        title: "Build scalable backend applications with Node.js"
    },
    {
        name: "CSS Mastery",
        price: 0,
        category: "Free",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        title: "Advanced CSS techniques and modern layouts"
    },
    {
        name: "Python for Beginners",
        price: 39.99,
        category: "Paid",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
        title: "Start your programming journey with Python"
    },
    {
        name: "Git & GitHub",
        price: 0,
        category: "Free",
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=300&fit=crop",
        title: "Version control and collaboration with Git"
    },
    {
        name: "MongoDB Database",
        price: 59.99,
        category: "Paid",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop",
        title: "Learn NoSQL database design and management"
    },
    {
        name: "HTML5 Essentials",
        price: 0,
        category: "Free",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=300&fit=crop",
        title: "Modern HTML5 semantic markup and best practices"
    }
];

const URI = "mongodb://localhost:27017/bookStore";

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB successfully");

        // Clear existing books
        await Book.deleteMany({});
        console.log("🗑️ Cleared existing books");

        // Insert sample books
        const insertedBooks = await Book.insertMany(sampleBooks);
        console.log(`✅ Successfully inserted ${insertedBooks.length} books`);

        // Display the inserted books
        console.log("\n📚 Sample books added:");
        insertedBooks.forEach((book, index) => {
            console.log(`${index + 1}. ${book.name} - $${book.price} (${book.category})`);
        });

        console.log("\n🎉 Database seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();

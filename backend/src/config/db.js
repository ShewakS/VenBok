const mongoose = require("mongoose");
const dns = require("dns").promises;
const env = require("./env");
const logger = require("../utils/logger");

// Set Google DNS servers to fix SRV record resolution on Windows
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// ── MongoDB connection ───────────────────────────────────────────────────────
const connectDB = async () => {
	try {
		const mongoUri = env.mongoUri || "mongodb+srv://user:Shewak08@venbok-database.nenrsob.mongodb.net/VenBok?appName=VenBok-Database";
		
		await mongoose.connect(mongoUri, {
			serverSelectionTimeoutMS: 30000,
			socketTimeoutMS: 45000,
		});
		
		logger.info("MongoDB connected", {
			host: "MongoDB Atlas",
			database: "VenBok",
		});
	} catch (error) {
		logger.error("MongoDB connection failed", error);
		throw error;
	}
};

module.exports = { connectDB };

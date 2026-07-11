require("dotenv").config();

const parseCorsOrigins = (rawValue) => {
	if (!rawValue) {
		return ["http://localhost:3000"];
	}

	const origins = String(rawValue)
		.split(",")
		.map((origin) => origin.trim())
		.filter(Boolean);

	return origins.length > 0 ? origins : ["http://localhost:3000"];
};

const env = {
	nodeEnv: process.env.NODE_ENV || "development",
	port: Number(process.env.PORT) || 5000,
	// MongoDB Atlas connection string
	mongoUri: process.env.MONGO_URI || "mongodb+srv://user:Shewak08@venbok-database.nenrsob.mongodb.net/VenBok?appName=VenBok-Database",
	jwtSecret: process.env.JWT_SECRET || "venue-booking-dev-secret",
	jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
	corsOrigins: parseCorsOrigins(process.env.CORS_ORIGIN),
};

module.exports = env;

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
	nodeEnv: process.env.NODE_ENV ,
	port: Number(process.env.PORT) ,
	mongoUri: process.env.MONGO_URI ,
	jwtSecret: process.env.JWT_SECRET ,
	jwtExpiresIn: process.env.JWT_EXPIRES_IN ,
	corsOrigins: parseCorsOrigins(process.env.CORS_ORIGIN),
};

module.exports = env;

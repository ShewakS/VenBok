const ApiError = require("../utils/ApiError");
const { User } = require("../models");
const { USER_ROLES } = require("../validators/auth.validator");

const sanitizeUser = (user) => {
	const plain = user.toObject ? user.toObject() : { ...user };
	const { password, ...safeUser } = plain;
	return safeUser;
};

const normalizeRole = (value) => {
	if (typeof value !== "string") return "";
	const role = value.trim().toLowerCase();
	if (role === "coordinator" || role === "student coordinator") return "student";
	return role;
};

const listUsers = async (query = {}) => {
	const role = normalizeRole(query.role);

	if (role && !USER_ROLES.includes(role)) {
		throw ApiError.badRequest(`role must be one of: ${USER_ROLES.join(", ")}`);
	}

	const where = role ? { role } : {};
	const users = await User.find(where).sort({ createdAt: -1 });
	return users.map(sanitizeUser);
};

const getUserById = async (userId) => {
	const user = await User.findById(userId);

	if (!user) {
		throw ApiError.notFound("User not found");
	}

	return sanitizeUser(user);
};

const updateUser = async (userId, payload = {}) => {
	const existing = await User.findById(userId);

	if (!existing) {
		throw ApiError.notFound("User not found");
	}

	const name = typeof payload.name === "string" ? payload.name.trim() : undefined;
	const role = typeof payload.role === "string" ? normalizeRole(payload.role) : undefined;

	if (name !== undefined && !name) {
		throw ApiError.badRequest("name cannot be empty");
	}

	if (name && name.length > 80) {
		throw ApiError.badRequest("name must be at most 80 characters long");
	}

	if (role !== undefined && !USER_ROLES.includes(role)) {
		throw ApiError.badRequest(`role must be one of: ${USER_ROLES.join(", ")}`);
	}

	const updateData = {};
	if (name !== undefined) updateData.name = name;
	if (role !== undefined) updateData.role = role;

	const updated = await User.findByIdAndUpdate(userId, updateData, { new: true });
	return sanitizeUser(updated);
};

const deleteUser = async (userId) => {
	const user = await User.findById(userId);

	if (!user) {
		throw ApiError.notFound("User not found");
	}

	await user.deleteOne();
	return sanitizeUser(user);
};

module.exports = {
	listUsers,
	getUserById,
	updateUser,
	deleteUser,
};

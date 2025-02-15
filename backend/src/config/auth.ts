const jwtSecret = process.env.JWT_SECRET || "your-secret-key-here";
const jwtExpires = "24h";

export { jwtExpires, jwtSecret };

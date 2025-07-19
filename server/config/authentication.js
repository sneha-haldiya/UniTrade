const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "secret-key@123";

async function hashPassword(password) {
    return await bcrypt.hash(password, 12);
}

async function verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

async function createSession(userId) {
    const token = jwt.sign({ userId }, SECRET, {
        expiresIn: "60m",
    });
    return { token };
}

module.exports = { hashPassword, verifyPassword, createSession, };
import { sign, verify } from "jsonwebtoken";
import { hash, compare } from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-change-this";

export async function hashPassword(password: string) {
    return await hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
    return await compare(password, hash);
}

export function generateToken(payload: object) {
    return sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
    try {
        return verify(token, JWT_SECRET);
    } catch (e) {
        return null;
    }
}

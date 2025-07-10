/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";

export function decodeJwtToken(token: string): object | null {
  try {
    const decoded = jwtDecode<any>(token);
    return decoded;
  } catch (error) {
    console.error("Invalid JWT token", error);
    return null; // Return null if the token is invalid or cannot be decoded
  }
}

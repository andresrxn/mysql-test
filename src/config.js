import { config } from "dotenv"

config()


export const SERVER_PORT = process.env.SERVER_PORT || 3000
export const DB_HOST = process.env.DB_HOST || "localhost"
export const DB_PORT = process.env.DB_PORT || 3306
export const DB_USER = process.env.DB_USER || "root"
export const DB_PASS = process.env.DB_PASS || "Carlitosandres1"
export const DB_NAME = process.env.DB_NAME || "companydb"


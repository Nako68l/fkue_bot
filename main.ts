import { config } from "dotenv"
import { resolve } from "path"
config({ path: resolve(__dirname, "./.env") })
console.log(process.env.BOT_TOKEN)

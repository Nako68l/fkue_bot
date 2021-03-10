import { config } from "dotenv"
import { resolve } from "path"
config({ path: resolve(__dirname, "./.env") })
import express, { Request, Response } from 'express'
import { Telegraf } from 'telegraf'

const token = process.env.BOT_TOKEN
if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}

const bot = new Telegraf(token)
bot.start(ctx => ctx.reply('Greetings! Have a wonderful day!'))
// Set the bot response
bot.on('text', (ctx) => ctx.replyWithHTML('<b>Hello</b>'))
bot.on('message', (ctx) =>   ctx.replyWithPhoto({
  url: 'https://picsum.photos/200/300/?random',
  filename: 'kitten.jpg'
}))

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
//
// // Set telegram webhook
// // npm install -g localtunnel && lt --port 3000
// bot.telegram.setWebhook('https://polite-dingo-85.loca.lt/secret-path')
//     .catch(err => console.error(err))
//
// const app = express()
// app.get('/', (req: Request, res: Response) => res.send('Hello World!'))
// // Set the bot API endpoint
// app.use(bot.webhookCallback('/secret-path'))
//
// app.post(`/secret-path`, (req, res) => {
//   console.log(req.body)
//   return bot.handleUpdate(req.body, res)
// })
// app.listen(3000, () => {
//   console.log('Example app listening on port 3000!')
// })
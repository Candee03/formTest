import { Router } from "express";
import nodemailer from 'nodemailer'
import { cliente } from "../app.js";

const mailRouter = Router()

export const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'candela.alfano1503@gmail.com',
        pass: `dlqbuaarovcnwcuq`
    }
})

mailRouter.get('/send', async(req, res) => {
    await transport.sendMail({
    from:'candela.alfano1503@gmail.com',
    to: (cliente.email).toString(),
    subject: `Test`,
    html:`
    <div>
        <p style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; font-size: large; text-align: center;">Hola, ${cliente.name}!</p>
        <p style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">Aqui te dejamos un archivo para que descargues😉</p>
    </div>
    `,
    attachments:[{
        filename: 'test.pdf',
        path: 'src/files/test.pdf',
        cid: 'fileTest'
    }]
    })

    res.render('checkout')
})

export default mailRouter
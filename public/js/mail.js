const socket = io()
// import { transport } from "../../src/router/mail.router.js"

const nombre = document.getElementById('nombre')
const email = document.getElementById('email')
const btn = document.getElementById('btn')

const createClient = async()  => {
    cliente = {
        name: nombre.value,
        email: email.value
    }
    socket.emit('newCliente', cliente)
}

// const send = async(data) => {
//     console.log('se envio el mail', data);
// }

btn.addEventListener("click", createClient)

// socket.on ('cliente', (data) => {
//     if (data) {
//         send(data)
//     }
// })
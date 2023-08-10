import express from 'express'
import handlebars from 'express-handlebars'
import mailRouter from './router/mail.router.js';
import { Server } from "socket.io";

export let cliente

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.engine('handlebars', handlebars.engine())
app.set('views', 'views/')
app.set('view engine', 'handlebars')

app.use('/api/mail', mailRouter)

app.get('/', async(req,res) => {
    res.render('form')
})

const httpServer = app.listen(3000 , () => {
    console.log(`esta escuchando el server ${3000}`)
})

export const io = new Server(httpServer)

io.on('connection', async (socket)=> {
    console.log('nuevo cliente conectado');
    
    socket.emit('cliente', cliente);
    
	socket.on('newCliente', async(newCliente) => {
        cliente = newCliente
        io.emit('cliente', cliente)
	});
})
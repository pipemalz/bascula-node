import { SerialPort } from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'


import express from 'express'
import http from 'node:http'

import { PORT } from './config.js'

const app = express()

const server = http.createServer(app)


server.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`)
})

// Reemplaza 'COM3' con el nombre de tu puerto serial
const port = new SerialPort({
  path: 'COM3',
  baudRate: 9600,  // Ajusta la tasa de baudios según tu configuración
});

// Usa el parser de readline para recibir datos por líneas
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// Evento cuando el puerto se abre
port.on('open', () => {
  console.log('Puerto serial abierto');
});

// Evento cuando se reciben datos
parser.on('data', data => {
  console.log('Datos recibidos:', data);
});

// Manejo de errores
port.on('error', err => {
  console.error('Error en el puerto serial:', err.message);
});
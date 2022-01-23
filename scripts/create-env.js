/*Este script crea el .env que no se está incluyendo en el repositorio por cuestiones de seguridad.
Sería necesario configurar entonces el servidor donde se está haciendo el deploy para que tenga la
vabriable de entorno a la cual se hace referencia*/

//En el package.json se anida en el comando de build la ejecución de este archivo

const fs = require('fs');

fs.writeFileSync('./.env', `API=${process.env.API}\n`);

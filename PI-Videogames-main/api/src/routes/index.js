const { Router } = require('express');
const videogamesRoute = require('./videogames.js')
const genresRoute = require('./genres.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', videogamesRoute) 
router.use('/genres', genresRoute)

module.exports = router;

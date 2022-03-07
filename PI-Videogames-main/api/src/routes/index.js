const { Router } = require('express');
//Para poder generar mi enrutado
const videogamesRoute = require('./videogames.js')
const genresRoute = require('./genres.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//middlewares para generar las rutas
router.use('/', videogamesRoute) /* para /api/ */
router.use('/genres', genresRoute) /* para /api/genres */

module.exports = router;

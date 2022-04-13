const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      allowNull: false,
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull:false
    },
    releaseDate:{
      type:DataTypes.STRING
    },
    rating:{
      type:DataTypes.STRING
    },
    plataforms:{
      type:DataTypes.TEXT,
      /* allowNull:false */
    },
   /*  createInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    } */
  });
};

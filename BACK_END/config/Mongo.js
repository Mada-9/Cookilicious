// const mongoose = require('mongoose');

// const connectDB = (mongo_uri, bdd_name) => {
//   mongoose.connect(mongo_uri, {dbName: bdd_name})
//     .then(() => console.log('Connexion à mongoDB réussi !'))
//     .catch((error) => {
//       console.error(' Erreur de connexion à mongoDB : ', error.message);
//       // process.exit(1); // arrête le serveur si la connexion échoue
//     });
// }

// module.exports = connectDB


const mongoose = require('mongoose');

const connectDB = async (mongo_uri, bdd_name) => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(mongo_uri, { dbName: bdd_name });
    console.log('Connexion à mongoDB réussie !');
  } catch (error) {
    console.error(' Erreur de connexion à mongoDB : ', error.message);
  }
}

module.exports = connectDB;
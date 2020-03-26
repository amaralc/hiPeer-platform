/* --------------------------------- IMPORTS ---------------------------------*/
import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Equipment from '../app/models/Equipment';
import Request from '../app/models/Request';


/* --------------------------------- CONTENT ---------------------------------*/
/* Cria array com todos os models da aplicacao */
const models = [
  User,
 
  Equipment,
 
  Request
];


/*
 ** Cria classe Database
 */
class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  /*
   ** metodo que faz conexao com base de dados e carrega os models da aplicacao
   */
  init() {
    /*
     ** Variavel esperada dentro dos models no metodo init
     */
    this.connection = new Sequelize(databaseConfig);

    models
      /* Acessa o metodo init de cada model da aplicacao passando a conexao */
      .map(model => {
        model.init(this.connection);
        return model;
      })

      /** Se 'model.associate' existir (condição &&) chama metodo passando models */
      .map(model => model.associate && model.associate(this.connection.models));
  }

  /** Passa a url de conexão do mongo */
  mongo() {
    this.mongoConnection = mongoose.connect(
      /**
       * URL do mongo
       */
      process.env.MONGO_URL,
      /**
       * useNewUrlParser permite com que se use o formato mais novo de
       * url do mongo
       * useFindAndModify: configuração do mongo para quando o desenvolvedor
       * for encontrar e modificar registros
       */
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );
  }
}

/* --------------------------------- EXPORTS ---------------------------------*/
export default new Database();

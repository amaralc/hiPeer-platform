/* --------------------------------- IMPORTS ---------------------------------*/
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import File from '../app/models/File';

/* --------------------------------- CONTENT ---------------------------------*/

/* Cria array com todos os models da aplicacao */
const models = [User, File];

/*
 ** Cria classe Database
 */
class Database {
  constructor() {
    this.init();
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
      .map(model => model.init(this.connection))
      /** Se 'model.associate' existir (condição &&) chama metodo passando models */
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

/* --------------------------------- EXPORTS ---------------------------------*/
export default new Database();

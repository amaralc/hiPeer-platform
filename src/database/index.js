/* --------------------------------- IMPORTS ---------------------------------*/
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Tool from '../app/models/Tool';
/* --------------------------------- CONTENT ---------------------------------*/

/* Cria array com todos os models da aplicacao */
const models = [User, Tool];

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

    /* Acessa o metodo init de cada model da aplicacao passando a conexao */
    models.map(model => model.init(this.connection));
  }
}

/* --------------------------------- EXPORTS ---------------------------------*/
export default new Database();

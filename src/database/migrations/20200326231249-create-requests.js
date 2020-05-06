/* --------------------------------- EXPORTS ---------------------------------*/
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('requests', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      /** Nome da pessoa que solicitou a demanda */
      solicitante: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      /** Telefone de contato do solicitante */
      contato: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      /** O produto que foi solicitado */
      produto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      /** Quantidade do produto solicitado */
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      /** Destino do produto */
      destino: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      /** Data que o pedido foi feito */
      data_pedido: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      /** Prazo para a entrega do produto */
      data_entrega: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      /** Timestamp de registro da demanda */
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      /** ID (primary key) do usuário que registrou a demanda */
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        /** ... que referencie... */
        references: {
          /** ... a tabela 'users' */
          model: 'users',
          /** ... usando a chave 'id' */
          key: 'id',
        },
        /** Se 'id' for alterado, repasse a alteracao para tabela de demanda */
        onUpdate: 'CASCADE',
        /** Se 'id' for deletado, defina como nulo */
        onDelete: 'SET NULL',
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      /** ID (primary key) do usuário que fez o último update da demanda */
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        /** ... que referencie... */
        references: {
          /** ... a tabela 'users' */
          model: 'users',
          /** ... usando a chave 'id' */
          key: 'id',
        },
        /** Se 'id' for alterado, repasse a alteracao para tabela de demanda */
        onUpdate: 'CASCADE',
        /** Se 'id' for deletado, defina como nulo */
        onDelete: 'SET NULL',
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('requests');
  },
};

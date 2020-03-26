/* --------------------------------- IMPORTS ---------------------------------*/
/** Importa tudo de yup como Yup (dependencia nao tem export default) */
import * as Yup from 'yup';
import Equipment from '../models/Equipment';

/* --------------------------------- CONTENT ---------------------------------*/
class RequestController {
  /**
   * Metodo index com mesma face de um middleware no node.
   * Coleta registro de demanda dentro da base de dados expõe ao usuário.
   */
  async index(req, res) {
    /** O Request.findAll retorna todos as demandas cadastrados */
    const request = await Request.findAll({
      /** 'attributes' filtra os dados que serão mostrados ao usuário */
      attributes: [
        'solicitante',
        'produto',
        'quantidade',
        'destino',
        'data_Pedido',
        'data_Entrega',
      ],
    });
    return res.json(request);
  }

  /**
   * Metodo store com mesma face de um middleware no node.
   * Recebe dados do usuario e cria novo registro dentro da base de dados.
   */
  async store(req, res) {
    /** Define schema to validate req.body prior to 'store()' data */
    const schema = Yup.object().shape({
      /** Attribute 'solicitante' is a required string */
      solicitante: Yup.string().required(),
      /** Attribute 'produto' is string */
      produto: Yup.string().required(),
      /** Attribute 'quantidade' is a required string */
      quantidade: Yup.string().required(),
      /** Attribute 'destino' is a required string */
      destino: Yup.string().required(),
      /** Attribute 'data_pedido' is a required date */
      data_pedido: Yup.date().required(),
      /** Attribute 'data_entrega' is a required date */
      data_entrega: Yup.date().required(),
    });

    /** If 'req.body' do not attend to the schema requirements (is not valid) */
    if (!(await schema.isValid(req.body))) {
      /** Return error status 400 with message 'Validation has failed' */
      return res.status(400).json({ error: 'Validation has failed' });
    }

    /**
     * Cria nova demanda na base de dados usando resposta asincrona e retorna apenas
     * dados uteis.
     */
    const {
      solicitante,
      produto,
      quantidade,
      destino,
      data_pedido,
      data_entrega,
    } = req.body;

    const { id, created_by, updated_by } = await Equipment.create({
      solicitante,
      produto,
      quantidade,
      destino,
      data_pedido,
      data_entrega,
      created_by: req.userId,
      updated_by: req.userId,
    });

    /** Retorna json com dados uteis ao frontend */
    return res.json({
      id,
      solicitante,
      produto,
      quantidade,
      destino,
      data_pedido,
      data_entrega,
      created_by,
      updated_by,
    });
  }

  /** Metodo de alteracao dos dados da demanda */
  async update(req, res) {
    /** Define schema to validate req.body prior to 'store()' data */
    const schema = Yup.object().shape({
      /** Attribute 'id' */
      id: Yup.number().required(),
      /** Attribute 'solicitante' is a required string */
      solicitante: Yup.string(),
      /** Attribute 'produto' is string */
      produto: Yup.string(),
      /** Attribute 'quantidade' is a required string */
      quantidade: Yup.string(),
      /** Attribute 'destino' is a required string */
      destino: Yup.string(),
      /** Attribute 'data_pedido' is a required date */
      data_pedido: Yup.date(),
      /** Attribute 'data_entrega' is a required date */
      data_entrega: Yup.date(),
    });
    /** If 'req.body' do not attend to the schema requirements (is not valid) */
    if (!(await schema.isValid(req.body))) {
      /** Return error status 400 with message 'Validation has failed' */
      return res.status(400).json({ error: 'Validation has failed' });
    }

    /** Desestrutura e salva informações do corpo da requisição */
    const {
      solicitante,
      produto,
      quantidade,
      destino,
      data_pedido,
      data_entrega,
    } = req.body;

    /** If all requirements were met then updates user informaiton */
    const { id, updated_by } = await equipment.update({
      solicitante,
      produto,
      quantidade,
      destino,
      data_pedido,
      data_entrega,
      updated_by: req.userId,
    });

    /** Retorna json apenas com dados uteis ao frontend */
    return res.json({
      id,
      solicitante,
      produto,
      quantidade,
      destino,
      data_pedido,
      data_entrega,
      updated_by,
    });
  }
}

/* --------------------------------- EXPORTS ---------------------------------*/
export default new RequestController();

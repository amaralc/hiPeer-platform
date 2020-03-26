/* --------------------------------- IMPORTS ---------------------------------*/
import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';

/** Controllers */
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import EquipmentController from './app/controllers/EquipmentController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';
import RequestController from './app/controllers/RequestController';

/* --------------------------------- CONTENT ---------------------------------*/
/** Instancia novo roteador Router do express */
const routes = new Router();
const upload = multer(multerConfig);

/** Define rota POST para criar novo usuario */
routes.post('/users', UserController.store);
/** Define rota POST para criar nova session */
routes.post('/sessions', SessionController.store);
/** Define rota GET para listagem de equipamentos que estão disponíveis */
routes.get('/equipment', EquipmentController.index);

/** Define rota get de teste para avaliar integração contínua com buddy works */
routes.get('/', (req, res) => res.json({ 'lmp-platform': 'Up and running!' }));

/** Define MIDDLEWARE GLOBAL que vale para rotas que vem apos sua declaracao */
routes.use(authMiddleware);
/** Define rota PUT para editar dados do usuario */
routes.put('/users', UserController.update);
/**
 * Define rota POST para upload de arquivos (com middleware local)
 * Middleware chama variavel upload, metodo 'single' para fazer upload de

 * um arquivo por vez
 */
routes.post('/files', upload.single('file'), FileController.store);

/** Define rota POST para criar novo equipamento */
routes.post('/equipment', EquipmentController.store);

/** Define rota PUT para editar dados do equipamento */
routes.put('/equipment', EquipmentController.update);
/** Define rota GET para listagem demandas */
routes.get('/requests', RequestController.index);
/** Define rota POST para criar nova demanda */
routes.post('/requests', RequestController.store);

/** Define rota PUT para editar dados da demanda */
routes.put('/requests', RequestController.update);

/** Define rota GET para consulta de notificacoes do prestador de servico */
routes.get('/notifications', NotificationController.index);
/** Define rota PUT para marcar notificacoes como lidas */
routes.put('/notifications/:id', NotificationController.update);

/* --------------------------------- EXPORTS ---------------------------------*/
export default routes;

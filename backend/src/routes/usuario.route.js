import {Router} from 'express';
import userCtrl from '../controllers/usuario.controller.js';

const route = Router();

route.post('/register', userCtrl.register);

export default route;
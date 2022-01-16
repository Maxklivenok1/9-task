import Router from "express";
import Controller from "./Controller.js";


const router = new Router();
router.get('/', Controller.start);
router.post('/students', Controller.create)
router.get('/students', Controller.getAll);
router.get('/students/:id', Controller.getOne);
router.put('/students', Controller.update);
router.delete('/students/:id', Controller.delete);

export default router
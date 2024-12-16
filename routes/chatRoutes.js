import express from 'express';
import { addConversation, createChat, deleteChat, getAllChats, getConverstion } from '../controller/chatControllers.js';
import { isAuth } from '../middleware/isAuth.js';


const router = express.Router();

router.post('/new', isAuth, createChat);
router.get('/all', isAuth, getAllChats);
router.post('/:id', isAuth, addConversation);
router.post('/:id', isAuth, getConverstion);
router.delete('/:id', isAuth, deleteChat);



export default router;
import { Router } from 'express';
import {
  registerForHackathon,
  createHashathon,
  getHashthons,
  voidHashathon,
  listAllHashthonParticipants,
} from '../controllers/hashathon';
import { authenticateJWT } from '../middleware/authenticateJwt';

const hashathon = Router();

hashathon.post('/registerForHashathon', authenticateJWT, registerForHackathon);
hashathon.post('/create', authenticateJWT, createHashathon);
hashathon.get('/', authenticateJWT, getHashthons);
hashathon.delete('/:id', authenticateJWT, voidHashathon);
hashathon.get(
  '/getParticipants/:id',
  authenticateJWT,
  listAllHashthonParticipants
);
export default hashathon;

import express from 'express';
import * as tripTaleController from '../controllers/tripTaileController'

const tripTaleRoutes = express.Router();

tripTaleRoutes.get('/', tripTaleController.getAllTripTales);
tripTaleRoutes.get('/:id', tripTaleController.getTripTaleById);
tripTaleRoutes.get('/:userId/triptales', tripTaleController.getTripTalesByUserId);
tripTaleRoutes.post('/', tripTaleController.createTripTale);

export default tripTaleRoutes;

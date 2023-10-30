import express from 'express';
import * as placeController from '../controllers/placeController';

const placeRoutes = express.Router();

placeRoutes.get('/', placeController.getAllPlaces);
placeRoutes.get('/:id', placeController.getPlaceById);
placeRoutes.post('/', placeController.createPlace);

export default placeRoutes;

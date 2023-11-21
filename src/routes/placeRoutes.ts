import express from 'express';
import * as placeController from '../controllers/placeController';

const placeRoutes = express.Router();

placeRoutes.get('/', placeController.getAllPlaces);
placeRoutes.get('/:id', placeController.getPlaceById);
placeRoutes.post('/', placeController.createPlace);
placeRoutes.post('/fetch-places', placeController.fetchPlacesFromAPIAndSaveToDB);
placeRoutes.post('/update', placeController.updatePlace);

export default placeRoutes;

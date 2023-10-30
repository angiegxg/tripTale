import { Request, Response } from 'express';
import tripTaleService from '../services/tripTaleService';

async function getAllTripTales(_req: Request, res: Response) {
  try {
    const tripTales = await tripTaleService.getAllTripTales();
    res.json(tripTales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las TripTales.' });
  }
}

async function getTripTalesByUserId(req: Request, res: Response) {
    const userId = parseInt(req.params.userId); 
    try {
      const tripTales = await tripTaleService.getTripTalesByUserId(userId);
      res.json(tripTales);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los TripTales del usuario.' });
    }
  }

async function getTripTaleById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const tripTale = await tripTaleService.getTripTalesByUserId(+id);
      if (tripTale) {
        res.json(tripTale);
      } else {
        res.status(404).json({ error: 'TripTales de id no encontrada.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la TripTale del user.' });
    }
  }

async function createTripTale(req: Request, res: Response) {
  const {placeId, content, authorId } = req.body;
  try {
    const newTripTale = await tripTaleService.createTripTale(placeId, content, authorId);
    res.status(201).json(newTripTale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la TripTale.' });
  }
}

export { getAllTripTales, getTripTaleById, createTripTale,getTripTalesByUserId };

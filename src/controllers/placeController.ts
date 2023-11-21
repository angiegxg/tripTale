import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import * as placeService from '../services/placeService'

const prisma = new PrismaClient();

async function fetchPlacesFromAPIAndSaveToDB(_req:Request, res:Response) {
  try {
    await placeService.getPlacesByApis();
    res.status(200).send('Lugares guardados exitosamente.');
  } catch (error) {
    console.log("error en la funcion unida")
    res.status(500).json({ error: 'Error al migrar los datos de la API a la base de datos.' });
  }
}

async function getAllPlaces(_req: Request, res: Response) {
  try {
    const places = await prisma.places.findMany();
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los lugares.' });
  }
}

async function getPlaceById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const place = await placeService.getPlaceByIdFromDB(id)
    if (place) {
      res.json(place);
    } else {
      res.status(404).json({ error: 'Lugar no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el lugar.' });
  }
}

async function createPlace(req: Request, res: Response) {
  const { title, category, province, description, imgUrl, pageUrl, latitude, longitude } = req.body;
  try {
    const newPlace = await placeService.createPlaceInDB(title, category, province, description, imgUrl, pageUrl, latitude, longitude)
    res.status(201).json(newPlace);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el lugar.' });
  }
}

async function updatePlace(req: Request, res: Response) {
  const place = req.body;
  try {
    const newPlace = await placeService.updatePlaceFromBD(place)
    res.status(201).json(newPlace);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el lugar.' });
  }
}

export { getAllPlaces, getPlaceById, createPlace, fetchPlacesFromAPIAndSaveToDB,updatePlace };

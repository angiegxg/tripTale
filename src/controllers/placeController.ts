import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    const place = await prisma.places.findUnique({ where: { id: parseInt(id) } });
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
  const { title, category, description, imgUrl, pageUrl, latitude, longitude } = req.body;
  try {
    const newPlace = await prisma.places.create({
      data: {
        title,
        category,
        description,
        imgUrl,
        pageUrl,
        latitude,
        longitude,
      },
    });
    res.status(201).json(newPlace);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el lugar.' });
  }
}

export { getAllPlaces, getPlaceById, createPlace };

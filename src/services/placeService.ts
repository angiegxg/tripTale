import axios from 'axios';
import { PrismaClient, Places } from '@prisma/client';

const prisma = new PrismaClient();

async function getAllPlacesFromAPI() {
  try {
    const response = await axios.get('https://datos.juntadeandalucia.es/api/v0/places/all?place_type=Lugares%20de%20memoria&format=json');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los lugares desde la API.');
  }
}

async function getPlaceByIdFromDB(id:string) {
  try {
    const place = await prisma.places.findUnique({ where: { id: parseInt(id) } });
    return place;
  } catch (error) {
    throw new Error('Error al obtener el lugar desde la base de datos.');
  }
}

// model Places{
//     id Int @id @default(autoincrement())
//     title String
//     category String
//     description String?
//     imgUrl String?
//     pageUrl String
//     latitude String
//     longitude String
//     tripTales TripTales[]
  
//   }

async function createPlaceInDB(title:string, category:string, description:string, imgUrl:string, pageUrl:string, latitude:string, longitude:string):Promise<Places>{
  try {
    const newPlace = await prisma.places.create({
      data: {
        title,
        category,
        description,
        imgUrl,
        pageUrl,
        latitude,
        longitude

      },
    });
    return newPlace;
  } catch (error) {
    throw new Error('Error al crear el lugar en la base de datos.');
  }
}

export { getAllPlacesFromAPI, getPlaceByIdFromDB, createPlaceInDB };

import axios from 'axios';
import { PrismaClient, Places } from '@prisma/client';
import { Category } from '../types';

const prisma = new PrismaClient();


// async function checkIfNameExists(name: string) {

//   try{
    
//     const existingPlace = await prisma.places.findFirst({
//       where: {
//         title: name,
//       },
//     });
  
//     return existingPlace !== null; // Devuelve true si ya existe, false si no existe
//   }catch (error) {
//     console.error('El lugar ya existe', error);
//     throw new Error('El lugar ya existe');
//   }
// }

async function getPlacesByApis() {
  try {
    await getAllMemoryPlacesFromAPI();
    await getAllBeachPlacesFromAPI();
    await getAllMuseumPlacesFromAPI();
  } catch (error) {
    console.error('Error en la función getPlacesByApis:', error);
    throw new Error('Error en la función getPlacesByApis');
  }
}



async function getAllMemoryPlacesFromAPI() {
  try {
    const responsePlaceMemory = await axios.get('https://datos.juntadeandalucia.es/api/v0/places/all?place_type=Lugares%20de%20memoria&format=json');
    const placeMemoryApiAndalucia = responsePlaceMemory.data
    
    for(const place of placeMemoryApiAndalucia){
      // if(!checkIfNameExists(place.title)) {

        await createPlaceInDB(place.title, "Historical Memory", place.province[0].province, place.description, "imgUrl:string", place.web.web, place.latitude, place.longitude)
      // }
    }
    
    
 
  } catch (error) {
    throw new Error('Error migrar los datos de la api andalucia "Memoria Historica" a la base de datos.');
  }
}


async function getAllMuseumPlacesFromAPI() {
  try {
    const responsePlaceMuseum = await axios.get('https://datos.juntadeandalucia.es/api/v0/museums/all?format=json');
    const placeMuseumApiAndalucia = responsePlaceMuseum.data.flat()
    
    for(const place of placeMuseumApiAndalucia){
      if (!place.longitude || !place.latitude || !place.web) {
        continue;
      }
    
      let description = place.observations ? place.observations : '';
      let web = place.web ? place.web : '';
      // if(!checkIfNameExists(place.name)){
        await createPlaceInDB(place.name, "Museum", place.province, description, "imgUrl:string", web, place.latitude, place.longitude)

      // }
    } 
  } catch (error) {
  console.log("Error migrar los datos de la api andalucia Museos a la base de datos.")
    throw new Error('Error migrar los datos de la api andalucia "Museos" a la base de datos.');
  }
}

async function getAllBeachPlacesFromAPI() {
  try {
    const responsePlaceBeach = await axios.get('https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/Playas_2015/FeatureServer/0/query?where=1%3D1&outFields=Comunidad_,Provincia,Isla,Web_munici,Nombre,Nombre_alt,Nombre_a_1,Descripci,Observacio,Coordenada,Coordena_1,Huso,Coordena_2,Coordena_3,Coordena_5,URL_MAGRAM,Coordena_4&outSR=4326&f=json');
    const placeBeachApiAndalucia = responsePlaceBeach.data.features.flat()

    for (const place of placeBeachApiAndalucia) {
      let beach = place.attributes;
      
      if(beach.Comunidad_ === "Andalucía" ){
      let coordena_4_asString = beach.Coordena_4.toString();
      let coordena_5_asString = beach.Coordena_5.toString();
      // if (!coordena_4_asString|| !coordena_5_asString) {
      //   continue;
      // }

      await createPlaceInDB(
        beach.Nombre, 
        "Beach", 
        beach.Provincia, 
        beach.Descripci,  
        "imgUrl:string", 
        beach.Web_munici, 
        coordena_4_asString, 
        coordena_5_asString)
    }};
  } catch (error) {
    console.log('Error al migrar los datos de la API "playas" de Andalucía a la base de datos.')
    throw new Error('Error al migrar los datos de la API "playas" de Andalucía a la base de datos.');
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



async function createPlaceInDB(title:string, category:Category, province:string, description:string, imgUrl:string, pageUrl:string, latitude:string, longitude:string):Promise<Places>{
  try {
  
    const newPlace = await prisma.places.create({
      data: {
        title,
        category,
        province,
        description,
        imgUrl,
        pageUrl,
        latitude,
        longitude

      },
    });
    return newPlace;
  } catch (error) {
    console.log('Error al crear el lugar en la base de datos.',error)
    throw new Error('Error al crear el lugar en la base de datos.');
  }
}

async function updatePlaceFromBD(place:Places):Promise<Places> {
  const {id, title, category, province, description, imgUrl, pageUrl, latitude, longitude } =place;
  try{

    const updatePlace = await prisma.places.update({
      where: {
        id: id,
      },
      data: {
          title,
          category,
          province,
          description,
          imgUrl,
          pageUrl,
          latitude,
          longitude 
      },
    })
  
    return updatePlace
  }catch(error) {
    throw new Error('Error al modificar el lugar en la base de datos')
}
}

export { getPlacesByApis, getPlaceByIdFromDB, createPlaceInDB, updatePlaceFromBD };

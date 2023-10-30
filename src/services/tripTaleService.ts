import { PrismaClient, TripTales, } from '@prisma/client';

const prisma = new PrismaClient();

async function getAllTripTales(): Promise<TripTales[]> {
  try {
    const tripTales = await prisma.tripTales.findMany({
      include: {
        author: true,
        place: true,
      },
    });
    return tripTales;
  } catch (error) {
    throw new Error('Error al crear el lugar en la base de datos.');
  }
}

async function getTripTaleById(id: string): Promise<TripTales | null> {
  try {
    const tripTale = await prisma.tripTales.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: true,
        place: true,
      },
    });
    return tripTale;
  } catch (error) {
    throw error;
  }
}

async function getTripTalesByUserId(userId: number): Promise<TripTales[]> {
  try {
  const tripTalesOfUser = await prisma.tripTales.findMany({
    where: {
      authorId: userId,
    },
  });
  return tripTalesOfUser;
} catch (error) {
  throw error;
}
}

async function createTripTale( placeId: number, content: string, authorId: number): Promise<TripTales> {
  try {
   
    const newTripTale = await prisma.tripTales.create({
      data: {
        date: new Date(),
        place: { connect: { id: placeId } },
        content,
        author: { connect: { id: authorId } },
      },
      include: {
        author: true,
        place: true,
      },
    });
    return newTripTale;
  } catch (error) {
    throw error;
  }
}

export default { getAllTripTales, getTripTaleById, createTripTale, getTripTalesByUserId };

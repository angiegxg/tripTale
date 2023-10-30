import { PrismaClient } from '@prisma/client';
import { User, NonSensitiveInfoUser } from '../types';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function getAllUsers(): Promise<NonSensitiveInfoUser[]> {
  const usersFromPrisma = await prisma.user.findMany( {
    select: { id: true, email: true, name: true } 
  }
    
  );
  return usersFromPrisma;
}

async function getUserById(id: string): Promise<NonSensitiveInfoUser | null> {
  const userFromPrisma = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    select: { id: true, email: true, name: true } 
  });

  return userFromPrisma || null;
}

async function createUser(name: string, email: string, password: string): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  return createdUser;
}

export default { getAllUsers, getUserById, createUser };

import bcrypt from 'bcrypt';
import prisma from './db'; // Adjust the import path as necessary

export async function createUser(name: string, grade: number, email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.student.create({
    data: {
      name,
      grade,
      email,
      password: hashedPassword,
    },
  });
  return user;
}


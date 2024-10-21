import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma



export async function getUserByEmailAndPassword(email: string, password: string) {
    const user = await prisma.student.findFirst({
      where: { email },
    });

    if (user && await bcrypt.compare(password, user.password)) {
      return { name: user.name, account_id: user.account_id };
    }

    return null;
  }

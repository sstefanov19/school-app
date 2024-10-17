import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

const prisma = new PrismaClient();

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Name" },
        grade: { label: "Grade", type: "number", placeholder: "Grade" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      authorize: async (credentials) => {
        try {
          console.log('Credentials:', credentials);
          const name = credentials?.name;
          const grade = Number(credentials?.grade);
          const password = credentials?.password;

          console.log('Querying for user with name:', name, 'and grade:', grade);

          let user = await prisma.student.findFirst({
            where: {
              name: name,
              grade: grade,
            },
          });

          console.log('User found:', user);

          if (!user) {
            console.log('User not found, creating new user');
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await prisma.student.create({
              data: {
                name: name,
                grade: grade,
                password: hashedPassword,
              },
            });
            console.log('New user created:', user);
          } else if (await bcrypt.compare(password, user.password)) {
            console.log('Password match');
          } else {
            console.log('Invalid credentials');
            throw new Error('Invalid credentials');
          }

          return { id: user.id, name: user.name, grade: user.grade };
        } catch (error) {
          console.error('Error during authentication:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as number;
        session.user.grade = token.grade as number;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.grade = user.grade;
      }
      return token;
    },
  },
};

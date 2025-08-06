import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    // ...add more providers here
  ],

  //Nosotros tenemos que especificarle a OAuth que estos campos nuevos que metimos, isActive y los roles(de momento)
  session: {
    strategy: 'jwt'
  },

  //Los callbacks no son mas que funciones que pasan en cierto punto del ciclo de vida de la autenticacion de un usuario, despues de que pasa por la autenticacion, vamos a ir por muchos callbacks hasta que pues ya se muestra la informacion en el sitio

  callbacks: {
    //Todo esto es del lado del backend
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user)//Para ver al usuario en la terminal

      //interesante, si ponemos false, nosotros bloqueamos al usuario
      return true;
    },

    //La idea de este jwt es que se pase o que sea parte del jwt esta informacion, esto se va a firmar de nuevo, y despues se lo mandara a la session
    async jwt({ token, user, account, profile }) {
      // console.log({ token })

      //Esta linea es magica, cito a Fernando Herrera: Con este email que vemos en el token, yo puedo verificar mi base de datos, en la parte del token, para que una vez que este se cree, a la hora de hacer consultas nos basamos en el token, no hacemos otras consultas
      const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } });

      if (dbUser?.isActive === false) {
        throw Error('El usuario no esta activo')
      }


      //ahora dbUser YA TIENE TODA LA INFORMACION, TODA

      //Al token le vamos a meter la informacion adicional que necesitamos, la de roles y la de isActive
      token.roles = dbUser?.roles ?? ['no-roles']
      token.id = dbUser?.id ?? 'no-uuid'

      //yo en este token le puedo pasar la informacion que yo quiera para procesarla si yo lo deseo
      return token;
    },

    async session({ session, token, user }) {
      //Lo ponemos aqui para ver los datos una vez que ya pasen por el token y se agreguen los adicionales
      console.log({ token })

      if (session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }

      //Lo importante es que nosotros tenemos que regresar la sessoin modificada
      return session;

    }
  }
}

const handler = NextAuth(authOptions);

//Al exportar esto asi, estamos haciendo lo mismo que con los otros endpoints que tienen su POST y GET, ya que asi es como los detecta nextjs, asi es como los maneja sus endpoints
export { handler as GET, handler as POST }

// export default NextAuth(authOptions)

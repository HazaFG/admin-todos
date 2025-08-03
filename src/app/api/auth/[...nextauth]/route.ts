import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    // ...add more providers here
  ],
}

const handler = NextAuth(authOptions);

//Al exportar esto asi, estamos haciendo lo mismo que con los otros endpoints que tienen su POST y GET, ya que asi es como los detecta nextjs, asi es como los maneja sus endpoints
export { handler as GET, handler as POST }

// export default NextAuth(authOptions)

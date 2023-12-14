//@ts-nocheck
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        Credentials({
          async authorize(credentials) {
            const parsedCredentials = z
              .object({ email: z.string().email(), password: z.string().min(6) })
              .safeParse(credentials);
     
            if (parsedCredentials.success) {
              const { email, password } = parsedCredentials.data;
              const user = {email:'test@email.com', password:'abcdefgh', userId:'1'};
              if (!user) return null;
              //should you bcrypt to compare hashes
             
                if(password === user.password){
                    return user
                }
                else{
                    return null
                }
              
     
            }
     
            return null;
          },
        }),
      ],
      session:{
        strategy: "jwt"
      },
      secret:"random"
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
//secrets should be moved to env
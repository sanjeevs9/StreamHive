import  CredentialsProvider  from "next-auth/providers/credentials"


export const authOptions={
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials:{
                roomName:{label:"roomName",type:"text",placeholder:"room.."},
                name:{label:"userName",type:"text",placeholder:"sanjeev"},
                role:{label:"role",type:"text",placeholder:"host/user"}
            },
            async authorize(credentials:any):Promise<any>{
                // console.log(credentials)
                if(credentials.name && credentials.password){

                    return {
                        name:credentials.name,
                        role:credentials.role,
                        roomName:credentials.roomName
                    }
                }
            }
        })
    ],
    secret:"sanjeev",
    callbacks: {
        async jwt({ token, user }: any) {
          if (user) {
            token.role = user.role;
            token.roomName=user.roomName
            token.name=user.name
          }
          return token;
        },
        async session({ session, token }: any) {
          session.user.role = token.role;
          return session;
        }
      },
      pages:{
        signIn:"/"
      }
}
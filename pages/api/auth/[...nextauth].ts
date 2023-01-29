import { type UserType } from "@type";
import { CollectionDB } from "@collection";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

export const authOption : NextAuthOptions = {
    providers : [
        GoogleProvider({
            clientId : process.env.PROVIDER_CLIENT_ID!,
            clientSecret : process.env.PROVIDER_CLIENT_SECRET!
        }),
    ],
    session : {
        strategy : "jwt"
    },
    callbacks : {
        async signIn({user, profile}) {
                const users = await CollectionDB<UserType>("users")

                const duplicate = await users?.findOne({
                    email : user.email!
                })
                
                if(!duplicate) {
                    try {
                        await users?.insertOne({username : user.name!, email : user.email!, profile : user.image!, userId : profile!.sub!})
                    }catch(e) {
                        console.log(e)
                    }
                    return true
                }
                
                return true
        },
        session({session, token}) {
            if(!session?.user?.id) {
                session.user.id = token.sub
                return session
            }
            return session   
        }
    },
    pages : {
        signIn : "/signIn"
    },
    secret : "secret",
}

export default NextAuth(authOption)
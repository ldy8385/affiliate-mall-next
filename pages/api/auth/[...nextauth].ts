import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import NaverProvider from "next-auth/providers/naver"
import CredentialsProvider from "next-auth/providers/credentials"
import firebase from "firebase/compat"
import {GoogleAuthProvider, signInWithCredential} from "firebase/auth"
import {auth} from "../../../firebase/firebaseClient"
import {PrismaClient} from "@prisma/client"
import {verifyPassword} from "../../../lib/auth"

let prisma = new PrismaClient()

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {label: "Username", type: "text", placeholder: "jsmith"},
        password: {label: "Password", type: "password"}
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            userId: String(credentials.userId),
          },
          select: {
            userId: true, name: true, password: true, phone: true, createdAt: true
          },
        });

        if (!user) {
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Could not log you in!');
        }
        console.log(user)
        return user
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),

  ],
  secret: process.env.SECRET
  // callbacks: {
  //     async signIn({ user, account, profile, email, credentials }) {
  //         try {
  //             //account 변수에서 id_token을 가지고 google auth credential 생성
  //             const googleCredential = GoogleAuthProvider.credential(
  //                 account?.id_token
  //             );
  //             //생성된 credential로 signInWithCredential 실행
  //             const userCredential = await signInWithCredential(
  //                 auth,
  //                 googleCredential
  //             ).catch((e) => {
  //                 console.log(e);
  //                 return false;// 로그인 중 에러 발생 -> false 반환
  //             });
  //             return userCredential ? true : false;//로그인 성공여부 반환
  //         } catch (e) {
  //             console.log(e);
  //             return false;
  //         }
  //     },
  // },
});
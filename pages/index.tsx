import Content from "@/components/home/content/Content"
import Header from "@/components/home/header/Header"
import GlobalLayout from "@/lib/store/Layout"
import { SessionUser } from "@/types/types"
import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth"
import { authOption } from "./api/auth/[...nextauth]"

const Home = ({user} : {user : SessionUser}) => {
  return (
    <main>
      <Header {...user}/>
      <GlobalLayout>
        <Content/>
      </GlobalLayout>
    </main>
  )
}

export const getServerSideProps : GetServerSideProps = async ({req, res}) => {
  const session = await unstable_getServerSession(req, res, authOption)

  if(!session?.user || !session) {
    return {
      redirect : {
        destination : "/signIn",
        permanent : false
      }
    }
  }

  return {
    props : {
      user : session.user
    }
  }
}

export default Home

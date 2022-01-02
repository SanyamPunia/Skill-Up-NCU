import { useSession, getSession } from "next-auth/react"
import Modal from "../components/dashboard/Modal"
import Landing from "../components/dashboard/Landing"
import Header from "../components/Header"
import Posts from "../components/dashboard/Posts"
import Head from "next/head"


function Dashboard() {
  return (
    <>
      <Head>
        <title>Skill Up | Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Landing />
      <Modal />
      <Posts />
    </>
  )
}

export default Dashboard

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}
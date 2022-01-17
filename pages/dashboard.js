import { useSession, getSession } from "next-auth/react"
import Landing from "../components/dashboard/Landing"
import Header from "../components/Header"
import Posts from "../components/dashboard/Posts"
import Head from "next/head"
import { Fragment } from "react"

function Dashboard() {

  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Skill Up | Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      {session ?
        <Fragment>
          <Landing />
          <Posts />
        </Fragment>
        :
        <h1>Sign In</h1>}
    </>
  )
}

export default Dashboard

// export async function getServerSideProps(context) {
//   const session = await getSession(context)

//   if (!session) {
//       return {
//           redirect: {
//               destination: '/',
//               permanent: false,
//           },
//       }
//   }

//   return {
//       props: {
//           userInfo: session.user
//        }
//   }
// }
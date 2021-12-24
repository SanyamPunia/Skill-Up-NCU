import Head from "next/head"
import Contribution from "../components/Contribution"
import Features from "../components/Features"
import Footer from "../components/Footer"
import Gap from "../components/Gap"
import Header from "../components/Header"
import Landing from "../components/Landing"
import SubFooter from "../components/SubFooter"
import styles from "../styles/Home.module.scss"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Skill Up | Credit Based Learning</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Gap /> {/* gap component */}
      <Landing />
      <Gap />
      <hr />
      <Gap />
      <Features />
      <Gap />
      <Contribution />
      <Gap />
      <SubFooter />
      <Gap />
      <Footer />
    </div>
  )
}
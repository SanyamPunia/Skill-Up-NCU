import Link from "next/link"
import styles from "../styles/Footer.module.scss"
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa"
import { signIn } from "next-auth/react"

function Footer() {
    return (
        <div className={styles.topContainer}>
            <div className={styles.container}>
                <div className={styles.leftSubContainer}>
                    <Link href="/"><a>Skill Up</a></Link>
                    <p>Learn It Better,</p>
                    <p>From Your Peers</p>
                    <div className={styles.icons}>
                        <Link href="/"><a><FaInstagram size={25} /></a></Link>
                        <Link href="/"><a><FaTwitter size={25} /></a></Link>
                        <Link href="/"><a><FaLinkedin size={25} /></a></Link>
                    </div>
                </div>

                <div className={styles.rightSubContainer}>
                    <Link href="/"><a onClick={signIn}>Join Us</a></Link>
                    <Link href="/about"><a>About</a></Link>
                    <Link href="https://bitbucket.org/sanyam_mxle/skillup-ncu"><a>Bitbucket</a></Link>
                </div>
            </div>
        </div>
    )
}

export default Footer
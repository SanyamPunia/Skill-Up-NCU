import Link from "next/link"
import styles from "../styles/Footer.module.scss"
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa"

function Footer() {
    return (
        <div className={styles.topContainer}>
            <div className={styles.container}>
                <div className={styles.leftSubContainer}>
                    <Link href="/"><a>Skill Up</a></Link>
                    <p>Lorem ipsum dolor sit amet,</p>
                    <p>consectetur adipiscing elit</p>
                    <div className={styles.icons}>
                        <Link href="/"><a><FaInstagram size={25} /></a></Link>
                        <Link href="/"><a><FaTwitter size={25} /></a></Link>
                        <Link href="/"><a><FaLinkedin size={25} /></a></Link>
                    </div>
                </div>

                <div className={styles.rightSubContainer}>
                    <Link href="/"><a>About</a></Link>
                    <Link href="/"><a>GitHub</a></Link>
                    <Link href="/"><a>Legal</a></Link>
                </div>
            </div>
        </div>
    )
}

export default Footer
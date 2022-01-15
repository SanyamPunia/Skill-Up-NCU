import { useSession, getSession } from "next-auth/react"
import styles from "../../styles/dashboard/Landing.module.scss"
import Link from "next/link"

function Landing() {
    const { data: session } = useSession()
    return (
        <div className={styles.container}>
            <Link href="/edit"><button className={styles.modalButton}>Ask Question</button></Link>
        </div>
    )
}

export default Landing

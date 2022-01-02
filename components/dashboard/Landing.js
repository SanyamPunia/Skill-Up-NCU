import { useSession, getSession } from "next-auth/react"
import { useRecoilState } from "recoil"
import { modalState } from "../../atoms/modalAtom"
import styles from "../../styles/dashboard/Landing.module.scss"
import Link from "next/link"

function Landing() {
    const { data: session } = useSession()
    const [open, setOpen] = useRecoilState(modalState);

    console.log(session)

    return (
        <div className={styles.container}>
            {/* <button className={styles.modalButton} onClick={() => setOpen(true)}>New Post</button> */}
            <Link href="/edit"><button className={styles.modalButton}>Ask Question</button></Link>
        </div>
    )
}

export default Landing

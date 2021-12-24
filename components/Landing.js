import styles from "../styles/Landing.module.scss"
import { signIn } from "next-auth/react"

function Landing() {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.heading}>
                    <h1>Learn It <span>Better</span></h1>
                    <h1>From Your Seniors.</h1>
                </div>
                <div className={styles.context}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    </p>
                    <p>
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim adm
                    </p>
                    <p>
                        minim veniam elit sed do ad.
                    </p>
                </div>
                <div className={styles.buttonContainer}>
                    <a onClick={signIn}>
                        <img src="/google-logo.png" alt="" />
                        Sign In With Google
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Landing

import styles from "../styles/Landing.module.scss"
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import { Fragment } from "react"
import Link from "next/link"

function Landing() {

    const { data: session } = useSession()

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.heading}>
                    <h1>Learn It <span>Better</span></h1>
                    <h1>From Your Peers.</h1>
                </div>
                <div className={styles.context}>
                    <p>
                        <span>Skill Up NCU</span> is an <span>online platform</span> built for <span>student community</span> to interact
                    </p>
                    <p>
                        with each other by solving their doubts and help each learn and
                    </p>
                    <p>
                        <span>grow together.</span>
                    </p>
                </div>
                <div className={styles.buttonContainer}>
                    {session ?
                        <Fragment>
                            <Link href="/dashboard"><a>Go to your Dashboard</a></Link>
                        </Fragment>
                        : <Fragment>
                            <a onClick={signIn}>
                                Get Started
                            </a>
                        </Fragment>
                    }
                </div>
            </div>
        </div>
    )
}

export default Landing
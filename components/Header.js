import styles from "../styles/Header.module.scss"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import React from "react";
import { Fragment } from "react";

function Header() {
    const { data: session } = useSession();

    return (
        <div className="sticky top-0 bg-white shadow-sm z-10">
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    {session
                        ?
                        <Fragment>
                            <Link href="/dashboard"><h1>Skill Up</h1></Link>
                        </Fragment>
                        :
                        <Fragment>
                            <Link href="/"><h1>Skill Up</h1></Link>
                        </Fragment>
                    }
                </div>
                <div className={styles.linkContainer}>
                    <Link href="/">
                        <a>About</a>
                    </Link>
                    <Link href="/">
                        {session
                            ?
                            <Fragment>
                                <a onClick={signOut}>Sign Out</a>
                                <Link href="/dashboard"><img src={session?.user?.image} alt="" /></Link>
                            </Fragment>
                            :
                            <Fragment>
                                <a onClick={signIn}>Sign In</a>
                            </Fragment>
                        }
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header
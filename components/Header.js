import styles from "../styles/Header.module.scss"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi"
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
                        {session
                            ?
                            <Fragment>
                                <div className={styles.navLink}>
                                    <Link href="/about"><a>About</a></Link>
                                    <a onClick={signOut}>Sign Out</a>
                                    <img src={session?.user?.image} alt="" />
                                </div>
                                <div className={styles.dropDown}>
                                    <div className={styles.dropBtn}><GiHamburgerMenu /></div>
                                    <div className={styles.dropDownContent}>
                                        <Link href="/about"><a>About</a></Link>
                                        <a onClick={signOut}>Sign Out</a>
                                        <img src={session?.user?.image} alt="" />
                                    </div>
                                </div>
                            </Fragment>
                            :
                            <Fragment>
                                <div className={styles.navLink}>
                                    <Link href="/about"><a>About</a></Link>
                                    <a onClick={signIn}>Sign In</a>
                                </div>
                                <div className={styles.dropDown}>
                                    <div className={styles.dropBtn}><GiHamburgerMenu /></div>
                                    <div className={styles.dropDownContent}>
                                        <a onClick={signIn}>Sign In</a>
                                        <Link href="/about"><a>About</a></Link>
                                    </div>
                                </div>
                            </Fragment>
                        }
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header
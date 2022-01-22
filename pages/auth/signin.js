import { getProviders, signIn as SignIntoProvider } from "next-auth/react"
import Header from "../../components/Header";
import styles from "../../styles/SignIn.module.scss"
import Head from "next/head"
import { FaAngleRight } from "react-icons/fa"
import Footer from "../../components/Footer";
import { useState } from "react";

function signIn({ providers }) {
    const [checkbox, setCheckbox] = useState(false);

    function handleCheckboxChange(e) {
        setCheckbox(!checkbox);
    }

    return (
        <>
            <Head>
                <title>Sign In</title>
            </Head>
            <Header />
            <div className={styles.container}>
                <h1>Join The <span>Community</span>.</h1>
                <div className={styles.subContainer}>
                    <div className={styles.imageContainer}>
                        <img src="/collaborators.svg" alt="" />
                    </div>
                    <div className={styles.contentContainer}>
                        <div className={styles.content}>
                            <h2>By <span>Signing-In</span>,</h2>
                            <h2>you agree to the following terms!</h2>
                            <ul>
                                <li>
                                    <span>
                                        <FaAngleRight />
                                    </span>
                                    Your credential data and post information will be recorded for mmoderation and safety purposes.
                                    We have legal rights to take certain actions if you violate this condition.
                                </li>
                                <li>
                                    <span>
                                        <FaAngleRight />
                                    </span>
                                    Any kind of misuse and actions conducted against these terms can lead to permanent ban from using
                                    this platform.
                                </li>
                                <li>
                                    <span>
                                        <FaAngleRight />
                                    </span>
                                    You agree to not use any web scrapping tools which may be used to mine Skill Up NCU services and features.
                                </li>
                            </ul>
                        </div>
                        <form>
                            <div className="flex items-start mb-6">
                                <div className="flex items-center h-6">
                                    <input id="remember" aria-describedby="remember" autoComplete="off" checked={checkbox} onChange={handleCheckboxChange} type="checkbox" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                                </div>
                                <div className="ml-3 text-md">
                                    <label htmlFor="remember" className="font-semibold text-gray-900 dark:text-gray-300">By checking, you agree to these terms & condition</label>
                                </div>
                            </div>
                            {Object.values(providers).map((provider) => (
                                <div key={provider.name} className={styles.buttonContainer}>
                                    {checkbox ? <a onClick={() => SignIntoProvider(provider.id, { callbackUrl: "/dashboard" })}>
                                        <img src="/google-logo.png" alt="" />
                                        Sign in with {provider.name}
                                    </a> : <a onClick={() => alert("Please agree to the terms & condition")}>
                                        <img src="/google-logo.png" alt="" />
                                        Sign in with {provider.name}
                                    </a>}
                                </div>
                            ))}
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}

export default signIn
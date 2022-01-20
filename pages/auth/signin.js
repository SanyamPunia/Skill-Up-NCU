import { getProviders, signIn as SignIntoProvider } from "next-auth/react"
import Header from "../../components/Header";
import styles from "../../styles/SignIn.module.scss"
import { FaAngleRight } from "react-icons/fa"
import Footer from "../../components/Footer";

function signIn({ providers }) {
    return (
        <>
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
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                    sed do. Duis aute irure dolor in reprehenderit in.
                                </li>
                                <li>
                                    <span>
                                        <FaAngleRight />
                                    </span>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                    sed do. Duis aute irure dolor in reprehenderit in.
                                </li>
                                <li>
                                    <span>
                                        <FaAngleRight />
                                    </span>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                    sed do. Duis aute irure dolor in reprehenderit in.
                                </li>
                            </ul>
                        </div>
                        {Object.values(providers).map((provider) => (
                            <div key={provider.name} className={styles.buttonContainer}>
                                <a onClick={() => SignIntoProvider(provider.id, { callbackUrl: "/dashboard" })}>
                                    <img src="/google-logo.png" alt="" />
                                    Sign in with {provider.name}
                                </a>

                            </div>
                        ))}
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
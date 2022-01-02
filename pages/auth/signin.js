import { getProviders, signIn as SignIntoProvider } from "next-auth/react"
import styles from "../../styles/SignIn.module.scss"

function signIn({ providers }) {
    return (
        <>
            {Object.values(providers).map((provider) => (
                <div key={provider.name} className={styles.container}>
                    <button onClick={() => SignIntoProvider(provider.id, { callbackUrl: "/dashboard"})}>
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
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
import styles from "../styles/Contribute.module.scss"

function Contribution() {
    return (
        <div className={styles.container}>
            <h1>An <span>Open Source</span> Initiative</h1>
            <p>This whole idea took quite some time to turn it into an actual project. Keeping this</p>
            <p>platform free to use and accessible, it would only make sense to make this</p>
            <p>platform an <span>Open Source</span> project.</p>
            <div className={styles.buttonContainer}>
                <a href="https://bitbucket.org/sanyam_mxle/skillup-ncu">
                    <img src="/bitbucket.png" alt="" />
                    Contribute
                </a>
            </div>
        </div>


    )
}

export default Contribution

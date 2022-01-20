import styles from "../styles/Contribute.module.scss"

function Contribution() {
    return (
        <div className={styles.container}>
            <h1>An <span>Open Source</span> Initiative</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing Excepteur sint occaecat</p>
            <p>elit, sed do eiusmod tempor incididunt ut labore et  non proident, sunt</p>
            <p>mollit anim id est laborum.</p>
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

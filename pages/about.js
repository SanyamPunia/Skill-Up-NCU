import Header from "../components/Header";
import styles from "../styles/About.module.scss"
import Footer from "../components/Footer"

function about() {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.topContainer}>
                    <h1><span>About</span> Us</h1>
                </div>
                <div className={styles.midContainer}>
                    <h1>Imagine being part of a community that will benefit both the questioner
                        and the answerer. Skill Up NCU will fulfill your requirements and needs without
                        any hesitation.</h1>
                </div>
                <div className={styles.botContainer}>
                    <p>
                        Peer learning can lead to improved attitudes and a more personalized,
                        engaging, and collaborative learning experience, all of which can lead
                        to higher achievement. This website provides you with the opportunity to
                        not only learn from peers but also help them to learn. It also provides
                        great features to enhance the experience of the user.
                    </p>
                    <p>
                        One of the best features provided by Skill Up NCU is its credit point system
                        that highly inspires students to come out and help each other. To avail the credit
                        point system, the user should be an active participant for at least 2-3 months.
                        The credit is given by considering various factors such as the correctness of the
                        answer, the difficulty level of questions, etc.
                    </p>
                    <p>
                        Higher the credits, the higher is the chance to top the leaderboard rankings and higher
                        the chance to get good academic results. The credit points can be used in General Proficiency
                        Evaluation. This platform allows the students to interact with each other for clearing
                        doubts and learning new things.
                    </p>

                    <div className={styles.botContainerSubSection}>
                        <h1>About our guidelines & policies</h1>
                        <p>
                            The website follows guidelines and will not tolerate any kind of ill doings. Strict
                            actions will be taken as per the terms and conditions. The main motive of Skill Up NCU
                            was to make a collective and shared platform for the students to grow together.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />

        </>);
}

export default about;
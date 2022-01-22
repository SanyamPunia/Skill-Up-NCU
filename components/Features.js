import styles from "../styles/Features.module.scss"
import Gap from "./Gap"
import Image from "next/image"

function Features() {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>NCU <span>Online</span> Forum</h1>


            <div className={styles.featureContainer}>
                <div className={styles.feature}>
                    <div className={styles.context}>
                        <h1>Built By Students,</h1>
                        <h1>For Students</h1>
                        <p>This interactive forum idea was designed and developed</p>
                        <p className={styles.subP}>by students of NCU as a part of their final PSDT project. Keeping the interest of students, this platform is <span>Free to Use</span> & <span>Open-Source</span></p>
                    </div>
                    <div className={styles.image}>
                        <Image src="/team.svg" width={800} height={800} />
                    </div>
                </div>
                <div className={styles.feature}>
                    <div className={styles.context}>
                        <h1>Earn credits</h1>
                        <h1>while you learn</h1>
                        <p>Each question you answer, helps you earn more points, thus leading your way up the</p>
                        <p className={styles.subP}>leaderboard <span>rankings</span></p>
                    </div>
                    <div className={styles.image}>
                        <Image src="/prioritise.svg" width={800} height={800} />
                    </div>
                </div>
                <div className={styles.feature}>
                    <div className={styles.context}>
                        <h1>Avail exciting offers</h1>
                        <h1>using your credits</h1>
                        <p>With the points you earn overtime, you can avail them in <span>GP subject</span> evaluation at the end of each semester for better academic results</p>
                    </div>
                    <div className={styles.image}>
                        <Image src="/winner.svg" width={800} height={800} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features

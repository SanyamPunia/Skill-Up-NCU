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
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna alimin</p>
                    </div>
                    <div className={styles.image}>
                        <Image src="/team.svg" width={800} height={800} />
                    </div>
                </div>
                <div className={styles.feature}>
                    <div className={styles.context}>
                        <h1>Earn credits</h1>
                        <h1>while you learn</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna alimin</p>
                    </div>
                    <div className={styles.image}>
                        <Image src="/prioritise.svg" width={800} height={800} />
                    </div>
                </div>
                <div className={styles.feature}>
                    <div className={styles.context}>
                        <h1>Avail exciting offers</h1>
                        <h1>using your credits</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna alimin</p>
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

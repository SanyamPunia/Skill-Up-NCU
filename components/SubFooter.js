import styles from "../styles/SubFooter.module.scss"

function SubFooter() {
    return (
        <div className={styles.container}>
            <div className={styles.context}>
                <h1>Join The</h1>
                <h1>Movement.</h1>
                <p>Lorem ipsum dolor sit amet,</p>
                <p>consectetur adipiscing elit, sed do</p>
                <p>quis nostrud exercitation ullamco</p>
            </div>

            <div className={styles.action}>
                <form>
                    <div class="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-mediu dark:text-gray-300">Your email</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-lightgray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@example.com" required autoComplete="off" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SubFooter
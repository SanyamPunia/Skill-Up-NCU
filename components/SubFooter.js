import styles from "../styles/SubFooter.module.scss"
import { useState } from "react";

function SubFooter() {

    const [formSubmit, setFormSubmit] = useState(false);

    function handleSubmit() {
        setFormSubmit(true);
    }


    return (
        <div className={styles.container}>
            <div className={styles.context}>
                <h1>Join The</h1>
                <h1>Movement.</h1>
                <p>Keep yourself Up-To-Date</p>
                <p>with all the latest news and information</p>
                <p>along with upcoming features in <span>2022</span></p>
            </div>

                <div className={styles.action}>
                    {formSubmit
                        ?
                        <h1>Your email has been registered for the Newsletter</h1>
                        :
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="email" className="block mb-2 text-sm font-mediu dark:text-gray-300">Your email</label>
                                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-lightgray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@example.com" required autoComplete="off" />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    }
                </div>
        </div>
    )
}

export default SubFooter
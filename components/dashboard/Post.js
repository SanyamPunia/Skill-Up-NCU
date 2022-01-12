import styles from "../../styles/dashboard/Post.module.scss"
import { useRouter } from 'next/router'
import { Fragment } from "react"
import ReactMarkdown from 'react-markdown'

function Post({ id, username, title, subject, currentYear, description, userImg, img, createdAtTime, createdAtDate, markdownDescription }) {
    const router = useRouter()

    console.log(markdownDescription);

    function redirectToPostPage() {
        router.push(`/${username}/${id}`);
    }

    return (
        <div className={styles.container} onClick={redirectToPostPage}>
            <div className={styles.userInfoContainer}>
                <img src={userImg} alt="profile-image" />
                <div className={styles.userInfo}>
                    <div className={styles.userInfoContent}>
                        <p>{username}</p>
                        <p>{currentYear}</p>
                    </div>
                    <div className={styles.postDate}>
                        <p>{createdAtTime}</p>
                        <p>{createdAtDate}</p>
                    </div>
                </div>
            </div>

            <div className={styles.postContentContainer}>
                {img ?
                    <Fragment>
                        <img className={styles.postImage} src={img} alt="" />
                        <div className={styles.postContent}>
                            <h1>{title}</h1>
                            <p>{subject}</p>
                            <hr />
                            {/* <p>{description}</p> */}
                            <div className={styles.markDownContainer}>
                                <ReactMarkdown>{markdownDescription}</ReactMarkdown>
                            </div>
                        </div>
                    </Fragment>
                    :
                    <Fragment>
                        <div className={styles.postContent}>
                            <h1>{title}</h1>
                            <p>{subject}</p>
                            <hr />
                            {/* <p>{description}</p> */}
                            <div className={styles.markDownContainer}>
                                <ReactMarkdown>{markdownDescription}</ReactMarkdown>
                            </div>
                        </div>
                    </Fragment>
                }
            </div>
        </div>
    )
}

export default Post
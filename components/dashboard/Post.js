import styles from "../../styles/dashboard/Post.module.scss"

function Post({ id, username, userImg, img, caption }) {
    return (
        <div className={styles.container}>
            <p>{username}</p>
            <img src={userImg} alt="" />
            <img src={img} alt="" />
            <p>{caption}</p>
        </div>
    )
}

export default Post

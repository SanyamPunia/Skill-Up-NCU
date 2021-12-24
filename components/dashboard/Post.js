function Post({ id, username, userImg, img, caption }) {
    return (
        <div>
            <p>{username}</p>
            <img src={userImg} alt="" />
            <img src={img} alt="" />
            <p>{caption}</p>
        </div>
    )
}

export default Post

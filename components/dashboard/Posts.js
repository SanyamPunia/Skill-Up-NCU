import Post from "./Post"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react"
import { db } from "../../firebase";


function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(
        () => onSnapshot(query(
            collection(db, "posts"), orderBy("timestamp", "desc")),
            (snapshot) => {
                setPosts(snapshot.docs);
            }
        ), [db]
    )


    return (
        <div>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    username={post.data().username}
                    title={post.data().title}
                    subject={post.data().subject}
                    currentYear={post.data().currentYear}
                    // description={post.data().description}
                    markdownDescription={post.data().markdownDescription}
                    userImg={post.data().profileImg}
                    img={post.data().image}
                    createdAtTime={post.data().timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    createdAtDate={post.data().timestamp.toDate().toDateString()}
                />
            ))}
        </div>
    )
}

export default Posts
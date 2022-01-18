import { useSession, getSession } from "next-auth/react"
import { db, storage } from "../../../firebase";
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from "react"
import Header from "../../../components/Header"
import Head from "next/head";
import { useRouter } from "next/router";
import Gap from "../../../components/Gap"
import styles from "../../../styles/postpage/PostPage.module.scss"
import ReactMarkdown from "react-markdown";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { AiFillPlusCircle } from "react-icons/ai"
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { Fragment } from "react";
import toast, { Toaster } from "react-hot-toast"
import { getDownloadURL, ref, uploadString } from "firebase/storage";


const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false }
);

export default function PostPage() {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState("**Hello world!!!**");
    const [comments, setComments] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [displayForm, setDisplayForm] = useState(false);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    function displayFormVisibility() {
        setDisplayForm(!displayForm);
    }

    const filePickerRef = useRef(null);

    const router = useRouter();
    const { currentPost: postID, postRoute: postAuthor } = router.query;

    useEffect(() => {
        onSnapshot(doc(db, "posts", postID), (snapshot) => {
            setPosts(snapshot.data())
        })
    }, [db])

    useEffect(() => {
        onSnapshot(query(collection(db, 'posts', postID, 'comments'), orderBy('timestamp', 'desc')),
            (snapshot) => {
                setComments(snapshot.docs)
            }
        )
    }, [db, postID])

    console.log(posts);

    useEffect(() =>
        onSnapshot(collection(db, "posts", postID, "likes"), (snapshot) =>
            setLikes(snapshot.docs)
        ),
        [db, postID])

    useEffect(() =>
        setHasLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1
        ), [likes])

    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, "posts", postID, "likes", session.user.uid))
        } else {
            await setDoc(doc(db, "posts", postID, "likes", session.user.uid), {
                usename: session.user.username,
            })
        }

    }

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        }
    }

    const sendComment = async (e) => {
        e.preventDefault();

        const commentToSend = comment;
        setComment('');

        if (commentToSend) {
            const docRef = await addDoc(collection(db, 'posts', postID, 'comments'), {
                comment: commentToSend,
                username: session.user.username,
                userImage: session.user.image,
                timestamp: serverTimestamp(),
            })

            console.log("New comment added with ID: ", postID);

            if (selectedFile) {
                const imageRef = ref(storage, `posts/${postID}/comments`);
                await uploadString(imageRef, selectedFile, 'data_url')
                    .then(async snapshot => {
                        const downloadURL = await getDownloadURL(imageRef);
                        await updateDoc(doc(db, `posts/${postID}/comments/`, docRef.id), {
                            commentImage: downloadURL
                        })
                    })
            }
        }

        // toast message after successfully sending form data to firestore
        toast.success('Comment added successfully!');

        // set state to null
        setSelectedFile(null);
    }

    return (
        <>
            {session ?
                <Fragment>
                    <Head>
                        <title>Skill Up | {postAuthor}&apos;s Question</title>
                    </Head>
                    <Toaster />
                    <div>
                        <Header />
                        <Gap />
                        <div className={styles.container}>
                            <div className={styles.userInfoContainer}>
                                <div className={styles.userInfo}>
                                    <img className={styles.userProfileImage} src={posts?.profileImg} alt="" />
                                    <div className={styles.userInfoContent}>
                                        <p>{posts?.username}</p>
                                        <p>{posts?.currentYear}</p>
                                    </div>
                                </div>
                                <div className={styles.postDate}>
                                    <p>{posts?.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    <p>{posts?.timestamp?.toDate().toDateString()}</p>
                                </div>
                            </div>
                            <div className={styles.postContentContainer}>
                                <div className={styles.postMediaContainer}>
                                    <img src={posts?.image} alt="" />
                                    <div className={styles.likeIconContainer}>
                                        {hasLiked
                                            ?
                                            <Fragment>
                                                <FaHeart onClick={likePost} />
                                            </Fragment>
                                            :
                                            (<FaRegHeart onClick={likePost} />)
                                        }
                                        {likes.length > 0 && (
                                            <span>{likes.length}</span>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.postContentSubContainer}>
                                    <h1>{posts?.title}</h1>
                                    <div className={styles.postContent}>
                                        <p className={styles.subject}>{posts?.subject}</p>
                                        <hr />
                                        <div className={styles.markDownContainer}>
                                            <ReactMarkdown>{posts?.markdownDescription}</ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Gap />

                            <div className={styles.commentSection}>
                                <h1>Answers ({comments.length})</h1>
                                <div>
                                    {displayForm ?
                                        <Fragment>
                                            {/* <button className={styles.formButton} onClick={displayFormVisibility}>Add answer</button> */}
                                            <form>
                                                <div className={styles.editorContainer}><MDEditor value={comment} onChange={setComment} /></div>
                                                <div className={styles.subSection}>
                                                    <label htmlFor="imageRef">
                                                        Attach an image <span>(optional)</span>
                                                    </label>
                                                    {selectedFile
                                                        ?
                                                        <img src={selectedFile} onClick={() => setSelectedFile(null)} />
                                                        : (
                                                            <Fragment>
                                                                <div className={styles.icon}>
                                                                    <AiFillPlusCircle onClick={() => {
                                                                        filePickerRef.current.click()
                                                                    }} />
                                                                </div>
                                                            </Fragment>
                                                        )
                                                    }
                                                    <input type="file" hidden ref={filePickerRef} onChange={addImageToPost} />
                                                </div>
                                                <button className={styles.formButton} type="submit" disabled={!comment.trim()} onClick={sendComment}>Add Answer</button>
                                                <hr />
                                            </form>
                                        </Fragment>
                                        :
                                        <button className={styles.formButton} onClick={displayFormVisibility}>Add answer</button>
                                    }
                                </div>

                                {console.log(comments.length)}
                                {comments.length > 0 && (
                                    <div className={styles.commentContainer}>
                                        {comments.map((comment) => (
                                            <>
                                                <div className={styles.comments} key={comment.id}>
                                                    <div className={styles.commentUserInfoContainer}>
                                                        <div className={styles.commentUserInfo}>
                                                            <img src={comment.data().userImage} alt="" />
                                                            <p>{comment.data().username}</p>
                                                        </div>
                                                        <div>
                                                            <p>{comment?.data().timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                            <p>{comment?.data().timestamp?.toDate().toDateString()}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.commentMarkdownContainer}>
                                                    <ReactMarkdown>{comment.data().comment}</ReactMarkdown>
                                                </div>
                                                <div className={styles.imageAttachment}>
                                                    <img src={comment.data().commentImage} alt="" />
                                                </div>
                                                <hr className={styles.commentContainerLine} />
                                            </>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </Fragment>
                : <h1>Sign In</h1>}

        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
            userInfo: session.user
         }
    }
}
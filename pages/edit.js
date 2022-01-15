import styles from "../styles/dashboard/Edit.module.scss"
import Header from "../components/Header"
import { useSession, getSession } from "next-auth/react"
import { Fragment } from "react/cjs/react.development"
import { useState, useRef } from "react"
import { FaCamera } from "react-icons/fa"
import { AiFillPlusCircle } from "react-icons/ai"
import { db, storage } from "../firebase";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import UseAnimations from "react-useanimations"
import loading2 from "react-useanimations/lib/loading2"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from 'next/router'
// import "@uiw/react-md-editor/markdown-editor.css";
// import "@uiw/react-markdown-preview/markdown.css";
// import dynamic from "next/dynamic";
// import ReactMarkdown from 'react-markdown'

// const MDEditor = dynamic(
//     () => import("@uiw/react-md-editor").then((mod) => mod.default),
//     { ssr: false }
// );

function Edit() {
    const router = useRouter()

    const { data: session } = useSession();

    // console.log(userInfo)

    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(null);
    const [listValue, setListValue] = useState(null);
    // const [value, setValue] = useState("**Hello world!!!**");

    // form value ref, later using them to upload on firestore using { ref.current.value }
    const filePickerRef = useRef(null);
    const titleRef = useRef(null);
    const subjectRef = useRef(null);
    const currentYearRef = useRef(null);
    const descriptionRef = useRef(null);

    const selectFunction = (e) => {
        setListValue(e.target.value);
    }

    const selectFunctionSet = () => {
        console.log(listValue);
    }

    const uploadPost = async (e) => {
        if (loading) return;

        setLoading(true);

        if (titleRef.current.value && subjectRef.current.value && currentYearRef.current.value && value) {
            const docRef = await addDoc(collection(db, "posts"), {
                username: session.user.username,
                title: titleRef.current.value,
                subject: subjectRef.current.value,
                currentYear: currentYearRef.current.value,
                // description: descriptionRef.current.value,
                // markdownDescription: value,
                profileImg: session.user.image,
                timestamp: serverTimestamp(),
            })

            console.log("New doc added with ID: ", docRef.id);

            if (selectedFile) {
                const imageRef = ref(storage, `posts/${docRef.id}/image`);
                await uploadString(imageRef, selectedFile, "data_url")
                    .then(async snapshot => {
                        const downloadURL = await getDownloadURL(imageRef);
                        await updateDoc(doc(db, "posts", docRef.id), {
                            image: downloadURL
                        })
                    });
            }

            // toast message after successfully sending form data to firestore
            toast.success('Question Posted Successfully!');

            // redirect to custom post page on onClick button (nested slug routes)
            router.push(`/${session.user.username}/${docRef.id}`)
        }

        // set state to default state
        setLoading(false);
        setSelectedFile(null);
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

    return (
        <>
            {session ? <Fragment>
                <Toaster />
                <Header />
                <div className={styles.container}>
                    {/* <h1>Ask your question</h1> */}

                    <div className={styles.questionContainer}>
                        <div className={styles.subSection}>
                            <label htmlFor="title" >Title</label>
                            <input ref={titleRef} required className="mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="text" id="title" placeholder="Write title" />
                        </div>
                        <div className={styles.subSection}>
                            <label htmlFor="subject">Subject</label>
                            <input ref={subjectRef} required className="mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="text" id="subject" placeholder="Write subject" />
                        </div>
                        <div className={styles.subSection}>
                            <label htmlFor="year">Year</label>
                            <select required onChange={selectFunction} ref={currentYearRef} className="form-select px-4 py-3 rounded-b-lg border-opacity-25 border-2 border-gray-500" id="year">
                                <option disabled defaultValue>Choose your current year</option>
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="4th Year">4th Year</option>
                            </select>
                        </div>
                        <div className={styles.subSection}>
                            <label htmlFor="description">Description</label>
                            {/* <textarea required ref={descriptionRef} className="mt-1
                                        block
                                        w-full
                                        rounded-md
                                      border-gray-300
                                        shadow-sm
                                      focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="" id="description" cols="30" rows="10" placeholder="Describe your problem" /> */}
                            {/* <div>
                                <MDEditor value={value} onChange={setValue} />
                            </div> */}
                        </div>

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

                        <button className={styles.formButton} type="button" onClick={uploadPost}>
                            {loading
                                ?
                                <Fragment>
                                    Uploading...
                                    <div className={styles.animatedIcon}><UseAnimations animation={loading2} fillColor="#8099FC" /></div>
                                </Fragment>
                                :
                                <Fragment>
                                    Upload question
                                </Fragment>
                            }
                        </button>
                    </div>
                </div>
            </Fragment> : <h1>Sign in</h1>}
        </>
    )
}

export default Edit

// export async function getServerSideProps(context) {
//     const session = await getSession(context)

//     if (!session) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//         }
//     }

//     return {
//         props: {
//             userInfo: session.user
//          }
//     }
// }
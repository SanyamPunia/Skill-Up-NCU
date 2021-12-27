import { useRecoilState } from "recoil"
import { modalState } from "../../atoms/modalAtom"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa"
import { db, storage } from "../../firebase";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import styles from "../../styles/dashboard/Modal.module.scss"
import UseAnimations from 'react-useanimations';
import loading2 from 'react-useanimations/lib/loading2'

function Modal() {
    const { data: session } = useSession();

    const [open, setOpen] = useRecoilState(modalState);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(null);

    const filePickerRef = useRef(null);
    const captionRef = useRef(null);

    const uploadPost = async (e) => {
        if (loading) return;

        setLoading(true);

        // 1) create a post and add to firestore
        // 2) get the post ID for the newly created post
        // 3) upload the image to firebase storage with the post ID
        // 4) get a download URL from firestore and upload update the original post with image

        const docRef = await addDoc(collection(db, "posts"), {
            username: session.user.username,
            caption: captionRef.current.value,
            profileImg: session.user.image,
            timestamp: serverTimestamp()
        })

        console.log("New doc added with ID", docRef.id);

        const imageRef = ref(storage, `posts/${docRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url")
            .then(async snapshot => {
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db, "posts", docRef.id), {
                    image: downloadURL,
                })
            });

        setOpen(false);
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
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={setOpen}
            >
                <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center
                sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* Centering the div for modal opening (for browser) */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        area-hidden="true"
                    >
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translaye-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all
                        sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            <div className={styles.container}>
                                {selectedFile
                                    ?
                                    <img src={selectedFile} onClick={() => setSelectedFile(null)} />
                                    : (
                                        <Fragment>
                                            <div className={styles.iconContainer}>
                                                <div className={styles.icon}>
                                                    <FaCamera onClick={() => {
                                                        filePickerRef.current.click()
                                                    }} />
                                                </div>
                                                <p>Click to add an image</p>
                                            </div>
                                            <input type="file" hidden ref={filePickerRef} onChange={addImageToPost} />
                                        </Fragment>
                                    )}

                                <div className={styles.uploadContainer}>
                                    <input type="text" ref={captionRef} placeholder="Please enter a caption" />
                                    <button disabled={!selectedFile} type="button" onClick={uploadPost}>
                                        {loading
                                            ?
                                            <Fragment>
                                                Uploading...
                                                <div className={styles.animatedIcon}><UseAnimations animation={loading2} fillColor="#8099FC" /></div>
                                            </Fragment>
                                            :
                                            <Fragment>
                                                Upload Post
                                            </Fragment>
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal

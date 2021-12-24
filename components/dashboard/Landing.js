import { useSession, getSession } from "next-auth/react"
import { useRecoilState } from "recoil"
import { modalState } from "../../atoms/modalAtom"

function Landing() {
    const { data: session } = useSession()
    const [open, setOpen] = useRecoilState(modalState);

    return (
        <>
            <button onClick={() => setOpen(true)}>New Post</button>
        </>
    )
}

export default Landing

import Images from '@/components/image/Images'
import { BsCheckAll } from 'react-icons/bs'
import { BASEURL } from '@/lib/url'
import { ChatPostType, ChatType, UserType } from '@/types/types'
import { useRouter } from 'next/router'
import useSWR, { Fetcher } from 'swr'
import useMutation from 'swr/mutation'
import { FaTelegramPlane } from 'react-icons/fa'
import { GetServerSideProps } from 'next'
import { Session, unstable_getServerSession } from 'next-auth'
import { authOption } from '../api/auth/[...nextauth]'
import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'
import { formatDistance } from 'date-fns'
import UserIdLoading from '@/components/userId/UserIdLoading'

type FetcherArgument = {
    userId: string,
    receiverId: string
}

const parseDate = (date: string) => {
    const parse = Date.parse(date)
    return new Date(parse)
}

const getDate = (date: string) => formatDistance(parseDate(date), new Date(), { addSuffix: true })

const fetcher: Fetcher<{ chat: Array<ChatPostType> }, { url: string, args: FetcherArgument }> = async ({ url, args }) => {
    const res = await fetch(`${url}?receiverUserId=${args.receiverId}&&userId=${args.userId}`)
    return await res.json()
}

type UserIdProps = {
    User: {
        name: string,
        image: string,
        id: string
    },
    Receiver: UserType
}

const UserId = ({ User, Receiver }: UserIdProps) => {
    const [message, setMessage] = useState('')
    const [isSend, setIsSend] = useState(false)
    const { query } = useRouter()

    const args = {
        receiverId: query.id,
        userId: User.id
    }

    const { data: Chat, isLoading, mutate, isValidating } = useSWR({ url: BASEURL + "/api/chat", args }, fetcher)
    const { trigger } = useMutation({ url: BASEURL + "/api/chat", args }, fetcher)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setMessage(value)
    }

    const handleSend = useCallback(async (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            mutate({ chat: Chat?.chat.concat({ message, profile: User.image, username: User.name, userId: User.id, receiverProfile: Receiver.profile, receiverUserId: Receiver.userId, receiverUsername: Receiver.username, createdAt: new Date().toISOString()}) } as { chat: ChatPostType[] }, { revalidate: false })
            setIsSend(true)
            const res = await fetch(BASEURL + "/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: User.name, profile: User.image, userId: User.id, receiverProfile: Receiver.profile, receiverUserId: Receiver.userId, receiverUsername: Receiver.username, message } as ChatPostType)
            })

            if (res.ok) {
                trigger()
                setIsSend(false)
                setMessage("")
            }

            const data = await res.json()
        }
    }, [Chat?.chat, Receiver.profile, Receiver.userId, Receiver.username, User.id, User.image, User.name, message, mutate, trigger])

    if (isLoading) {
        return <UserIdLoading/>
    }

    return (
        <main className='w-screen h-screen overflow-y-scroll bg-stone-900 pb-20'>
            <header className='w-screen h-[12vh] bg-stone-800 flex justify-around fixed top-0 right-0 items-center gap-3'>
                <div className='flex justify-start gap-2 items-center'>
                    <div className='w-[55px] h-[55px] relative'>
                        <Images profile={Receiver.profile} height={55} width={55} />
                        <span className='w-[15px] h-[15px] bg-green-500 rounded-full absolute bottom-0 right-0 border-[2px] border-stone-700'></span>
                    </div>
                    <span>
                        <p className='text-stone-100 font-[500] tracking-wider'>{Receiver.username}</p>
                    </span>
                </div>
                <span className='text-stone-100 rotate-90 font-bold'>
                    <p>. . .</p>
                </span>
            </header>
            <section className='flex flex-col place-items-around mt-20 justify-center gap-3 w-screen overflow-y-scroll pt-3 px-2'>
                {!Chat?.chat.length && <p className='text-stone-300 text-center text-sm tracking-wider mt-8'>Start Chat 😃</p>}
                {Chat?.chat.map((chat, i) => (
                    <React.Fragment key={i}>
                        <nav className={` rtl p-2  h-max  ${chat.username === User.name ? "place-self-end rounded-bl-xl rounded-tl-xl rounded-tr-xl bg-orange-50" : "place-self-start rounded-br-xl rounded-tr-xl rounded-tl-xl bg-stone-700 text-stone-100"}`}>
                            <section className={`flex justify-start items-center gap-2`} dir={`${chat.username == User.name ? "rtl" : "ltr"}`}>
                                <div>
                                    <p className="text-[.8rem] ">{chat.message}</p>
                                    <span >
                                        <BsCheckAll/>
                                    </span>
                                </div>
                            </section>
                        </nav>
                        <p className={`text-[.7rem] text-stone-400 ${chat.username === User.name ? "place-self-end" : "place-self-start"}`}>{getDate(chat.createdAt!)}</p>
                    </React.Fragment>
                ))}
            </section>
            <footer className='w-screen h-[11vh] bg-stone-800 fixed bottom-0 left-0 flex justify-center items-center'>
                <input value={message} onKeyDown={handleSend} onChange={handleChange} className="p-3  rounded-xl bg-orange-50 outline-none text-sm w-[16rem]" type="text" placeholder='message' />
            </footer>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
    const session = await unstable_getServerSession(req, res, authOption) as Session

    const resp = await fetch(BASEURL + `/api/user?userId=${query.id}`)
    const data = await resp.json() as { user: UserType }

    if (!session) {
        return {
            redirect: {
                destination: "/signIn",
                permanent: false
            }
        }
    }

    return {
        props: {
            User: session.user,
            Receiver: data.user
        }
    }
}

export default UserId
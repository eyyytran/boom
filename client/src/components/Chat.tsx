import React, { ReactElement, useState, useEffect } from 'react'

import Component from '../components/Component'
import Container from '../layout/Container'
import Message from '../components/Message'
import {
    arrayUnion,
    doc,
    updateDoc,
    onSnapshot,
    getDoc,
} from 'firebase/firestore'
import { db } from '../server/firebase'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import appSlice from '../store/appSlice'

type Props = {
    className?: string | null
}

type Styles = {
    static: string
    dynamic?: string | null
}

interface FirebaseMessage {
    sentBy: string
    content: string
    timeStamp: number
}

const styles = {} as Styles

styles.static = 'shrink-0 w-full h-full p-2 md:p-3 lg:p-4'

export default function Chat({ className = null }: Props) {
    styles.dynamic = className

    const [message, setMessage] = useState<string>('')
    const [chat, setChat] = useState<Array<FirebaseMessage>>([])

    const app = {
        state: useSelector((state: RootState) => state.app),
        action: appSlice.actions,
    }

    const handleMessage = (e: any) => {
        const value = e.target.value
        setMessage(value)
    }

    const urlparams = new URLSearchParams(window.location.search)
    const roomId: any = urlparams.get('id')

    const roomRef = doc(db, 'rooms', roomId)

    useEffect(() => {
        if (!roomId) return
        const unsubscribe = onSnapshot(doc(db, 'rooms', roomId), doc => {
            const result = doc.data()
            setChat(result?.messages)
        })
    }, [])

    const sendMessage = async (dataToSend: {}) => {
        try {
            await updateDoc(roomRef, {
                messages: arrayUnion(dataToSend),
            })
            console.log('message sent')
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = () => {
        const dataToSend = {
            sentBy: app.state.userName,
            timeStamp: new Date().getTime(),
            content: message,
        }
        console.log('data to send', dataToSend)
        sendMessage(dataToSend)
        setMessage('')
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        e.stopPropagation()
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }

    return (
        <Component id='Chat'>
            <div className={`${styles.static} ${styles.dynamic}`}>
                <Container>
                    <div className='flex flex-col h-full gap-2'>
                        <div className='flex flex-col h-full gap-2 overflow-y-auto no-scrollbar'>
                            {chat?.map(message => {
                                return (
                                    <Message
                                        key={message.timeStamp}
                                        username={message.sentBy}
                                        message={message.content}
                                        origin={
                                            app.state.userName ===
                                            message.sentBy
                                                ? 'user'
                                                : 'participant'
                                        }
                                    />
                                )
                            })}
                        </div>
                        <form className='contents' data-lpignore='true'>
                            <textarea
                                className='h-8 focus:h-auto p-2 md:p-3 lg:p-4 focus:aspect-square resize-none bg-neutral-200 border border-neutral-400 rounded no-scrollbar'
                                value={message}
                                onKeyDown={handleKeyDown}
                                onChange={handleMessage}
                            ></textarea>
                        </form>
                    </div>
                </Container>
            </div>
        </Component>
    )
}

import React, { useState, useEffect } from 'react'

import Component from '../components/Component'
import Container from '../layout/Container'
import Message from '../components/Message'
import { arrayUnion, doc, updateDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../server/firebase'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import userSlice from '../store/userSlice'
import gameSlice from '../store/gameSlice'

type Props = {
    chatRef: any
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

export default function Chat({ chatRef, className = null }: Props) {
    styles.dynamic = className

    const [message, setMessage] = useState<string>('')
    const [chat, setChat] = useState<Array<FirebaseMessage>>([])

    const user = {
        state: useSelector((state: RootState) => state.user),
        action: userSlice.actions,
    }

    const game = {
        state: useSelector((state: RootState) => state.game),
        action: gameSlice.actions,
    }

    const handleMessage = (e: any) => {
        const value = e.target.value
        setMessage(value)
    }

    const roomRef = game.state.roomId ? doc(db, 'rooms', game.state.roomId) : null

    useEffect(() => {
        if (!roomRef) return
        const unsubscribe = onSnapshot(roomRef, doc => {
            const result = doc.data()
            setChat(result?.messages)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const sendMessage = async (dataToSend: {}) => {
        try {
            if (!roomRef) return
            await updateDoc(roomRef, {
                messages: arrayUnion(dataToSend),
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = () => {
        const dataToSend = {
            sentBy: user.state.userName,
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
            e.preventDefault()
            handleSubmit()
        }
    }

    if (!roomRef) return null
    return (
        <Component id='Chat'>
            <div ref={chatRef} className={`${styles.static} ${styles.dynamic}`}>
                <Container>
                    <div className='flex flex-col h-full gap-2'>
                        <div className='flex flex-col h-full gap-2 overflow-y-auto no-scrollbar'>
                            {chat?.map(message => {
                                return (
                                    <Message
                                        key={message.timeStamp}
                                        username={user.state.userName}
                                        message={message.content}
                                        sender={message.sentBy}
                                        origin={
                                            user.state.userName === message.sentBy
                                                ? 'user'
                                                : 'participant'
                                        }
                                    />
                                )
                            })}
                        </div>
                        <form
                            className='flex flex-col justify-end items-center gap-2 h-max focus:h-auto p-2 md:p-3 lg:p-4 focus:aspect-square resize-none bg-neutral-200 border border-neutral-400 rounded'
                            data-lpignore='true'
                        >
                            <textarea
                                className='w-full p-2 md:p-3 lg:p-4 bg-neutral-50 border border-neutral-400 rounded resize-none'
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

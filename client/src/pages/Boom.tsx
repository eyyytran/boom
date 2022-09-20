import React, { ReactElement, useEffect, useRef } from 'react'

import {
    config,
    useClient,
    useMicrophoneAndCameraTracks,
    channelName,
} from '../server/agora'

import Component from '../components/Component'
import Titlebar from '../components/Titlebar'
import Timer from '../components/Timer'
import Gallery from '../components/Gallery'
import Artboard from '../components/Artboard'
import Display from '../components/Display'
import Chat from '../components/Chat'
import Navbar from '../components/Navbar'
import { doc, onSnapshot } from 'firebase/firestore'
import { RootState } from '../store'
import gameSlice from '../store/gameSlice'
import { db } from '../server/firebase'
import { useSelector } from 'react-redux'

type Styles = {
    static: string
}

const styles = {} as Styles

styles.static = 'fixed inset-0 bg-neutral-200'

export default function Boom() {
    const menuRef = useRef<HTMLDivElement>(null)
    const menuButtonRef = useRef<HTMLDivElement>(null)
    const galleryRef = useRef<HTMLDivElement>(null)
    const galleryButtonRef = useRef<HTMLDivElement>(null)
    const artboardRef = useRef<HTMLDivElement>(null)
    const artboardButtonRef = useRef<HTMLDivElement>(null)
    const chatRef = useRef<HTMLDivElement>(null)
    const chatButtonRef = useRef<HTMLDivElement>(null)
    const exitRef = useRef<HTMLDivElement>(null)
    const exitButtonRef = useRef<HTMLDivElement>(null)

    const game = {
        state: useSelector((state: RootState) => state.game),
        actions: gameSlice.actions,
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(db, 'rooms', game.state.roomId as unknown as string),
            doc => {
                const data = doc.data()
                console.log(data)
            }
        )

        return () => {
            unsubscribe()
        }
    }, [])

    // useEffect(() => {
    //     if (!menuButtonRef.current) return
    //     menuButtonRef.current.onclick = () => {
    //         alert('menuButtonRef')
    //     }
    // }, [])

    useEffect(() => {
        if (!galleryButtonRef.current) return
        galleryButtonRef.current.onclick = () => {
            galleryRef.current?.scrollIntoView()
        }
    }, [])

    useEffect(() => {
        if (!artboardButtonRef.current) return
        artboardButtonRef.current.onclick = () => {
            artboardRef.current?.scrollIntoView()
        }
    }, [])

    useEffect(() => {
        if (!chatButtonRef.current) return
        chatButtonRef.current.onclick = () => {
            chatRef.current?.scrollIntoView()
        }
    }, [])

    useEffect(() => {
        if (!exitButtonRef.current) return
        exitButtonRef.current.onclick = () => {
            alert('exitButtonRef')
        }
    }, [])

    return (
        <Component id='Boom'>
            <div className={`${styles.static}`}>
                <div className='flex flex-col justify-start h-full'>
                    <Titlebar className='shrink-0' />
                    <Timer className='shrink-0' />
                    <div className='flex h-full overflow-y-clip overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth'>
                        <Gallery
                            galleryRef={galleryRef}
                            className='snap-center'
                        />
                        <Artboard
                            artboardRef={artboardRef}
                            className='snap-center'
                        />
                        <Chat chatRef={chatRef} className='snap-center' />
                    </div>
                    <Navbar
                        menuButtonRef={menuButtonRef}
                        galleryButtonRef={galleryButtonRef}
                        artboardButtonRef={artboardButtonRef}
                        chatButtonRef={chatButtonRef}
                        exitButtonRef={exitButtonRef}
                        className='shrink-0'
                    />
                </div>
            </div>
        </Component>
    )
}

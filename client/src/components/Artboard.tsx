import React, { useEffect, useState } from 'react'

import artboardSlice from '../store/artboardSlice'

import { useSelector } from 'react-redux'
import { RootState } from '../store'

import Component from '../components/Component'
import Container from '../layout/Container'
import Instructions from '../components/Instructions'
import Toolbar from '../components/Toolbar'
import Taskbar from '../components/Taskbar'
import Canvas from '../components/Canvas'

import gameSlice from '../store/gameSlice'
import {
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore'
import { db } from '../server/firebase'

type Props = {
    artboardRef: any
    className?: string | null
}

type Styles = {
    static: string
    dynamic?: string | null
}

const styles = {} as Styles

styles.static = 'shrink-0 w-full h-full p-2 md:p-3 lg:p-4'

export default function Artboard({ artboardRef, className = null }: Props) {
    const artboard = {
        state: useSelector((state: RootState) => state.artboard),
        action: artboardSlice.actions,
    }
    const game = {
        state: useSelector((state: RootState) => state.game),
        action: gameSlice.actions,
    }

    const [prompt, setPrompt] = useState<string>('')
    const [showModal, setShowModal] = useState<boolean>(false)

    const getPrompt: any = async (promptArray: Array<number>) => {
        const randomNum = Math.floor(Math.random() * 24) //NUMBER OF PROMPTS + 1
        if (promptArray.includes(randomNum)) return getPrompt(promptArray)
        try {
            const querySnapshot = await getDocs(
                query(
                    collection(db, 'game-prompts'),
                    where('id', '==', randomNum)
                )
            )
            querySnapshot.forEach(doc => {
                setPrompt(doc.data().prompt)
            })
            await updateDoc(
                doc(db, 'rooms', game.state.roomId as unknown as string),
                {
                    'gameState.usedPrompts': arrayUnion(randomNum),
                }
            )
        } catch (error) {
            console.error()
        }
    }

    const handleGetPrompt = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const docSnap = await getDoc(
            doc(db, 'rooms', game.state.roomId as unknown as string)
        )
        if (docSnap.exists()) {
            const data = docSnap.data()
            let usedPromptsArray = data.usedPrompts
            if (!data.usedPrompts) {
                usedPromptsArray = []
            }
            await getPrompt(usedPromptsArray)
        }
    }

    useEffect(() => {
        const sendPrompt = async () => {
            await updateDoc(
                doc(db, 'rooms', game.state.roomId as unknown as string),
                {
                    'gameState.currentPrompt': prompt,
                }
            )
        }
        sendPrompt()
    }, [prompt])

    styles.dynamic = className
    return (
        <Component id='Artboard'>
            <div
                ref={artboardRef}
                className={`${styles.static} ${styles.dynamic}`}
            >
                <Container className='overflow-y-auto no-scrollbar'>
                    <div className='flex portrait:flex-col justify-start h-full'>
                        <Instructions />
                        <Toolbar />
                        <div className='portrait:w-full landscape:h-max aspect-square bg-white border-x border-neutral-400'>
                            <Canvas />
                        </div>
                        <button
                            className={
                                game.state.isTurn
                                    ? 'p-2 bg-violet-500 text-xs font-bold text-white text-center'
                                    : 'hidden'
                            }
                            onClick={handleGetPrompt}
                        >
                            {!prompt ? 'Generate Prompt' : prompt}
                        </button>
                        <Taskbar
                            showModal={showModal}
                            setShowModal={setShowModal}
                        />
                    </div>
                </Container>
            </div>
        </Component>
    )
}

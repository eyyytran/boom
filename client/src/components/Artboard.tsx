import React, { useState } from 'react'

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
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from 'firebase/firestore'
import { db } from '../server/firebase'
import './styles/artboardStyles.css'

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

    const [prompt, setPrompt] = useState('')

    const getPrompt = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const randomNum = Math.floor(Math.random() * 14) //NUMBER OF PROMPTS + 1
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
        } catch (error) {
            console.error()
        }
    }

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
                            onClick={getPrompt}
                        >
                            {!prompt ? 'Generate Prompt' : prompt}
                        </button>
                        <Taskbar />
                    </div>
                </Container>
            </div>
        </Component>
    )
}

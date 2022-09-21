import { faCheck, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactElement } from 'react'

import Component from './Component'

import { RootState } from '../store'
import gameSlice from '../store/gameSlice'
import { useSelector } from 'react-redux'

import './styles/gameStyles.css'

type Props = {
    className?: string | null
}

type Styles = {
    static: string
    dynamic?: string | null
}

const styles = {} as Styles

styles.static =
    'flex landscape:flex-col landscape:flex-col-reverse justify-center items-center gap-2 md:gap-3 lg:gap-4 p-2 md:p-3 lg:p-4 bg-neutral-300 border-x border-b border-neutral-400 rounded-b'

export default function Taskbar({ className = null }: Props) {
    styles.dynamic = className

    const game = {
        state: useSelector((state: RootState) => state.game),
        action: gameSlice.actions,
    }

    const handleAwardPoint = async (e: React.SyntheticEvent) => {
        e.preventDefault()
    }

    return (
        <Component id='Taskbar'>
            <div
                className={
                    game.state.isTurn
                        ? `${styles.static} ${styles.dynamic}`
                        : `avoid-clicks ${styles.static} ${styles.dynamic}`
                }
            >
                <button
                    className='w-1/2 flex justify-center items-center'
                    disabled={game.state.isTurn ? false : true}
                >
                    <FontAwesomeIcon icon={faDeleteLeft} className='text-xl' />
                </button>
                <button
                    className='w-1/2 flex justify-center items-center'
                    disabled={game.state.isTurn ? false : true}
                >
                    <FontAwesomeIcon icon={faCheck} className='text-xl' />
                </button>
            </div>
        </Component>
    )
}

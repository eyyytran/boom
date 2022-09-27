import Component from '../Component'
import Container from '../../layout/Container'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import timerSlice from '../../store/timerSlice'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import gameSlice from '../../store/gameSlice'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../server/firebase'

type Props = {
    className?: string | null
}

type Styles = {
    static: string
    dynamic?: string | null
}

const styles = {} as Styles

styles.static = 'p-2 md:p-3 lg:p-4 bg-neutral-300'

export default function Timer({ className = null }: Props) {
    styles.dynamic = className

    const game = {
        state: useSelector((state: RootState) => state.game),
        action: gameSlice.actions,
    }

    const timer = {
        state: useSelector((state: RootState) => state.timer),
        action: timerSlice.actions,
    }

    const [displayMin, setDisplayMin] = useState('01')
    const [displaySec, setDisplaySec] = useState('00')
    const [progress, setProgress] = useState('0')

    const dispatch = useDispatch()

    useEffect(() => {
        if (!game.state.isTurnStarted) return
        const stopTurn = async () => {
            function getWhosTurn() {
                const whosTurn = game.state.whosTurn as number
                return whosTurn === game.state.players.length - 1 ? 0 : whosTurn + 1
            }
            await updateDoc(doc(db, 'rooms', game.state.roomId), {
                drawings: null,
                'gameState.isTurnStart': false,
                'gameState.whosTurn': getWhosTurn(),
            })
            dispatch(game.action.setCurrentPrompt(''))
        }
        let interval: any
        const startTimer = () => {
            const convertedTurnTime = timer.state.turnTime * 60 * 1000
            const endTime = timer.state.endTime

            if (timer.state.isStopTimer) {
                setDisplayMin('01')
                setDisplaySec('00')
                setProgress('0')
                return
            }

            interval = setInterval(() => {
                const now = new Date().getTime()
                const difference = endTime - now
                const minutes = Math.floor((difference % (60 * 60 * 1000)) / (1000 * 60))
                const seconds = Math.floor((difference % (60 * 1000)) / 1000)

                if (difference < 0) {
                    clearInterval(interval)
                    if (!game.state.isTurn) return
                    stopTurn()
                } else {
                    setDisplayMin(`${minutes}`.padStart(2, '0'))
                    setDisplaySec(`${seconds}`.padStart(2, '0'))
                }

                let percent = Math.ceil(
                    ((convertedTurnTime - difference) / convertedTurnTime) * 100
                )
                setProgress(percent.toString())
            }, 1000)
        }

        startTimer()
        return () => {
            clearInterval(interval)
        }
    }, [
        game.state.isTurnStarted,
        timer.state.endTime,
        timer.state.turnTime,
        timer.state.isStopTimer,
        game.state.roomId,
        game.state.players,
        game.state.whosTurn,
        game.state.isTurn,
        game.action,
        dispatch,
    ])

    return (
        <Component id='Timer'>
            <div className={`${styles.static} ${styles.dynamic}`}>
                <Container>
                    <div className='flex flex-col gap-2 md:gap-3 lg:gap-4'>
                        <div className='flex justify-between items-center'>
                            <span className='text-xs font-bold'>Time Remaining</span>
                            <span className='text-xs font-bold'>
                                {displayMin}:{displaySec}
                            </span>
                        </div>
                        <div className='bg-neutral-200 rounded h-3'>
                            <div
                                style={{
                                    height: '100%',
                                    width: `${progress}%`,
                                    borderRadius: '5px',
                                }}
                                className={
                                    parseInt(progress) > 80
                                        ? 'animate-pulse bg-violet-500'
                                        : 'bg-violet-500'
                                }
                            ></div>
                        </div>
                    </div>
                </Container>
            </div>
        </Component>
    )
}

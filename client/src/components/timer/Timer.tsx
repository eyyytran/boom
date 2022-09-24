import Component from '../Component'
import Container from '../../layout/Container'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import timerSlice from '../../store/timerSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

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

    const timer = {
        state: useSelector((state: RootState) => state.timer),
        action: timerSlice.actions,
    }

    const [displayMin, setDisplayMin] = useState('01')
    const [displaySec, setDisplaySec] = useState('00')
    const [progress, setProgress] = useState('0')

    const dispatch = useDispatch()

    let interval: any

    const startTimer = () => {
        const currentTime = new Date().getTime()
        const convertedTurnTime = timer.state.turnTime * 60 * 1000
        const endTime = currentTime + convertedTurnTime
        console.log({ endTime, currentTime, convertedTurnTime })

        interval = setInterval(() => {
            const now = new Date().getTime()
            const difference = endTime - now
            const minutes = Math.floor((difference % (60 * 60 * 1000)) / (1000 * 60))
            const seconds = Math.floor((difference % (60 * 1000)) / 1000)

            if (difference < 0) {
                clearInterval(interval)
            } else {
                setDisplayMin(`${minutes}`.padStart(2, '0'))
                setDisplaySec(`${seconds}`.padStart(2, '0'))
            }

            let percent = Math.ceil(((convertedTurnTime - difference) / convertedTurnTime) * 100)
            setProgress(percent.toString())
        }, 1000)
    }

    const handleTimerClick = () => {
        startTimer()
    }

    const stopTimer = () => {
        clearInterval(interval)
    }

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
                                    backgroundColor: 'purple',
                                    borderRadius: '5px',
                                }}
                            ></div>
                        </div>
                    </div>
                    <button onClick={handleTimerClick}>Get Date</button>
                    <button>Stop Timer</button>
                </Container>
            </div>
        </Component>
    )
}

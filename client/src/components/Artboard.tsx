import { SyntheticEvent } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import Component from '../components/Component'
import Container from '../layout/Container'
import Toolbar from '../components/Toolbar'
import Taskbar from '../components/Taskbar'
import Canvas from '../components/Canvas'
import GivePointModal from './modals/GivePointModal'
import IsTurnModal from './modals/IsTurnModal'
import EndGameModal from './modals/EndGameModal'
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
import modalSlice from '../store/modalSlice'
import { randomIntegerInInterval } from '../util/randomIntegerInInterval'
import timerSlice from '../store/timerSlice'
import { useDispatch } from 'react-redux'

type Props = {
    artboardRef: any
    className?: string | null
}

type Styles = {
    static: string
    dynamic?: string | null
}

const styles = {} as Styles

styles.static =
    'relative flex flex-col gap-2 justify-center items-center w-full h-full lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-1 bg-neutral-200 rounded'

export default function Artboard({ artboardRef, className = null }: Props) {
    const game = {
        state: useSelector((state: RootState) => state.game),
        action: gameSlice.actions,
    }

    const modal = {
        state: useSelector((state: RootState) => state.modal),
        action: modalSlice.actions,
    }

    const timer = {
        state: useSelector((state: RootState) => state.timer),
        action: timerSlice.actions,
    }

    const dispatch = useDispatch()

    const getPromptAndUpdateTimer: any = async (alreadyUsedPromptIds: Array<number>) => {
        const randomPromptId = randomIntegerInInterval(0, 24)
        if (alreadyUsedPromptIds && alreadyUsedPromptIds.includes(randomPromptId))
            return getPromptAndUpdateTimer(alreadyUsedPromptIds)
        const currentTime = new Date().getTime()
        const convertedTurnTime = timer.state.turnTime * 60 * 1000
        const endTime = currentTime + convertedTurnTime
        try {
            const querySnapshot = await getDocs(
                query(collection(db, 'game-prompts'), where('id', '==', randomPromptId))
            )
            querySnapshot.forEach(doc => {
                dispatch(game.action.setCurrentPrompt(doc.data().prompt))
            })
            await updateDoc(doc(db, 'rooms', game.state.roomId), {
                'gameState.usedPrompts': arrayUnion(randomPromptId),
                'gameState.isTurnStart': true,
                'gameState.turnEndTime': endTime,
                'gameState.isStopTimer': false,
            })
        } catch (error) {
            console.error()
        }
    }

    const handleGetPrompt = async (e: SyntheticEvent) => {
        e.preventDefault()
        if (game.state.isTurnStarted === true && game.state.currentPrompt) return
        const docSnap = await getDoc(doc(db, 'rooms', game.state.roomId))
        if (docSnap.exists()) {
            const data = docSnap.data()
            let usedPromptsArray = data.usedPrompts

            await getPromptAndUpdateTimer(usedPromptsArray)
        }
    }

    styles.dynamic = className
    return (
        <Component id='Artboard'>
            <div ref={artboardRef} className={`${styles.static} ${styles.dynamic}`}>
                <Container className='w-full h-full overflow-y-auto no-scrollbar rounded'>
                    <div className='relative flex portrait:flex-col lg:flex-col justify-start h-full bg-white'>
                        <Toolbar />
                        <IsTurnModal />
                        {modal.state.isShowIsTurnModal && modal.state.isShowGivePointModal && (
                            <GivePointModal />
                        )}
                        {modal.state.isShowWinnerModal && game.state.isWon && <EndGameModal />}
                        <div className='w-full h-full bg-white'>
                            <Canvas />
                        </div>
                        <Taskbar handleGetPrompt={handleGetPrompt} />
                    </div>
                </Container>
            </div>
        </Component>
    )
}

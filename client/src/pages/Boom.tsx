import { useEffect, useRef } from 'react'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RootState } from '../store'
import { db } from '../server/firebase'
import userSlice from '../store/userSlice'
import gameSlice from '../store/gameSlice'
import modalSlice from '../store/modalSlice'
import Component from '../components/Component'
import Titlebar from '../components/Titlebar'
import Timer from '../components/timer/Timer'
import Gallery from '../components/Gallery'
import Artboard from '../components/Artboard'
import Chat from '../components/Chat'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import IParticipant from '../components/interfaces/IParticipant'
import timerSlice from '../store/timerSlice'

type Styles = {
    static: string
}

const styles = {} as Styles

styles.static = 'fixed inset-0 bg-neutral-200'

export default function Boom() {
    const galleryRef = useRef<HTMLDivElement>(null)
    const galleryButtonRef = useRef<HTMLDivElement>(null)
    const artboardRef = useRef<HTMLDivElement>(null)
    const artboardButtonRef = useRef<HTMLDivElement>(null)
    const chatRef = useRef<HTMLDivElement>(null)
    const chatButtonRef = useRef<HTMLDivElement>(null)
    const exitButtonRef = useRef<HTMLDivElement>(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = {
        state: useSelector((state: RootState) => state.user),
        action: userSlice.actions,
    }

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

    useEffect(() => {
        if (!game.state.roomId) return
        const getParticipants = async () => {
            const docSnap = await getDoc(doc(db, 'rooms', game.state.roomId))
            if (docSnap.exists()) {
                const data = docSnap.data()
                const participants = data.gameState.players
                dispatch(game.action.setPlayers(participants))
            }
        }

        const reassignPlayerNum = (playerList: IParticipant[]) => {
            const index = playerList.findIndex(player => player.player === user.state.userName)
            // if (index === -1) {
            //     dispatch(game.action.setPlayerNum(0))
            // } else if (index !== -1) {
            dispatch(game.action.setPlayerNum(index))
            // }
            if (index === 0) {
                dispatch(game.action.setIsOwner(true))
            }
        }

        const unsubscribe = onSnapshot(doc(db, 'rooms', game.state.roomId), doc => {
            const data = doc.data()
            const dbGameState = data?.gameState

            if (dbGameState.isEnded) {
                navigate('/dashboard')
                dispatch(game.action.resetState())
                dispatch(modal.action.resetModals())
                dispatch(timer.action.resetTime())
                return
            }

            dispatch(game.action.setIsInit(dbGameState.gameStarted))
            dispatch(
                modal.action.setIsShowIsTurnModal(
                    dbGameState.gameStarted && dbGameState.whosTurn === game.state.playerNum
                )
            )
            dispatch(
                game.action.setIsTurn(
                    dbGameState.gameStarted && dbGameState.whosTurn === game.state.playerNum
                )
            )
            dispatch(game.action.setWhosTurn(dbGameState.whosTurn))

            if (JSON.stringify(game.state.players) !== JSON.stringify(dbGameState.players)) {
                // if(dbGameState.players < game.state.players)
                getParticipants()
                reassignPlayerNum(dbGameState.players)
            }

            dispatch(game.action.setIsTurnStarted(dbGameState.isTurnStart))
            if (dbGameState.isTurnStart) {
                dispatch(timer.action.setEndTime(dbGameState.turnEndTime))
            }

            dispatch(timer.action.setIsStopTimer(dbGameState.isStopTimer))

            dispatch(game.action.setIsWon(dbGameState.gameWon))
            dispatch(game.action.setWinner(dbGameState.winner ? dbGameState.winner.player : null))

            if (dbGameState.gameWon && dbGameState.winner) {
                dispatch(game.action.setIsInit(false))
                dispatch(modal.action.setIsShowWinnerModal(true))
            }
        })
        return () => {
            unsubscribe()
        }
    }, [
        dispatch,
        game.action,
        game.state.playerNum,
        game.state.players,
        game.state.roomId,
        modal.action,
        timer.action,
        user.state.userName,
        navigate,
    ])

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
    console.log('ROOM', game.state.roomId)
    return (
        <Component id='Boom'>
            <div className={`${styles.static}`}>
                <div className='flex flex-col justify-start h-full'>
                    <Titlebar className='shrink-0' />
                    <Timer className='shrink-0' />
                    <div className='flex lg:grid lg:grid-cols-3 h-full overflow-y-clip overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth border-4 border-blue-500'>
                        <Gallery
                            galleryRef={galleryRef}
                            className='shrink-0 border border-red-500 snap-center lg:col-start-1 lg:col-span-full'
                        />
                        <Artboard
                            artboardRef={artboardRef}
                            className='shrink-0 lg:shrink border border-red-500 snap-center'
                        />
                        <Chat
                            chatRef={chatRef}
                            className='shrink-0 border border-red-500 snap-center'
                        />
                    </div>
                    <Navbar
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

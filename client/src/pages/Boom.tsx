import { useEffect, useRef, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { RootState } from '../store'
import { db } from '../server/firebase'
import IParticipant from '../components/interfaces/IParticipant'
import userSlice from '../store/userSlice'
import gameSlice from '../store/gameSlice'
import modalSlice from '../store/modalSlice'
import timerSlice from '../store/timerSlice'
import Component from '../components/Component'
import Titlebar from '../components/Titlebar'
import Timer from '../components/timer/Timer'
import Gallery from '../components/Gallery'
import Artboard from '../components/Artboard'
import Chat from '../components/Chat'
import Navbar from '../components/Navbar'

type Styles = {
    static: string
}

const styles = {} as Styles

styles.static = 'fixed inset-0 bg-neutral-100 min-h-[667px] '

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

    // Viewport functionality
    const isGalleryInView = useIsInViewport(galleryRef)

    const isArtboardInView = useIsInViewport(artboardRef)

    const isChatInView = useIsInViewport(chatRef)

    function useIsInViewport(ref: any) {
        const [isIntersecting, setIsIntersecting] = useState(false)

        const observer = useMemo(
            () =>
                new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting), {
                    threshold: 0.5,
                }),
            []
        )

        useEffect(() => {
            observer.observe(ref.current)

            return () => {
                observer.disconnect()
            }
        }, [ref, observer])

        return isIntersecting
    }

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
            const index = playerList.findIndex(player => player.uid === user.state.user?.uid)
            dispatch(game.action.setPlayerNum(index))
            if (index === 0) {
                dispatch(game.action.setIsOwner(true))
            }
        }

        const assignPoints = (playerList: IParticipant[]) => {
            const currentUser = playerList.find(player => player.uid === user.state.user?.uid)
            dispatch(game.action.setPlayerPoints(currentUser?.points))
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
                getParticipants()
                reassignPlayerNum(dbGameState.players)
                assignPoints(dbGameState.players)
            }

            dispatch(game.action.setIsTurnStarted(dbGameState.isTurnStart))
            if (dbGameState.isTurnStart && dbGameState.turnEndTime !== timer.state.endTime) {
                dispatch(timer.action.setEndTime(dbGameState.turnEndTime))
            }

            if (dbGameState.isStopTimer !== timer.state.isStopTimer) {
                dispatch(timer.action.setIsStopTimer(dbGameState.isStopTimer))
            }

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
        timer.state.endTime,
        timer.state.isStopTimer,
        user.state.userName,
        navigate,
        user.state.user?.uid,
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

    return (
        <Component id='Boom'>
            <div className={`${styles.static}`}>
                <div className='flex flex-col justify-start h-full'>
                    <Titlebar className='shrink-0' />
                    <Timer className='shrink-0' />
                    <div className='flex xl:grid xl:grid-cols-3 6xl:grid-cols-5 xl:grid-rows-3 gap-2 md:gap-3 xl:gap-4 p-2 md:p-3 xl:p-4 h-full overflow-y-clip overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth'>
                        <Gallery
                            galleryRef={galleryRef}
                            className='shrink-0 snap-center xl:col-start-1 xl:col-span-full xl:row-start-3 xl:row-span-1 6xl: col-start-1 6xl:col-span-1 6xl:row-start-1 6xl:row-span-3'
                        />
                        <Artboard
                            artboardRef={artboardRef}
                            className='shrink-0 xl:shrink snap-center xl:row-start-1 xl:row-span-2 6xl:col-start-2 6xl:col-span-3 6xl:row-start-1 6xl:row-span-3'
                        />
                        <Chat
                            chatRef={chatRef}
                            className='shrink-0 snap-center xl:row-start-1 xl:row-span-2 6xl:col-start-5 6xl:col-span-1 6xl:row-start-1 6xl:row-span-3'
                        />
                    </div>
                    <Navbar
                        galleryButtonRef={galleryButtonRef}
                        artboardButtonRef={artboardButtonRef}
                        chatButtonRef={chatButtonRef}
                        exitButtonRef={exitButtonRef}
                        isGalleryInView={isGalleryInView}
                        isArtboardInView={isArtboardInView}
                        isChatInView={isChatInView}
                        className='shrink-0'
                    />
                </div>
            </div>
        </Component>
    )
}

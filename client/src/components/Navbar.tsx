import { FC, SyntheticEvent } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import {
    faRightToBracket,
    faMessage,
    faTableCellsLarge,
    faVideo,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Component from './Component'
import Container from '../layout/Container'
import { db } from '../server/firebase'
import { RootState } from '../store'
import gameSlice from '../store/gameSlice'
import { randomIntegerInInterval } from '../util/randomIntegerInInterval'
import { cleanupUser } from '../util/cleanupUser'
import { useDispatch } from 'react-redux'
import userSlice from '../store/userSlice'
import modalSlice from '../store/modalSlice'
import { endGame } from '../util/handleEndGame'

type Props = {
    galleryButtonRef: any
    artboardButtonRef: any
    chatButtonRef: any
    exitButtonRef: any
    className?: string | null
    isGalleryInView: boolean
    isChatInView: boolean
    isArtboardInView: boolean
}

type Styles = {
    static: string
    dynamic?: string | null
}

const styles = {} as Styles

styles.static = 'p-2 md:p-3 lg:p-4  bg-neutral-300'

const Navbar: FC<Props> = ({
    galleryButtonRef,
    artboardButtonRef,
    chatButtonRef,
    exitButtonRef,
    className = null,
    isGalleryInView,
    isChatInView,
    isArtboardInView,
}) => {
    styles.dynamic = className

    const game = {
        state: useSelector((state: RootState) => state.game),
        action: gameSlice.actions,
    }

    const user = {
        state: useSelector((state: RootState) => state.user),
        action: userSlice.actions,
    }

    const modal = {
        state: useSelector((state: RootState) => state.modal),
        action: modalSlice.actions,
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const startGame = async (e: SyntheticEvent) => {
        e.preventDefault()
        await updateDoc(doc(db, 'rooms', game.state.roomId), {
            'gameState.gameStarted': true,
            'gameState.whosTurn': randomIntegerInInterval(0, game.state.players.length - 1),
        })
    }

    const handleEndGame = async (e: SyntheticEvent) => {
        e.preventDefault()
        endGame(game.state.roomId)
    }

    const handleUserCleanup = () => {
        cleanupUser(game.state.roomId, user.state.user?.uid, game.state.players)
        navigate('/dashboard')
        dispatch(game.action.resetState())
        dispatch(modal.action.resetModals())
    }

    return (
        <Component id='Navbar'>
            <div className={`${styles.static} ${styles.dynamic}`}>
                <Container>
                    <div className='flex justify-between items-center gap-2 h-full'>
                        {game.state.isOwner && (
                            <button
                                className={
                                    game.state.isInit
                                        ? 'py-2 px-4 bg-red-700 rounded-md md:w-40 sm:w-40'
                                        : 'py-2 px-4 bg-green-700 rounded-md md:w-40 sm:w-40'
                                }
                                onClick={(e: SyntheticEvent) =>
                                    game.state.isInit ? handleEndGame(e) : startGame(e)
                                }
                            >
                                <span className='text-neutral-100'>
                                    {game.state.isInit ? 'End Game' : 'Start Game'}
                                </span>
                            </button>
                        )}
                        <div className='flex justify-center items-center gap-2 h-full'>
                            <button ref={galleryButtonRef} className='py-2 px-4'>
                                <FontAwesomeIcon
                                    icon={faVideo}
                                    className={isGalleryInView ? 'text-violet-500' : ''}
                                />
                            </button>
                            <button ref={artboardButtonRef} className='py-2 px-4'>
                                <FontAwesomeIcon
                                    icon={faTableCellsLarge}
                                    className={isArtboardInView ? 'text-violet-500' : ''}
                                />
                            </button>
                            <button ref={chatButtonRef} className='py-2 px-4'>
                                <FontAwesomeIcon
                                    icon={faMessage}
                                    className={isChatInView ? 'text-violet-500' : ''}
                                />
                            </button>
                        </div>
                        <button
                            ref={exitButtonRef}
                            className='py-2 px-4'
                            onClick={handleUserCleanup}
                        >
                            <FontAwesomeIcon icon={faRightToBracket} className='' />
                        </button>
                    </div>
                </Container>
            </div>
        </Component>
    )
}

export default Navbar

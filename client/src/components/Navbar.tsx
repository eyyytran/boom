import React, { ReactElement } from 'react'
import Component from './Component'
import Container from '../layout/Container'
import {
    faRightToBracket,
    faMessage,
    faPenToSquare,
    faTableCellsLarge,
    faVideo,
    faCog,
    faBars,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { auth } from '../server/firebase'
import { useNavigate } from 'react-router-dom'

type Props = {
    menuButtonRef: any
    galleryButtonRef: any
    artboardButtonRef: any
    chatButtonRef: any
    exitButtonRef: any
    className?: string | null
}

type Styles = {
    static: string
    dynamic?: string | null
}

const styles = {} as Styles

styles.static = 'p-2 md:p-3 lg:p-4  bg-neutral-300'

export default function Navbar({
    menuButtonRef,
    galleryButtonRef,
    artboardButtonRef,
    chatButtonRef,
    exitButtonRef,
    className = null,
}: Props) {
    styles.dynamic = className

    const navigate = useNavigate()

    const handleSignout = (e: React.SyntheticEvent) => {
        auth.signOut()
        navigate('/')
    }
    return (
        <Component id='Navbar'>
            <div className={`${styles.static} ${styles.dynamic}`}>
                <Container>
                    <div className='flex justify-between items-center gap-2 h-full'>
                        <button ref={menuButtonRef} className='py-2 px-4'>
                            <FontAwesomeIcon icon={faBars} className='' />
                        </button>
                        <div className='flex justify-center items-center gap-2 h-full'>
                            <button
                                ref={galleryButtonRef}
                                className='py-2 px-4'
                            >
                                <FontAwesomeIcon
                                    icon={faVideo}
                                    className='text-violet-500'
                                />
                            </button>
                            <button
                                ref={artboardButtonRef}
                                className='py-2 px-4'
                            >
                                <FontAwesomeIcon
                                    icon={faTableCellsLarge}
                                    className=''
                                />
                            </button>
                            <button ref={chatButtonRef} className='py-2 px-4'>
                                <FontAwesomeIcon
                                    icon={faMessage}
                                    className=''
                                />
                            </button>
                        </div>
                        <button
                            ref={exitButtonRef}
                            className='py-2 px-4'
                            onClick={handleSignout}
                        >
                            <FontAwesomeIcon
                                icon={faRightToBracket}
                                className=''
                            />
                        </button>
                    </div>
                </Container>
            </div>
        </Component>
    )
}

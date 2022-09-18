import React, { ReactElement } from 'react'

import artboardSlice from '../store/artboardSlice'

import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useDispatch } from 'react-redux'

import Component from '../components/Component'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEraser,
    faPaintBrush,
    faPalette,
    faSquare,
} from '@fortawesome/free-solid-svg-icons'

type Props = {
    className?: string | null
}

type Styles = {
    static: string
    dynamic?: string | null
}

const styles = {} as Styles

styles.static =
    'flex jusitify-between items-center gap-2 md:gap-3 lg:gap-4 p-2 md:p-3 lg:p-4 bg-neutral-300 border-x border-neutral-400'

export default function Toolbar({ className = null }: Props) {
    const artboard = {
        state: useSelector((state: RootState) => state.artboard),
        actions: artboardSlice.actions,
    }

    const dispatch = useDispatch()

    styles.dynamic = className
    return (
        <Component id='Toolbar'>
            <div className={`${styles.static} ${styles.dynamic}`}>
                <div className='flex landscape:flex-col justify-start items-center gap-2 md:gap-3 lg:gap-4 w-full'>
                    <FontAwesomeIcon
                        icon={faEraser}
                        className='text-xs text-neutral-400'
                        onClick={() =>
                            dispatch(artboard.actions.setLineWidth(3))
                        }
                    />
                    <FontAwesomeIcon
                        icon={faEraser}
                        className='text-sm text-neutral-400'
                        onClick={() =>
                            dispatch(artboard.actions.setLineWidth(5))
                        }
                    />
                    <FontAwesomeIcon
                        icon={faEraser}
                        className='text-md text-neutral-900'
                        onClick={() =>
                            dispatch(artboard.actions.setLineWidth(8))
                        }
                    />
                    <FontAwesomeIcon
                        icon={faEraser}
                        className='text-lg text-neutral-400'
                        onClick={() =>
                            dispatch(artboard.actions.setLineWidth(13))
                        }
                    />
                    <FontAwesomeIcon
                        icon={faEraser}
                        className='text-xl text-neutral-400'
                        onClick={() =>
                            dispatch(artboard.actions.setLineWidth(21))
                        }
                    />
                </div>
                <div className='flex flex-wrap landscape:flex-col justify-center items-center gap-2 md:gap-3 lg:gap-4 w-full'>
                    <FontAwesomeIcon
                        icon={faSquare}
                        className='text-base text-neutral-900'
                        onClick={e =>
                            dispatch(
                                artboard.actions.setCurrentColor('#171717')
                            )
                        }
                    />
                    <FontAwesomeIcon
                        icon={faSquare}
                        className='text-base text-rose-500'
                        onClick={e =>
                            dispatch(
                                artboard.actions.setCurrentColor('#f43f5e')
                            )
                        }
                    />
                    <FontAwesomeIcon
                        icon={faSquare}
                        className='text-base text-amber-500'
                        onClick={e =>
                            dispatch(
                                artboard.actions.setCurrentColor('#f59e0b')
                            )
                        }
                    />
                    <FontAwesomeIcon
                        icon={faSquare}
                        className='text-base text-yellow-500'
                        onClick={e =>
                            dispatch(
                                artboard.actions.setCurrentColor('#eab308')
                            )
                        }
                    />
                    <FontAwesomeIcon
                        icon={faSquare}
                        className='text-base text-emerald-500'
                        onClick={e =>
                            dispatch(
                                artboard.actions.setCurrentColor('#10b981')
                            )
                        }
                    />
                    <FontAwesomeIcon
                        icon={faSquare}
                        className='text-base text-sky-500'
                        onClick={e =>
                            dispatch(
                                artboard.actions.setCurrentColor('#0ea5e9')
                            )
                        }
                    />
                    <FontAwesomeIcon
                        icon={faSquare}
                        className='text-base text-violet-500'
                        onClick={e =>
                            dispatch(
                                artboard.actions.setCurrentColor('#8b5cf6')
                            )
                        }
                    />
                    <FontAwesomeIcon
                        icon={faSquare}
                        className='text-base text-fuchsia-500'
                        onClick={e =>
                            dispatch(
                                artboard.actions.setCurrentColor('#d946ef')
                            )
                        }
                    />
                    <FontAwesomeIcon
                        icon={faSquare}
                        className='text-base text-pink-500'
                        onClick={e =>
                            dispatch(
                                artboard.actions.setCurrentColor('#ec4899')
                            )
                        }
                    />
                    <FontAwesomeIcon
                        icon={faSquare}
                        className='text-base text-white'
                        onClick={e =>
                            dispatch(
                                artboard.actions.setCurrentColor('#ffffff')
                            )
                        }
                    />
                </div>
                <div className='flex landscape:flex-col justify-end items-center gap-2 md:gap-3 lg:gap-4 w-full'>
                    <FontAwesomeIcon
                        icon={faPaintBrush}
                        className='text-xs text-neutral-400'
                        onClick={() =>
                            dispatch(artboard.actions.setLineWidth(3))
                        }
                    />
                    <FontAwesomeIcon
                        icon={faPaintBrush}
                        className='text-sm text-neutral-400'
                        onClick={() =>
                            dispatch(artboard.actions.setLineWidth(5))
                        }
                    />
                    <FontAwesomeIcon
                        icon={faPaintBrush}
                        className='text-md text-neutral-900'
                        onClick={() =>
                            dispatch(artboard.actions.setLineWidth(8))
                        }
                    />
                    <FontAwesomeIcon
                        icon={faPaintBrush}
                        className='text-lg text-neutral-400'
                        onClick={() =>
                            dispatch(artboard.actions.setLineWidth(13))
                        }
                    />
                    <FontAwesomeIcon
                        icon={faPaintBrush}
                        className='text-xl text-neutral-400'
                        onClick={() =>
                            dispatch(artboard.actions.setLineWidth(21))
                        }
                    />
                </div>
            </div>
        </Component>
    )
}

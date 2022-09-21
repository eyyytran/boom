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
                        className={`text-xs ${
                            artboard.state.eraserWidth === 8
                                ? 'text-neutral-900'
                                : 'text-neutral-400'
                        }`}
                        onClick={() => {
                            dispatch(artboard.actions.setEraserWidth(8))
                            dispatch(
                                artboard.actions.setCurrentColor('#ffffff')
                            )
                        }}
                    />
                    <FontAwesomeIcon
                        icon={faEraser}
                        className={`text-sm ${
                            artboard.state.eraserWidth === 13
                                ? 'text-neutral-900'
                                : 'text-neutral-400'
                        }`}
                        onClick={() => {
                            dispatch(artboard.actions.setEraserWidth(13))
                            dispatch(
                                artboard.actions.setCurrentColor('#ffffff')
                            )
                        }}
                    />
                    <FontAwesomeIcon
                        icon={faEraser}
                        className={`text-md ${
                            artboard.state.eraserWidth === 21
                                ? 'text-neutral-900'
                                : 'text-neutral-400'
                        }`}
                        onClick={() => {
                            dispatch(artboard.actions.setEraserWidth(21))
                            dispatch(
                                artboard.actions.setCurrentColor('#ffffff')
                            )
                        }}
                    />
                    <FontAwesomeIcon
                        icon={faEraser}
                        className={`text-lg ${
                            artboard.state.eraserWidth === 34
                                ? 'text-neutral-900'
                                : 'text-neutral-400'
                        }`}
                        onClick={() => {
                            dispatch(artboard.actions.setEraserWidth(34))
                            dispatch(
                                artboard.actions.setCurrentColor('#ffffff')
                            )
                        }}
                    />
                    <FontAwesomeIcon
                        icon={faEraser}
                        className={`text-xl ${
                            artboard.state.eraserWidth === 55
                                ? 'text-neutral-900'
                                : 'text-neutral-400'
                        }`}
                        onClick={() => {
                            dispatch(artboard.actions.setEraserWidth(55))
                            dispatch(
                                artboard.actions.setCurrentColor('#ffffff')
                            )
                        }}
                    />
                </div>
                <div className='flex flex-wrap landscape:flex-col justify-center items-center gap-2 md:gap-3 lg:gap-4 w-full'>
                    <FontAwesomeIcon
                        icon={faSquare}
                        className={`outline outline-2 outline-offset-2 ${
                            artboard.state.currentColor === '#171717'
                                ? 'outline-neutral-900'
                                : 'outline-transparent'
                        } rounded text-neutral-900`}
                        onClick={e =>
                            dispatch(
                                artboard.actions.setCurrentColor('#171717')
                            )
                        }
                    />
                    <FontAwesomeIcon
                        icon={faSquare}
                        className={`outline outline-2 outline-offset-2 ${
                            artboard.state.currentColor === '#f43f5e'
                                ? 'outline-neutral-900'
                                : 'outline-transparent'
                        } rounded text-rose-500`}
                        onClick={e =>
                            dispatch(
                                artboard.actions.setCurrentColor('#f43f5e')
                            )
                        }
                    />
                    <FontAwesomeIcon
                        icon={faSquare}
                        className={`outline outline-2 outline-offset-2 ${
                            artboard.state.currentColor === '#f59e0b'
                                ? 'outline-neutral-900'
                                : 'outline-transparent'
                        } rounded text-amber-500`}
                        onClick={e =>
                            dispatch(
                                artboard.actions.setCurrentColor('#f59e0b')
                            )
                        }
                    />
                    <FontAwesomeIcon
                        icon={faSquare}
                        className={`outline outline-2 outline-offset-2 ${
                            artboard.state.currentColor === '#eab308'
                                ? 'outline-neutral-900'
                                : 'outline-transparent'
                        } rounded text-yellow-500`}
                        onClick={e =>
                            dispatch(
                                artboard.actions.setCurrentColor('#eab308')
                            )
                        }
                    />
                    <FontAwesomeIcon
                        icon={faSquare}
                        className={`outline outline-2 outline-offset-2 ${
                            artboard.state.currentColor === '#10b981'
                                ? 'outline-neutral-900'
                                : 'outline-transparent'
                        } rounded text-emerald-500`}
                        onClick={e =>
                            dispatch(
                                artboard.actions.setCurrentColor('#10b981')
                            )
                        }
                    />
                    <FontAwesomeIcon
                        icon={faSquare}
                        className={`outline outline-2 outline-offset-2 ${
                            artboard.state.currentColor === '#0ea5e9'
                                ? 'outline-neutral-900'
                                : 'outline-transparent'
                        } rounded text-sky-500`}
                        onClick={e =>
                            dispatch(
                                artboard.actions.setCurrentColor('#0ea5e9')
                            )
                        }
                    />
                    <FontAwesomeIcon
                        icon={faSquare}
                        className={`outline outline-2 outline-offset-2 ${
                            artboard.state.currentColor === '#8b5cf6'
                                ? 'outline-neutral-900'
                                : 'outline-transparent'
                        } rounded text-violet-500`}
                        onClick={e =>
                            dispatch(
                                artboard.actions.setCurrentColor('#8b5cf6')
                            )
                        }
                    />
                    <FontAwesomeIcon
                        icon={faSquare}
                        className={`outline outline-2 outline-offset-2 ${
                            artboard.state.currentColor === '#d946ef'
                                ? 'outline-neutral-900'
                                : 'outline-transparent'
                        } rounded text-fuchsia-500`}
                        onClick={e =>
                            dispatch(
                                artboard.actions.setCurrentColor('#d946ef')
                            )
                        }
                    />
                    <FontAwesomeIcon
                        icon={faSquare}
                        className={`outline outline-2 outline-offset-2 ${
                            artboard.state.currentColor === '#ec4899'
                                ? 'outline-neutral-900'
                                : 'outline-transparent'
                        } rounded text-pink-500`}
                        onClick={e =>
                            dispatch(
                                artboard.actions.setCurrentColor('#ec4899')
                            )
                        }
                    />
                    <FontAwesomeIcon
                        icon={faSquare}
                        className={`outline outline-2 outline-offset-2 ${
                            artboard.state.currentColor === '#ffffff'
                                ? 'outline-neutral-900'
                                : 'outline-transparent'
                        } rounded text-white`}
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
                        className={`text-xs ${
                            artboard.state.lineWidth === 3
                                ? 'text-neutral-900'
                                : 'text-neutral-400'
                        }`}
                        onClick={() =>
                            dispatch(artboard.actions.setLineWidth(3))
                        }
                    />
                    <FontAwesomeIcon
                        icon={faPaintBrush}
                        className={`text-sm ${
                            artboard.state.lineWidth === 5
                                ? 'text-neutral-900'
                                : 'text-neutral-400'
                        }`}
                        onClick={() =>
                            dispatch(artboard.actions.setLineWidth(5))
                        }
                    />
                    <FontAwesomeIcon
                        icon={faPaintBrush}
                        className={`text-md ${
                            artboard.state.lineWidth === 8
                                ? 'text-neutral-900'
                                : 'text-neutral-400'
                        }`}
                        onClick={() =>
                            dispatch(artboard.actions.setLineWidth(8))
                        }
                    />
                    <FontAwesomeIcon
                        icon={faPaintBrush}
                        className={`text-lg ${
                            artboard.state.lineWidth === 13
                                ? 'text-neutral-900'
                                : 'text-neutral-400'
                        }`}
                        onClick={() =>
                            dispatch(artboard.actions.setLineWidth(13))
                        }
                    />
                    <FontAwesomeIcon
                        icon={faPaintBrush}
                        className={`text-xl ${
                            artboard.state.lineWidth === 21
                                ? 'text-neutral-900'
                                : 'text-neutral-400'
                        }`}
                        onClick={() =>
                            dispatch(artboard.actions.setLineWidth(21))
                        }
                    />
                </div>
            </div>
        </Component>
    )
}

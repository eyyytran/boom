import React, { MutableRefObject, ReactElement, useEffect, useRef } from 'react'

import videoSlice from '../store/videoSlice'

import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useDispatch } from 'react-redux'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import Peer from 'simple-peer'

import Component from './Component'
import Video from './Video'
import Container from '../layout/Container'

type Props = {
    className?: string
}

type Styles = {
    static: string
    dynamic?: string
}

const styles = {} as Styles

styles.static = 'shrink-0 w-full h-full p-2 md:p-3 lg:p-4'

export default function Gallery({ className = '' }: Props) {
    const video = {
        state: useSelector((state: RootState) => state.video),
        actions: videoSlice.actions,
    }

    const userVideo = useRef() as any

    const dispatch = useDispatch()

    useEffect(() => {
        const getUserMedia = async () => {
            return await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            })
        }

        const setUserMedia = async () => {
            const userMedia = await getUserMedia()
            userVideo.current.srcObject = userMedia
            dispatch(video.actions.setUserMedia(userMedia))
        }

        setUserMedia()
    }, [])

    styles.dynamic = className

    return (
        <Component id='Gallery'>
            <div className={`${styles.static} ${styles.dynamic}`}>
                <Container>
                    <div className='flex portrait:flex-col justify-center items-center h-full gap-2 md:gap-3 lg:gap-4'>
                        <Video userVideo={userVideo} active={true} />
                        <Video active={false} />
                        <Video active={false} />
                        <Video active={false} />
                    </div>
                </Container>
            </div>
        </Component>
    )
}

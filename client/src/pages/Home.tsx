import React from 'react'
import Component from '../components/Component'
import Titlebar from '../components/Titlebar'
import { Link } from 'react-router-dom'
import { url } from 'inspector'

// import {
//   faRightToBracket,
//   faMessage,
//   faPenToSquare,
//   faTableCellsLarge,
//   faVideo,
//   faCog,
//   faBars,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {}

export default function Home({}: Props) {
    return (
        <Component id='Home'>
            <div
                className='relative h-screen w-screen bg-[length:100vw_50vh] md:bg-cover'
                style={{
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1653376813085-9ce473ec934e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8)',
                }}
            >
                <Titlebar className='shrink-0 w-screen' />
                <div className='absolute inset-0 flex flex-col justify-end items-center w-100% h-100% md:justify-center'>
                    <div className='bg-neutral-100 rounded-t-lg p-8 flex flex-col justify-center items-center h-1/2 max-w-prose md:rounded-lg'>
                        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 text-center mb-4 md:text-2xl'>
                            Welcome to Boom!
                        </h1>
                        <h3 className='text-center leading-tight tracking-tight mb-4 text-gray-900 md:text-xl'>
                            Gather your friends (or your enemies) for a battle of illustrative
                            dominance!
                        </h3>

                        <Link
                            to='/signup'
                            type='submit'
                            className='w-[300px] text-white bg-violet-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-5 m-4 m-4 text-center'
                        >
                            Sign Up for Free
                        </Link>

                        <Link
                            to='/login'
                            type='submit'
                            className='w-[300px] text-white bg-violet-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-5 m-4 text-center'
                        >
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </Component>
    )
}

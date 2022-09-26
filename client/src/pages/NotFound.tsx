import { faFaceGrimace } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import Component from '../components/Component'

type Styles = {
    static: string
}

const styles = {} as Styles

styles.static = 'fixed inset-0 bg-neutral-200'

export default function NotFound() {
    return (
        <Component id='NotFound'>
            <div className={`${styles.static}`}>
                <div className='flex flex-col justify-center h-full'>
                    <FontAwesomeIcon className='text-4xl' icon={faFaceGrimace} />
                    <span className='text-center text-4xl'>404</span>
                    <span className='text-center text-4xl'>Page Not Found</span>
                    <Link to={'/'} className='text-center text-violet-500 underline'>
                        Head back and try to draw within the lines this time.
                    </Link>
                </div>
            </div>
        </Component>
    )
}

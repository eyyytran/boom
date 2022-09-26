import { faFaceGrimace } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
                </div>
            </div>
        </Component>
    )
}

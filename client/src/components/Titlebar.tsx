import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Container from '../layout/Container'
import Component from './Component'

type Props = {
    className?: string
}

type Styles = {
    static: string
    dynamic?: string
}

const styles = {} as Styles

styles.static = 'p-2 md:p-3 lg:p-4 bg-neutral-900'

export default function Titlebar({ className = '' }: Props) {
    styles.dynamic = className

    return (
        <Component id='Titlebar'>
            <div className={`${styles.static} ${styles.dynamic}`}>
                <Container>
                    <div className='flex justify-center items-center gap-2 h-full'>
                        <FontAwesomeIcon icon={faPenToSquare} className='text-xs text-white' />
                        <span className='text-xs text-white font-bold'>Boom</span>
                    </div>
                </Container>
            </div>
        </Component>
    )
}

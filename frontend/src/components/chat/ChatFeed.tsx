// import styles from './ChatFeed.module.css'
import Msg from './Msg'
import { UserProps } from './Msg'
import Emiliano from '../../assets/img/epresa-c.jpg'
import Mauro from '../../assets/img/mpons.jpg'
import Robin from '../../assets/img/rburri.jpg'
import Samuel from '../../assets/img/sbars.jpg'
import Theo from '../../assets/img/tgrivel.jpg'

const US: UserProps[] = [
    {
        id: 1,
        name: 'rburri',
        picture: Robin,
    },
    {
        id: 2,
        name: 'sbars',
        picture: Samuel,
    },
    {
        id: 3,
        name: 'mpons',
        picture: Mauro,
    },
    {
        id: 4,
        name: 'tgrivel',
        picture: Theo,
    },
    {
        id: 5,
        name: 'epresa-c',
        picture: Emiliano,
    },
]

function ChatFeed() {
    return (
        <>
            <Msg user={US[2]} />
            <Msg user={US[0]} />
            <Msg user={US[1]} />
            <Msg user={US[3]} />
            <Msg user={US[4]} />
            {/* <Msg
                id={US[1].id}
                name={US[1].name}
                picture={US[1].picture}
            /> */}
            {/* <Msg /> */}

            {/* <p className={`${styles.me}`}>
                {' '}
                <b>pepi: </b>tu sait comment coder en React?
            </p>
            <p className={`${styles.they}`}>
                {' '}
                <b>cachi: </b> aucune idee
            </p>
            <p className={`${styles.me}`}>
                {' '}
                <b>pepi: </b>c'est dommage
            </p>
            <p className={`${styles.me}`}>
                {' '}
                <b>cachi: </b>mais la vie est belle
            </p>
            <p className={`${styles.me}`}>
                {' '}
                <b>cachi: </b>n'est-ce pas?
            </p>
            <p className={`${styles.they}`}>
                {' '}
                <b>cachi: </b>Pas
            </p>
            <p className={`${styles.they}`}>
                {' '}
                <b>cachi: </b>ta
            </p>
            <p className={`${styles.they}`}>
                {' '}
                <b>cachi: </b>ta
            </p> */}
        </>
    )
}

export default ChatFeed

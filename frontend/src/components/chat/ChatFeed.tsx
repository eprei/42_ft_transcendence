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
        </>
    )
}

export default ChatFeed

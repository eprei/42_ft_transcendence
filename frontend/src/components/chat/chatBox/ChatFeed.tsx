import Msg from './Msg'
import Emiliano from '../../../assets/img/epresa-c.jpg'
import Mauro from '../../../assets/img/mpons.jpg'
import Robin from '../../../assets/img/rburri.jpg'
import Samuel from '../../../assets/img/sbars.jpg'
import Theo from '../../../assets/img/tgrivel.jpg'
import styles from './ChatFeed.module.css'

interface Msg {
    id: number
    name: string
    picture: string
    text: string
}
const MSGS: Msg[] = [
    {
        id: 1,
        name: 'mpons',
        picture: Mauro,
        text: "Est-ce qu'on peut faire la reunion a 15:15?",
    },
    {
        id: 2,
        name: 'rburri',
        picture: Robin,
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    {
        id: 3,
        name: 'sbars',
        picture: Samuel,
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    {
        id: 4,
        name: 'tgrivel',
        picture: Theo,
        text: "d'accord!, ça sera à 15h!",
    },
    {
        id: 5,
        name: 'epresa-c',
        picture: Emiliano,
        text: "c'est noté",
    },
    {
        id: 6,
        name: 'rburri',
        picture: Robin,
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    {
        id: 7,
        name: 'epresa-c',
        picture: Emiliano,
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
]

function ChatFeed() {
    return (
        <div className={styles.container}>
            {MSGS.map((msg) => (
                <Msg key={msg.id} msg={msg}></Msg>
            ))}
        </div>
    )
}

export default ChatFeed

import Msg from './Msg'
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
        picture: 'http://localhost:8080/api/user/picture/user1.webp',
        text: "Est-ce qu'on peut faire la reunion a 15:15?",
    },
    {
        id: 2,
        name: 'rburri',
        picture: 'http://localhost:8080/api/user/picture/user2.webp',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    {
        id: 3,
        name: 'sbars',
        picture: 'http://localhost:8080/api/user/picture/user3.webp',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    {
        id: 4,
        name: 'tgrivel',
        picture: 'http://localhost:8080/api/user/picture/user4.webp',
        text: "d'accord!, ça sera à 15h!",
    },
    {
        id: 5,
        name: 'epresa-c',
        picture: 'http://localhost:8080/api/user/picture/user5.webp',
        text: "c'est noté",
    },
    {
        id: 6,
        name: 'rburri',
        picture: 'http://localhost:8080/api/user/picture/user5.webp',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    {
        id: 7,
        name: 'epresa-c',
        picture: 'http://localhost:8080/api/user/picture/user5.webp',
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

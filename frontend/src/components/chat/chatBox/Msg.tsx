import styles from './Msg.module.css'

export interface UserProps {
    id: number
    name: string
    picture: string
}

const Msg = ({ user }: { user: UserProps }) => {
    let MsgStyle = ''

    if (user.id !== 1) {
        MsgStyle = styles.me
    } else {
        MsgStyle = styles.they
    }

    let MsgText = ''

    switch (user.name) {
        case 'rburri':
            MsgText = 'parfait!'
            break
        case 'sbars':
            MsgText = 'ça marche'
            break
        case 'epresa-c':
            MsgText = `c'est noté`
            break
        case 'tgrivel':
            MsgText = `d'accord!, ça sera à 15h!`
            break
        default:
            MsgText = `Est-ce qu'on peut faire la reunion a 15:15?`
    }

    return (
        <>
            {user.id !== 1 ? (
                <span className={`${styles.msgContainer} ${MsgStyle}`}>
                    <img
                        src={user.picture}
                        alt="Avatar"
                        className={styles.profilePicture}
                    />
                    <p className={`${MsgStyle}`}>
                        <b>{user.name} : </b> {MsgText}
                    </p>
                </span>
            ) : (
                <span className={`${styles.msgContainer} ${MsgStyle}`}>
                    <p className={`${MsgStyle}`}>
                        <b>{user.name} : </b> {MsgText}
                    </p>
                    <img
                        src={user.picture}
                        alt="Avatar"
                        className={styles.profilePicture}
                    />
                </span>
            )}
        </>
    )
}

export default Msg

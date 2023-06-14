import styles from './Msg.module.css'

export interface UserProps {
    id: number
    name: string
    picture: string
}

const Msg: React.FC<{ user: UserProps }> = ({ user }) => {
  
	let MsgStyle = ''

    if (user.id !== 1) {
        MsgStyle = styles.they
    } else {
        MsgStyle = styles.me
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
            <span className={styles.msgContainer}>
                <img
                    src={user.picture}
                    alt="Avatar"
                    className={styles.profilePicture}
                />
                <p className={`${MsgStyle}`}>
                    <b>{user.name} : </b> {MsgText}
                </p>
            </span>
        </>
    )
}

export default Msg


// function Msg() {
// const Msg: React.FC< UserProps> = (u: UserProps ) => {
// const Msg: React.FC< UserProps> = (u: UserProps ) => {
// const getTextPos = () => {
//     if (id !== 3) {
//         return "textAlign: 'right'"
//     } else {
//         return "textAlign: 'left'"
//     }
// }
// // return 'text-align: right, var(--color-purple)'
// return 'text-align: left, var(--color-mid-green)'

import { MatchList } from '../components/history/MatchList'
import { useAppSelector } from '../store/types'
import { UserData } from '../types/UserData'

const MatchHistory = () => {
    const userData: UserData = useAppSelector(
        (state) => state.user.userData
    ) as UserData

    return <MatchList userData={userData}  isInUserLambda={false} />
}

export default MatchHistory

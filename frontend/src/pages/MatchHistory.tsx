import { MatchList } from "../components/history/MatchList"

const MatchHistory = () => {

    return (
        <div>
            <h1 style={{
                textAlign: "center", 
                marginBottom: "1rem"
                }}>Match History</h1>
            <MatchList />
        </div>
    )
}

export default MatchHistory

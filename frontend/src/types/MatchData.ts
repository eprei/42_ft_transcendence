import { UserData } from "./UserData"

export interface MatchData {
    user: {
        userHome: UserData
        userForeign: UserData
        winner: UserData
        homeScore: number
        foreignScore: number
        timestamp: Date
    }
}

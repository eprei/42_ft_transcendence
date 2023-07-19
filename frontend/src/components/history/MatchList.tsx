import { MatchItem } from "./MatchItem";

const MatchList = ({ matchHistory }) => {
    return (
        <ul>
            {matchHistory.map((match) => (
                <MatchItem key={match.id} match={match} />
            ))}
        </ul>
    );
};

export { MatchList };
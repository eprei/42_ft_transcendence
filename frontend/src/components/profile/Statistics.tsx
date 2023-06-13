import styles from './Statistics.module.css'
import StatisticElement from './StatisticElement'
import IconVictoire from '../../assets/icon/victoires.svg'
import IconDefeat from '../../assets/icon/defeats.svg'
import IconRanking from '../../assets/icon/ranking.svg'

const Statistics = () => {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.subtitle}>Statistics</div>
                <div className={styles.horizontalList}>
                    <StatisticElement
                        icon={IconVictoire}
                        text="Victorires"
                        number={42}
                    />
                    <StatisticElement
                        icon={IconDefeat}
                        text="Defeats"
                        number={0}
                    />
                    <StatisticElement
                        icon={IconRanking}
                        text="Ranking"
                        number={1}
                    />
                </div>
            </div>
        </div>
    )
}

export default Statistics

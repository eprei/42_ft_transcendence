import styles from './Statistics.module.css'

const Statistics = () => {
    return (
        <div>
            <div className={styles.subtitle}>STATISTIC</div> 
            <ul className={styles.horizontalList}>
                <li>Victoires</li>
                <li>Defeats</li>
                <li>Ranking</li>
            </ul>
        </div>
    )
}

export default Statistics

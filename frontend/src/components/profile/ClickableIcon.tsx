import React from 'react'
import styles from './ClickableIcon.module.css'

interface ClickableIconProps {
    icon: string
    onClick?: () => void
}

const ClickableIcon: React.FC<ClickableIconProps> = ({ icon, onClick }) => {
    const handleIconClick = () => {
        if (onClick) {
            onClick()
        }
    }

    return (
        <span className={styles.btn} onClick={handleIconClick}>
            <img src={icon} alt="Icon" />
        </span>
    )
}

export default ClickableIcon

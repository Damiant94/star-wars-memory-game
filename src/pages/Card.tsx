import React, { createRef } from 'react';
import styles from '../styles/Card.module.scss';

function Card(props: { icon: string, clicked: (card: HTMLDivElement | null) => void}) {
    const card: React.RefObject<HTMLDivElement> = createRef();

    return (
        <div 
            className={styles.Card}
            ref={card}
            data-icon={props.icon}
            onClick={() => props.clicked(card.current)}>
            <div className={styles.inner}>
                <div className={styles.front}>
                    <img src={'/icons/' + props.icon} alt="front icon"/>
                </div>
                <div className={styles.back}>
                    <img src={'/icons/empire.svg'} alt="back icon"/>
                </div>
            </div>
        </div>
    )
  }

export default Card;
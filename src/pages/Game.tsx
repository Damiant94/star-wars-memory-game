import React, { useEffect, useState } from 'react';
import stylesGame from '../styles/Game.module.scss';

import Card from './Card';
import stylesCard from '../styles/Card.module.scss';

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
let shuffle = (a: string[]) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

let icons = [
    "atat.png",
    "babyyoda.png",
    "boba.png",
    "c3po.png",
    "darthmaul.png",
    "deathstar.png",
    // "jango.png",
    "kenobi.png",
    "maul.png",
    "millenium.png",
    "quigon.png",
    "r2d2.png",
    "tie.png",
    "trooper.png",
    "vader.png",
    "yoda.png"
];

icons = icons.concat(icons);
shuffle(icons);

function Game() {
    const [remaining, setRemaining] = useState(icons.length / 2);
    const [isFirstClick, setIsFirstClick] = useState(true);
    const [currentCard, setCurrentCard] = useState<HTMLDivElement | null>(null);
    const [clickedCard, setClickedCard] = useState<HTMLDivElement | null>(null);
    const [movesCounter, setMovesCounter] = useState(0);

    useEffect(
        () => {
            if (clickedCard) {
                makeCardVisible(clickedCard);

                if (isFirstClick) {
                    setCurrentCard(clickedCard);
                } else {
                    if (isClickedCardsMatch()) {
                        changeCardsPointerEvents('disable');
                        setTimeout(() => {
                            makeCardHidden(clickedCard);
                            makeCardHidden(currentCard);
                            changeCardsPointerEvents('enable');
                        }, 1000);
                    } else {
                        setRemaining(prevState => prevState - 1);
                    }
                    setMovesCounter((prevState) => prevState + 1)
                }

                setIsFirstClick(prevState => !prevState)
                setClickedCard(null);
            }
        },
        [clickedCard]
    )

    const changeCardsPointerEvents = (action: 'disable' | 'enable') => {
        const cards = document.querySelectorAll(`.${stylesCard.Card}`);
        const value = action === 'disable' ? "none" : "";
        for (const card of cards) {
            (card as HTMLElement).style.pointerEvents = value;
        }
    }

    const isClickedCardsMatch = () => {
        return clickedCard?.dataset.icon !== currentCard?.dataset.icon;
    }

    const makeCardVisible = (card: HTMLDivElement | null) => {
        card?.classList.add(stylesCard.visible);
    }

    const makeCardHidden = (card: HTMLDivElement | null) => {
        card?.classList.remove(stylesCard.visible);
    }

    const cardClickHandler = (card: HTMLDivElement | null) => {
        setClickedCard(card);
        if (!isFirstClick) {
            setTimeout(() => {
                setClickedCard(null);
            }, 1000)
        }
    }

    const startNewGame = () => {
        const cards: NodeListOf<HTMLDivElement> = document.querySelectorAll(`.${stylesCard.Card}`);
        for (const card of cards) {
            makeCardHidden(card);
        }
        setTimeout(() => {
            shuffle(icons);
            setRemaining(icons.length / 2);
            setIsFirstClick(true);
            setCurrentCard(null);
            setClickedCard(null);
            setMovesCounter(0);
        }, 200);
    }

    const cards = icons.map((icon, index) => {
        return (
            <Card 
                icon={icon} 
                key={index}
                clicked={cardClickHandler}/>
        );
    });

    return (
        <div className={stylesGame.Game}>
            <h1>STAR WARS</h1>
            <h2>MEMORY GAME</h2>
            <div className={stylesGame.cardsWrapper}>
                {remaining === 0 ? <div className={stylesGame.winInfo}>YOU WIN</div> : cards}
            </div>
            <div className={stylesGame.movesCounter}>MOVES COUNTER: {movesCounter}</div>
            <button onClick={startNewGame} className={stylesGame.newGameBtn}>RESTART</button>
        </div>
    )
  }

export default Game;
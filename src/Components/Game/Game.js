import React, { Component } from 'react';
import classes from './Game.module.scss';

import Card from '../Card/Card';
import classesCard from '../Card/Card.module.scss';

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

let icons = [
    "boba.png",
    "vader.png",
    "kenobi.png",
    "r2d2.png"
];

icons = icons.concat(icons);
shuffle(icons);

class Game extends Component {

    state = {
        remaining: icons.length / 2,
        clickedOnce: false,
        currentCard: null,
        win: false
    };

    cardClickHandler = (card) => {
        this.setState((prevState) => {
            return (
                { clickedOnce: !prevState.clickedOnce }
            )
        }, () => {
            if (this.state.clickedOnce) {
                card.classList.add(classesCard.visible);
                this.setState({currentCard: card});
            } else {
                card.classList.add(classesCard.visible);
                if (card.dataset.icon !== this.state.currentCard.dataset.icon) {
                    const cards = document.querySelectorAll(`.${classesCard.Card}`);
                    for (const card of cards) {
                        card.style.pointerEvents = "none";
                    }
                    setTimeout(() => {
                        card.classList.remove(classesCard.visible);
                        this.state.currentCard.classList.remove(classesCard.visible);
                        const cards = document.querySelectorAll(`.${classesCard.Card}`);
                        for (const card of cards) {
                            card.style.pointerEvents = "";
                        }
                    }, 1000);
                } else {
                    this.setState((prevState) => {
                        return (
                            {
                                remaining: prevState.remaining - 1
                            }
                        )
                    });
                }
            }
        });
    };

    startNewGame = () => {
        shuffle(icons);
        const activeCards = document.querySelectorAll(`.${classesCard.visible}`)
        for (const card of activeCards) {
            card.classList.remove(classesCard.visible);
        }
    };

    render() {
        console.log(this.state.remaining);
        const cards = icons.map((icon, index) => {
            return (
                <Card 
                icon={icon} 
                key={index}
                clicked={this.cardClickHandler}/>
            );
        });

        return(
            <div className={classes.Game}>
                {cards}
                <button onClick={this.startNewGame}>New Game</button>
                {this.state.remaining === 0 ? <div>WIN</div> : null}
            </div>
        );
    }
}

export default Game;
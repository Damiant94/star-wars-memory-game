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
        remaining: icons.length,
        clickedOnce: false,
        currentCard: null
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
                    setTimeout(() => {
                        card.classList.remove(classesCard.visible);
                        this.state.currentCard.classList.remove(classesCard.visible);
                    }, 1000);
                }
            }
        });

    };

    render() {
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
            </div>
        );
    }
}

export default Game;
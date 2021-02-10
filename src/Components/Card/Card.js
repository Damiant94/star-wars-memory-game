import React, { Component, createRef } from 'react';
import classes from './Card.module.scss';

class Card extends Component {
    constructor(props) {
        super(props);
        this.card = createRef();
    }
    render() {
        return (
            <div 
                className={classes.Card}
                ref={this.card}
                data-icon={this.props.icon}
                onClick={() => this.props.clicked(this.card.current)}>
                <div className={classes.inner}>
                    <div className={classes.front}>
                        <img src={'icons/' + this.props.icon} alt="front icon"/>
                    </div>
                    <div className={classes.back}>
                        <img src={'icons/empire.svg'} alt="back icon"/>
                    </div>
                </div>
            </div>
        );
    }
};

export default Card;
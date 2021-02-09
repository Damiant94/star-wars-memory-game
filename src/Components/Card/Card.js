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
                data-icon={this.props.icon} 
                ref={this.card}
                onClick={() => this.props.clicked(this.card.current)}>
                <img src={'icons/' + this.props.icon}/>
            </div>
        );
    }
};

export default Card;
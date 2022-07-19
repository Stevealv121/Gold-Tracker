import React from "react";
import "./cards.css";
import visa from "../../assets/img/visa.png"
import { useState, useEffect } from 'react';
import CardsDataService from "../../services/cards.js"
const Cards = props => {

    const initalCardsState = [];
    const [cards, setCards] = useState(initalCardsState);

    const getCards = user => {
        CardsDataService.getCards(user)
            .then(response => {
                setCards(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getCards(props.user);
    }, [props.user]);


    return (
        <>
            <br />
            <h2>Credit cards</h2>
            <br /><br />
            <div className="row mb-3">
                <div className="col-4">
                    {cards.map((cardData, key) => (
                        <div className="wrapper-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4>{cardData.name}</h4>
                                    <h5>{cardData.balance}</h5>
                                    <img id="typeImg" src={visa} alt="type" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Cards
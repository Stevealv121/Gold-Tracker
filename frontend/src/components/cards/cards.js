import React from "react";
import "./cards.css";
import { useState, useEffect } from 'react';
import CardsDataService from "../../services/cards.js"
import { useNavigate } from "react-router-dom";

const Cards = props => {

    let navigate = useNavigate();
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
    });

    const selectCard = async (e, card) => {
        e.preventDefault();
        props.select(card);
        navigate("/card/edit");
    }

    const addCard = async (e) => {
        //e.preventDefault();
        navigate("/card/new")
    }


    return (
        <>
            <br />
            <h2>Credit cards</h2>
            <br /><br />
            <div className="row mb-3">
                <div className="col-4">
                    {cards.map((cardData, key) => (
                        <div className="wrapper-card">
                            <div key={key} className="card" onClick={(e) => selectCard(e, cardData)}>
                                <div className="card-body">
                                    <h4>{cardData.name}</h4>
                                    <h5>{cardData.balance}</h5>
                                    <img id="typeImg" src={require(`../../assets/img/${cardData.type}.png`)} alt="type" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <br />
            <button className="btn btn-success" onClick={addCard}>Add Card</button>
            <br />
            <br />
        </>
    )
}

export default Cards
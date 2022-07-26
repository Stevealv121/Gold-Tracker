import React from "react";
import { useState, useEffect } from 'react';
import CardsDataService from "../../../services/cards.js"
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../../assets/icons/trash.svg"

const DeleteCards = props => {

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

    const deleteCard = async (e, card) => {
        //e.preventDefault();
        CardsDataService.deleteCard(card._id)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        navigate("../../cards")
    }

    useEffect(() => {
        getCards(props.user);
    });

    const toCards = async (e) => {
        //e.preventDefault();
        navigate("../../cards")
    }

    return (
        <>
            <br />
            <h2>Please choose the card you want to delete</h2>
            <br /><br />
            <div className="row mb-3">
                <div className="col-4">
                    {cards.map((cardData, key) => (
                        <div className="wrapper-card">
                            <div key={key} className="card" onClick={(e) => deleteCard(e, cardData)}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col"><h4>{cardData.name}</h4></div>
                                    </div>
                                    <div className="row">
                                        <div className="col"><h5>{cardData.balance}</h5></div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <img id="typeImg" src={require(`../../../assets/img/${cardData.type}.png`)} alt="type" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <br />
            <button className="btn btn-secondary" onClick={toCards}>Go back</button>
            <br />
            <br />
        </>
    )

}

export default DeleteCards;
import React from "react";
import "./cards.css";
import { useState, useEffect } from 'react';
import CardsDataService from "../../services/cards.js"
import { useNavigate } from "react-router-dom";
import editIcon from "../../assets/icons/pencil-square.svg"
import deleteIcon from "../../assets/icons/trash.svg"
import PrettyNumber from "../../models/prettyNumber";

const Cards = props => {

    let navigate = useNavigate();
    const initalCardsState = [];
    const [cards, setCards] = useState(initalCardsState);

    const getCards = user => {
        CardsDataService.getCards(user)
            .then(response => {
                let formatted = response.data;
                formatted.forEach(element => {
                    let number = new PrettyNumber(element.balance);
                    element.balance = number.number;
                });
                setCards(formatted);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getCards(props.user);
    }, [props.user, cards]);

    const selectCard = async (e, card) => {
        e.preventDefault();
        props.select(card);
        navigate("/card/edit");
    }

    const addCard = async (e) => {
        //e.preventDefault();
        navigate("/card/new")
    }

    const deleteCard = async (e) => {
        //e.preventDefault();
        navigate("/cards/delete")
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
                            <div id="card" key={key} className="card" onClick={(e) => selectCard(e, cardData)}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col"><h4>{cardData.name}</h4></div>
                                    </div>
                                    <div className="row">
                                        <div className="col"><h5>{cardData.balance} CRC</h5></div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <img id="typeImg" src={require(`../../assets/img/${cardData.type}.png`)} alt="type" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <br />
            <button className="btn btn-success" onClick={addCard}>Add Card</button>
            <button className="btn btn-danger" onClick={deleteCard}>Delete Card</button>
            <br />
            <br />
        </>
    )
}

export default Cards
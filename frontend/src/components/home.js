import React from "react";
import { useState, useEffect } from 'react';
import AccountDataService from "../services/accounts";
import balanceIcon from "../assets/icons/money.png"
import cardsIcon from "../assets/icons/credit_cards.png"
import pantryIcon from "../assets/icons/pantry.png"
import { useNavigate } from "react-router-dom";

const Home = props => {

    const initialAccountState = {
        id: null,
        balance: 0,
        user: ""
    }
    let navigate = useNavigate();

    const toDelete = async (e) => {
        navigate("/deleteFromPantry");
    }


    const [account, setAccount] = useState(initialAccountState);

    const getAccount = user => {
        AccountDataService.getAccount(user)
            .then(response => {
                setAccount(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };


    useEffect(() => {
        getAccount(props.user);
    }, [props.user, account]);

    return (
        <div className="main">
            {account ? (
                <div className="Home">
                    <h2>Hello {props.user}!</h2>
                    <br /><br />
                    <div id="card" className="card" onClick={e => { navigate("/account") }}>
                        <div className="card-body">
                            <h4>Account Balance</h4>
                            <div className="row">
                                <div className="col">
                                    <img id="iconBig" src={balanceIcon} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div id="card" className="card" onClick={e => { navigate("/cards") }}>
                        <div className="card-body">
                            <h4>Credit Cards</h4>
                            <div className="row">
                                <div className="col">
                                    <img id="iconBig" src={cardsIcon} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div id="card" className="card" onClick={e => { navigate("/pantry") }}>
                        <div className="card-body">
                            <h4>Pantry</h4>
                            <div className="row">
                                <div className="col">
                                    <img id="iconBig" src={pantryIcon} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            ) : (
                <div className="no">
                    <br />
                    <p>No account selected.</p>
                </div>
            )}

        </div>
    );
}

export default Home;
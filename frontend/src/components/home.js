import React from "react";
import { useRef, useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import AccountDataService from "../services/accounts";

const Home = props => {

    const initialAccountState = {
        id: null,
        balance: "",
        user: ""
    }

    const [account, setAccount] = useState(initialAccountState);

    const getAccount = id => {
        AccountDataService.get(id)
            .then(response => {
                setAccount(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getAccount(props.match.params.id);
    }, [props.match.params.id]);

    return (
        <div className="main">
            {account ? (
                <div className="Home">
                    <h2>Alpha View</h2>
                    <br /><br />
                    <div className="card">
                        <div className="card-body">
                            <h4>Account Balance: {account.balance}</h4>
                            <br />
                            <form class="row g-3">
                                <label htmlFor="add">Add to account</label>
                                <input type="number" id="add" />
                                <button className="btn btn-success">+</button>
                            </form>
                            <br />
                            <form class="row g-3">
                                <label htmlFor="remove">Remove from account</label>
                                <input type="number" id="remove" />
                                <button className="btn btn-danger">-</button>
                            </form>
                        </div>
                    </div>
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
import React from "react";
import { useRef, useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import AccountDataService from "../services/accounts";
import { useParams } from "react-router-dom";

const Home = props => {

    const initialAccountState = {
        id: null,
        balance: 0,
        user: ""
    }

    const [new_balance, setBalance] = useState(0);
    const [remove_balance, setRemoveBalance] = useState(0);
    let n_balance = 0;

    let { id } = useParams();

    const [account, setAccount] = useState(initialAccountState);

    const getAccount = user => {
        AccountDataService.getAccount(user)
            .then(response => {
                setAccount(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleUpdateBalance = async (e) => {
        e.preventDefault();

        try {
            const data = { user: account.user, balance: n_balance };
            AccountDataService.updateBalance(data).catch(e => {
                console.log(e);
            });
            setAccount({ id: account.id, balance: n_balance, user: account.user });

        } catch (error) {
            if (!error?.response) {
                console.log('No Server Response');
            } else {
                console.log('Update Balance failed');
            }
        }
    }

    const removeGold = async (e) => {
        e.preventDefault();
        var result = 0;
        const actual_balance = account.balance;
        result = actual_balance - remove_balance;
        n_balance = result;
        handleUpdateBalance(e);
    }

    const addGold = async (e) => {
        e.preventDefault();
        var result = 0;
        const actual_balance = account.balance;
        result = actual_balance + new_balance;
        n_balance = result;
        handleUpdateBalance(e);
    }

    useEffect(() => {
        getAccount(props.user);
    }, [props.user]);

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
                            <form onSubmit={addGold} class="row g-3">
                                <label htmlFor="add">Add to account</label>
                                <input type="number" id="add" onChange={(e) => setBalance(+e.target.value)}
                                />
                                <button type="submit" className="btn btn-success">+</button>
                            </form>
                            <br />
                            <form onSubmit={removeGold} class="row g-3">
                                <label htmlFor="remove">Remove from account</label>
                                <input type="number" id="remove" onChange={(e) => setRemoveBalance(+e.target.value)}
                                />
                                <button type="submit" className="btn btn-danger">-</button>
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
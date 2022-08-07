import React from "react";
import { useState, useEffect } from 'react';
import AccountDataService from "../../services/accounts";
import CashFlowDataService from "../../services/cashflow";
import incomeIcon from "../../assets/cashflow/income.png"
import expensesIcon from "../../assets/cashflow/expenses.png"
import assetsIcon from "../../assets/cashflow/assets.png"
import liabilitiesIcon from "../../assets/cashflow/liabilities.png"
import { useNavigate } from "react-router-dom";
import PrettyNumber from "../../models/prettyNumber";

const FinancialStatement = props => {

    const initialAccountState = {
        id: null,
        balance: 0,
        user: ""
    }

    let navigate = useNavigate();

    const [account, setAccount] = useState(initialAccountState);
    const [total_income, setTotalIncome] = useState(0);
    const [total_expenses, setTotalExpenses] = useState(0);
    const [payday, setPayday] = useState(0);

    const getTotalIncome = () => {
        CashFlowDataService.getCashflow("total_income", props.user)
            .then(response => {
                const total_income = response.data[0].amount;
                setTotalIncome(total_income);
            }
            )
            .catch(e => {
                console.log(e);
            }
            )
    }

    const getTotalExpenses = () => {
        CashFlowDataService.getCashflow("total_expenses", props.user)

            .then(response => {
                const total_expenses = response.data[0].amount;
                setTotalExpenses(total_expenses);
            }
            )
            .catch(e => {
                console.log(e);
            }
            )
    }

    const getPayday = () => {
        const payday = total_income - total_expenses;
        setPayday(payday);
    }

    const getAccount = user => {
        AccountDataService.getAccount(user)
            .then(response => {
                setAccount(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const navigateToEdit = (type) => {
        props.select(type);
        navigate("/cashflow/edit");
    }


    useEffect(() => {
        getAccount(props.user);
        getTotalIncome();
        getTotalExpenses();
        getPayday();
    }, [props.user, account]);

    return (
        <div className="main">
            {account ? (
                <div className="Home">
                    <br />
                    <h1>Financial Statement</h1>
                    <br /><br />
                    <div className="card" >
                        <div className="card-body">
                            <div className="row">
                                <div className="col"><h4>Cash:</h4></div>
                                <div className="col"><h4>{account.balance} CRC</h4></div>
                            </div>
                            <div className="row">
                                <div className="col"><h4>Total Income:</h4></div>
                                <div className="col"><h4>{total_income} CRC</h4></div>
                            </div>
                            <div className="row">
                                <div className="col"><h4>Total Expenses</h4></div>
                                <div className="col"><h4>{total_expenses} CRC</h4></div>
                            </div>
                            <div className="row">
                                <div className="col"><h4>Payday</h4></div>
                                <div className="col"><h4>{payday} CRC</h4></div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div id="card" className="card" onClick={e => navigateToEdit("income")}>
                        <div className="card-body">
                            <h4>Income</h4>
                            <div className="row">
                                <div className="col">
                                    <img id="iconBig" src={incomeIcon} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div id="card" className="card" onClick={e => navigateToEdit("expenses")}>
                        <div className="card-body">
                            <h4>Expenses</h4>
                            <div className="row">
                                <div className="col">
                                    <img id="iconBig" src={expensesIcon} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div id="card" className="card" onClick={e => navigateToEdit("assets")}>
                        <div className="card-body">
                            <h4>Assets</h4>
                            <div className="row">
                                <div className="col">
                                    <img id="iconBig" src={assetsIcon} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div id="card" className="card" onClick={e => navigateToEdit("liabilities")}>
                        <div className="card-body">
                            <h4>Liabilities</h4>
                            <div className="row">
                                <div className="col">
                                    <img id="iconBig" src={liabilitiesIcon} alt="" />
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

export default FinancialStatement;
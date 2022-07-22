import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpensesDataService from "../../services/expenses.js";

const AddExpense = props => {
    //const initialOptionsState = { value: "Choose your type of card" };
    // const [optionsState, setOption] = useState(initialOptionsState);

    const [description, setDescription] = useState("");
    const [cost, setCost] = useState(0);
    const [date, setDate] = useState("");
    const [type, setType] = useState("text")
    //const [owner, setOwner] = useState("");
    let user = "";
    let card_id = "";

    let navigate = useNavigate();

    // const handleChange = async (e) => {
    //     e.preventDefault();
    //     setOption({ value: e.target.value });
    //     setDate(e.target.value);
    // }

    const handleSubmit = async (e) => {
        user = props.user;
        card_id = props.card._id;
        let new_expense = {
            description: description,
            cost: cost,
            date: date,
            user: user,
            card_id: card_id
        }
        ExpensesDataService.postExpense(JSON.stringify(new_expense)).then(res => {
            console.log(res);
        });
        navigate("../card/edit");
    }

    const handleFocus = async => {
        setType("date")
    }

    return (
        <>
            <h2>Add Expense</h2>
            <br /><br />
            <form onSubmit={handleSubmit}>
                <input className="form-control" type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                <br />
                <input className="form-control" type="number" placeholder="Cost" onChange={(e) => setCost(+e.target.value)} />
                <br />
                <input type={type} placeholder="Date" onFocus={handleFocus} onChange={(e) => setDate(e.target.value)} />
                <br />
                <br />
                <button type="submit" className="btn btn-success">Add Expense</button>
            </form>
            <br />
            <br />
        </>
    )
}

export default AddExpense;
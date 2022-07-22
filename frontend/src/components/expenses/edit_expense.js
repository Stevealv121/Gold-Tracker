import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExpensesDataService from "../../services/expenses.js";
import "./edit_expense.css"

const EditExpense = props => {

    const [showResults, setShowResults] = React.useState(false)
    const [showCost, setShowCost] = React.useState(false)
    const [showDate, setShowDate] = React.useState(false)
    const [description, setDescription] = useState(props.expense.description);
    const [cost, setCost] = useState(props.expense.cost);
    const [date, setDate] = useState(props.expense.date);

    let user = "";
    let card_id = "";
    let expense_id = "";

    const initialExpenseState = {
        description: "",
        cost: 0,
        date: "",
        user: user,
        card_id: card_id
    }
    const [expense, setExpense] = useState(initialExpenseState);


    let navigate = useNavigate();

    const onClick = () => {
        setShowResults(true)
    }

    const onClickCost = () => {
        setShowCost(true)
    }

    const onClickDate = () => {
        setShowDate(true)
    }

    useEffect(() => {
        setExpense(props.expense)
    }, [props.expense])

    const saveChanges = async (e) => {
        user = props.user;
        card_id = props.expense.card_id;
        expense_id = props.expense._id;
        let edit_expense = {
            id: expense_id,
            description: description,
            cost: cost,
            date: date,
            user: user,
            card_id: card_id
        }
        console.log(edit_expense);
        ExpensesDataService.editExpense(JSON.stringify(edit_expense)).then(res => {
            console.log(res);
        });
        navigate("../card/edit");
    }

    const deleteExpense = async (e) => {
        ExpensesDataService.deleteExpense(props.expense._id).then(res =>
            console.log(res));
        navigate("../card/edit");
    }

    const goBack = async (e) => {
        navigate("../card/edit");
    }

    return (
        <>
            <h2>Edit expense</h2>
            <br />
            <div className="row" onClick={onClick}>
                <div className="col-4">Description</div>
                <div className="col">
                    {showResults ? <input type="text" id="description_inp" onChange={(e) => setDescription(e.target.value)} placeholder={expense.description} />
                        : <p id="description_p">{expense.description}</p>}
                </div>
            </div>
            <div className="row" onClick={onClickCost}>
                <div className="col-4">Cost</div>
                <div className="col">
                    {showCost ? <input type="number" id="cost_inp" onChange={(e) => setCost(+e.target.value)} placeholder={expense.cost} />
                        : <p id="cost_p">{expense.cost}</p>}</div>
            </div>
            <div className="row" onClick={onClickDate}>
                <div className="col-4">Date</div>
                <div className="col">
                    {showDate ? <input type="date" id="date_inp" onChange={(e) => setDate(e.target.value)} placeholder={expense.date} />
                        : <p id="date_p">{expense.date}</p>}
                </div>
            </div>
            <br /><br />
            <button className="btn btn-danger" onClick={deleteExpense}>Delete Expense</button>
            <button className="btn btn-success" onClick={saveChanges}>Save Changes</button>
            <button className="btn btn-secondary" onClick={goBack}>Cancel</button>
        </>
    )
}

export default EditExpense;
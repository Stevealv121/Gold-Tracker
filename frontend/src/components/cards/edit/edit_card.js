import { useEffect, useState } from "react";
import "./edit_card.css";
import ExpensesDataService from "../../../services/expenses.js"
import { useNavigate } from "react-router-dom";


const EditCard = props => {

    let navigate = useNavigate();

    const initialCardState = {
        name: "",
        type: "visa",
        owner: "",
        balance: 0,
        _id: ""
    }

    const initalExpensesState = [];

    const [card, setCard] = useState(initialCardState);
    const [expenses, setExpenses] = useState(initalExpensesState);

    const getCard = card => {
        setCard(card);
    }
    const getExpenses = card_id => {
        ExpensesDataService.getExpenses(card_id)
            .then(response => {
                setExpenses(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getCard(props.card);
        getExpenses(card._id);
        console.log(card._id)
    })

    const addExpense = async (e) => {
        navigate("../../expense_add");
    }

    const selectExpense = async (e, expense) => {
        e.preventDefault();
        props.select(expense);
        navigate("../../expense_edit");
    }

    return (
        <>
            <br />
            <h2>{card.name}</h2>
            <br />
            <h4>Card Balance: {card.balance}</h4>
            <img id="typeImg" src={require(`../../../assets/img/${card.type}.png`)} alt="type" />
            <br /><br />
            <h5>Expenses</h5>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Description</th>
                        <th scope="col">Cost</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, key) => (
                        <tr id="table_row" key={key + 1} onClick={(e) => selectExpense(e, expense)}>
                            <th>{key + 1}</th>
                            <td>{expense.description}</td>
                            <td>{expense.cost}</td>
                            <td>{expense.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <button className="btn btn-primary" onClick={addExpense}>Add expense</button>
            <br />
        </>
    )
}

export default EditCard
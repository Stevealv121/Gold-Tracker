import { useEffect, useState } from "react";
import "./edit_card.css";
import ExpensesDataService from "../../../services/expenses.js"
import CardsDataService from "../../../services/cards.js"
import { useNavigate } from "react-router-dom";
import editIcon from "../../../assets/icons/pencil-square.svg"
import saveIcon from "../../../assets/icons/save.svg"
import dateIcon from "../../../assets/icons/calendar.svg"
import React from "react";
import PrettyNumber from "../../../models/prettyNumber.js";


const EditCard = props => {

    let navigate = useNavigate();
    const [showEditName, setShowEditName] = React.useState(false)
    const [showMonthEdit, setShowMonthEdit] = React.useState(false)
    const [icon, setIcon] = useState(editIcon);
    const [date, setDate] = useState(dateIcon);
    const [card_name, setCardName] = useState("");
    const cardNameRef = React.createRef();
    const [total, makeTotal] = useState("0.00");
    const [selectedMonth, setSelectedMonth] = useState("No Month Selected");

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

    function getActualDate() {
        let now = new Date();
        console.log("today is: " + now)
        return now;
    }

    const getExpenses = (card_id, month) => {

        let today = getActualDate();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        let since = yyyy + "-" + mm;
        let to = yyyy + "-" + mm + "-" + dd;
        let months = ['January', 'February', 'March'
            , 'April', 'May', 'June', 'July', 'August', 'September',
            'October', 'November', 'December'];

        if (month === "No Month Selected") {

            let curMonth = months[today.getMonth()];
            setSelectedMonth(curMonth);
        } else {

            let monthsNumbers = ["01", "02", "03", "04",
                "05", "06", "07", "08", "09", "10", "11", "12"];
            let monthNumber = "";
            for (let index = 0; index < months.length; index++) {
                if (selectedMonth === months[index]) {
                    monthNumber = monthsNumbers[index];
                }
            }
            let lastDayOfMonth = new Date(+yyyy, +monthNumber, 0);
            var finalDay = String(lastDayOfMonth.getDate()).padStart(2, '0');
            since = yyyy + "-" + monthNumber;
            to = yyyy + "-" + monthNumber + "-" + finalDay;
        }

        ExpensesDataService.getExpensesByMonth(card_id, since, to)
            .then(response => {
                // let formattedExpenses = response.data;
                // formattedExpenses.forEach(expense => {
                //     let formattedCost = new PrettyNumber(expense.cost);
                //     expense.cost = formattedCost.number;
                // });
                // setExpenses(formattedExpenses);
                setExpenses(response.data);
                setTotal();
                //console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getCard(props.card);
        getExpenses(card._id, selectedMonth);
        //console.log(card._id)
    }, [props.card, card._id, selectedMonth])

    // useEffect(() => {
    //     getExpenses(card._id, selectedMonth);
    // }, [])



    const addExpense = async (e) => {
        navigate("../../expense_add");
    }

    const selectExpense = async (e, expense) => {
        e.preventDefault();
        props.select(expense);
        navigate("../../expense_edit");
    }

    const setSaveIcon = async () => {
        if (icon === editIcon) {
            //console.log("hello?")
            setShowEditName(true);
            setIcon(saveIcon);
        } else if (icon === saveIcon) {
            editCardName();
            //window.location.reload(false);
            setShowEditName(false);
            setIcon(editIcon);
        }

    }

    const setDateIcon = async () => {
        if (date === dateIcon) {
            setShowMonthEdit(true);
            setDate(saveIcon);
        } else if (date === saveIcon) {
            setDate(dateIcon);
            setShowMonthEdit(false);
            //console.log("DataMonth: "+ selectedMonth)
        }
    }

    const editCardName = async () => {
        let card_edited = {
            id: card._id,
            name: card_name,
            balance: card.balance,
            owner: card.owner,
            type: card.type
        }
        CardsDataService.editCard(JSON.stringify(card_edited))
            .then(res => console.log(res))
            .catch(e => {
                console.log(e);
            })
        //setCard(card_edited);
        props.set(card_edited);
    }

    function setTotal() {
        let count = 0;
        for (let index = 0; index < expenses.length; index++) {
            count = count + expenses[index].cost;
        }
        let formattedCount = new PrettyNumber(count);
        console.log(formattedCount);
        makeTotal(formattedCount.number);
        //console.log("total: " + total);
    }

    const handleSelectedMonth = async (unformattedDate) => {
        let monthArray = unformattedDate.split("-");
        let monthNumber = +monthArray[1] - 1;
        //console.log("🚀 ~ file: edit_card.js ~ line 138 ~ handleSelectedMonth ~ monthNumber", monthNumber)
        let monthNames = ["January", "February", "March", "April", "May"
            , "June", "July", "August", "September", "October", "November", "December"];
        let month = monthNames[monthNumber];
        setSelectedMonth(month);
    }

    return (
        <>
            <br />
            <div className="row">
                <div className="col-auto">
                    {showEditName ? <input type="text" id="cardName_inp" onChange={(e) => setCardName(e.target.value)} placeholder={card.name} />
                        : <h2 ref={cardNameRef}>{card.name}</h2>}

                </div>
                <div className="col">
                    <img id="icon" src={icon} alt="edit" onClick={(e) => setSaveIcon()} />
                </div>
            </div>
            <br />
            <h4>Balance: {card.balance} CRC</h4>
            <img id="typeImg" src={require(`../../../assets/img/${card.type}.png`)} alt="type" />
            <br /><br />
            <div className="row">
                <div className="col-auto">
                    <h5>Expenses from {selectedMonth}</h5>
                </div>
                <div className="col-auto">
                    {showMonthEdit ? <input type="month" onChange={(e) => handleSelectedMonth(e.target.value)} /> : null}
                </div>
                <div className="col">
                    <img id="icon" src={date} alt="edit" onClick={(e) => setDateIcon()} />
                </div>
            </div>
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
                    {Array.isArray(expenses) ? expenses.map((expense, key) => (
                        <tr id="table_row" key={key + 1} onClick={(e) => selectExpense(e, expense)}>
                            <th>{key + 1}</th>
                            <td>{expense.description}</td>
                            <td>{expense.cost}</td>
                            <td>{expense.date}</td>
                        </tr>
                    )) : null}
                </tbody>
            </table>
            <div className="row">
                <div className="col"><h5>Total</h5></div>
                <div className="col"><strong>{total} CRC</strong></div>
            </div>
            <br />
            <button className="btn btn-primary" onClick={addExpense}>Add expense</button>
            <button className="btn btn-secondary" onClick={() => {
                navigate("/cards")
            }}>
                Go Back
            </button>
            <br />
        </>
    )
}

export default EditCard
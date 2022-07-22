import { useState } from "react";
import "./add_card.css";
import CardsDataService from "../../../services/cards.js"
import { useNavigate } from "react-router-dom";


const AddCard = props => {

    const initialOptionsState = { value: "Choose your type of card" };
    const [optionsState, setOption] = useState(initialOptionsState);

    const [name, setName] = useState("");
    const [balance, setBalance] = useState(0);
    const [type, setType] = useState("");
    //const [owner, setOwner] = useState("");
    let owner = "";

    let navigate = useNavigate();

    const handleChange = async (e) => {
        e.preventDefault();
        setOption({ value: e.target.value });
        setType(e.target.value);
    }

    const handleSubmit = async (e) => {
        //e.preventDefault();
        // setOwner(props.user);
        // console.log(owner);
        // console.log(props.user);
        owner = props.user;
        let new_card = {
            name,
            balance,
            type,
            owner
        }
        CardsDataService.postCard(JSON.stringify(new_card)).then(res => {
            console.log(res);
        });
        navigate("../../cards");
    }

    return (
        <>
            <h2>Add a new Card</h2>
            <br /><br />
            <form onSubmit={handleSubmit}>
                <input className="form-control" type="text" placeholder="Name of the card" onChange={(e) => setName(e.target.value)} />
                <br />
                <input className="form-control" type="number" placeholder="Balance" onChange={(e) => setBalance(+e.target.value)} />
                <br />
                <select value={optionsState.value} onChange={handleChange}>
                    <option disabled value="Choose your type of card">Choose your type of card</option>
                    <option value="visa">Visa</option>
                    <option value="mastercard">MasterCard</option>
                    <option value="american_express">American Express</option>
                </select>
                <br />
                <br />
                <button type="submit" className="btn btn-success">Add Card</button>
            </form>
            <br />
            <br />
        </>
    )
}

export default AddCard;
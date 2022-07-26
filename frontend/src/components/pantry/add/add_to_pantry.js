import React from "react";
import { useState, useEffect } from 'react';
import PantryDataService from "../../../services/pantry.js"
import { useNavigate } from "react-router-dom";

const AddToPantry = props => {

    const [place, setPlace] = useState("");
    const [object, setObject] = useState("");
    const [quantity, setQuantity] = useState(0);
    let navigate = useNavigate();

    // const getItem = item => {

    // };

    const getPlace = place => {
        setPlace(place);
    };

    const getBack = async (e) => {
        navigate("/place");
    }

    const handleSubmit = async (e) => {
        let new_item = {
            place: place,
            object: object,
            quantity: quantity
        }
        PantryDataService.addObject(JSON.stringify(new_item)).then(res => {
            console.log(res);
        });
        navigate("/place");
    }

    useEffect(() => {
        getPlace(props.place)
    }, [props.place]);

    return (
        <>
            <br />
            <h2>Add to {place}</h2>
            <br />
            <form onSubmit={handleSubmit}>
                <input className="form-control" type="text" placeholder="Name" onChange={(e) => setObject(e.target.value)} />
                <br />
                <input className="form-control" type="number" placeholder="Quantity" onChange={(e) => setQuantity(+e.target.value)} />
                <br />
                <br />
                <button type="submit" className="btn btn-success">Add item</button>
            </form>
            <button className="btn btn-secondary" onClick={getBack}>Cancel</button>
        </>
    );
}

export default AddToPantry;
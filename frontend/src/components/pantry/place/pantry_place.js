import React from "react";
import { useState, useEffect } from 'react';
import PantryDataService from "../../../services/pantry.js"
import { useNavigate } from "react-router-dom";

const PantryPlace = props => {

    const initialPlaceState = "";

    const [place, setPlace] = useState(initialPlaceState);
    const [objects, setObjects] = useState([]);
    //const [showPlace, setShowPlace] = useState(true);
    let navigate = useNavigate();

    const getPlace = place => {
        //setShowPlace(true);
        console.log("P: " + place);
        PantryDataService.getByPlace(place)
            .then(response => {
                setObjects(response.data);
                setPlace(place);
            })
            .catch((e) => {
                console.log(e);
            })
    };

    const selectObject = async (e, expense) => {
        e.preventDefault();
        //props.select(expense);
        //navigate("../../expense_edit");
    }

    const addItem = async (e) => {
        navigate("/addToPantry");
    }

    useEffect(() => {
        getPlace(props.place)
    }, [props.place, objects]);

    return (
        <>
            <br />
            <h2>{place}</h2>
            <br /><br />
            <h4>Inventory</h4>
            <br />
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item</th>
                        <th scope="col">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {objects.map((object, key) => (
                        <tr id="table_row" key={key + 1} onClick={(e) => selectObject(e, object)}>
                            <th>{key + 1}</th>
                            <td>{object.object}</td>
                            <td>{object.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <button className="btn btn-success" onClick={addItem}>Add item</button>
        </>
    );
}

export default PantryPlace;
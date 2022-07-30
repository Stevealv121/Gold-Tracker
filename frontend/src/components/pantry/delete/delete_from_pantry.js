import React from "react";
import { useState, useEffect } from 'react';
import PantryDataService from "../../../services/pantry.js"
import { useNavigate } from "react-router-dom";


const DeletePantryItem = props => {

    const [objects, setObjects] = useState([]);
    const [place, setPlace] = useState("");
    let navigate = useNavigate();

    const getPlace = place => {

        PantryDataService.getByPlace(place)
            .then(response => {
                setObjects(response.data);
                setPlace(place);
            })
            .catch((e) => {
                console.log(e);
            })
    };

    const deleteObject = async (e, item_id) => {
        //e.preventDefault();
        PantryDataService.deleteObject(item_id)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        navigate("/place");
    }

    useEffect(() => {
        getPlace(props.place)
    }, [props.place]);

    const toPlace = async (e) => {
        //e.preventDefault();
        navigate("/place");
    }

    return (
        <>
            <br />
            <h2>Please choose the item you want to delete from {place}</h2>
            <br /><br />
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
                        <tr id="table_row" key={key + 1} onClick={(e) => deleteObject(e, object._id)}>
                            <th>{key + 1}</th>
                            <td >{object.object}</td>
                            <td >{object.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <button className="btn btn-secondary" onClick={toPlace}>Go back</button>
            <br />
            <br />
        </>
    )

}

export default DeletePantryItem;
import React from "react";
import { useState, useEffect } from 'react';
import PantryDataService from "../../../services/pantry.js"
import { useNavigate } from "react-router-dom";
import plusIcon from "../../../assets/icons/plus-circle.svg"
import dashIcon from "../../../assets/icons/dash-circle.svg"
import saveIcon from "../../../assets/icons/save.svg"

const PantryPlace = props => {

    const initialPlaceState = "";

    const [place, setPlace] = useState(initialPlaceState);
    const [objects, setObjects] = useState([]);
    const [showNameInput, setShowNameInput] = useState([]);
    const [newName, setNewName] = useState("");
    const [style, setStyle] = useState([]);
    let navigate = useNavigate();

    const getPlace = place => {
        //setShowPlace(true);
        //console.log("P: " + place);
        PantryDataService.getByPlace(place)
            .then(response => {
                setObjects(response.data);
                setPlace(place);
                objects.forEach(element => {
                    showNameInput.push(false);
                    if (element.quantity === 0) {
                        style.push(missingItemStyle);
                    } else {
                        style.push(null);
                    }
                });
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
    }, [props.place, objects, showNameInput, style]);

    function addItemtoBuy(name) {
        let item = {
            quantity: 0,
            object: name,
            place: "missing"
        }
        PantryDataService.addObject(item)
            .then(response => {
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const missingItemStyle = {
        color: 'red'
    }

    const handleEditObject = async (e, item, method, key) => {
        let edited_item = {
            id: item._id,
            quantity: item.quantity,
            object: item.object
        };
        if (method === "add") {
            style[key] = null;
            edited_item.quantity = item.quantity + 1;
        } else if (method === "remove") {
            if (item.quantity === 0) {
                console.log("do nothing");
            } else {
                edited_item.quantity = item.quantity - 1;
                if (edited_item.quantity === 0) {
                    addItemtoBuy(item.object);
                    style[key] = missingItemStyle;
                }
            }

        } else if (method === "name") {
            edited_item.object = newName;
        }
        //console.log(edited_item);
        PantryDataService.editObject(edited_item)
            .then(response => {
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const saveName = async (e, item, method, key) => {
        if (showNameInput[key] === true) {
            let array = [];
            showNameInput.forEach((element, id) => {
                if (id === key) {
                    element = false;
                }
                array.push(element);
            });
            setShowNameInput(array);
            handleEditObject(e, item, method, key);
        }
    }

    const toDelete = async (e) => {
        navigate("/deleteFromPantry");
    }

    const itemsBought = async (e) => {

        PantryDataService.itemsBought()
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

        //console.log("All items deleted")
    }

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
                        <th scope="col">Add</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {objects.map((object, key) => (
                        <tr key={key + 1} onClick={(e) => selectObject(e, object)}>
                            <th>{key + 1}</th>

                            {showNameInput[key] ? <div className="row">
                                <div className="col-auto">
                                    <input type="text" defaultValue={object.object} placeholder={object.object}
                                        onChange={(e) => setNewName(e.target.value)} />
                                </div>
                                <div className="col-auto">
                                    <img id="icon" src={saveIcon} alt="save" onClick={(e) => saveName(e, object, "name", key)} />
                                </div>
                            </div>
                                :
                                <td style={style[key]} onClick={(e) => { showNameInput[key] = true }} id="table_row">{object.object}</td>}
                            <td style={style[key]}>{object.quantity}</td>
                            <td><img onClick={(e) => handleEditObject(e, object, "add", key)} id="icon" src={plusIcon} alt="plus" /></td>
                            <td><img onClick={(e) => handleEditObject(e, object, "remove", key)} id="icon" src={dashIcon} alt="dash" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <button className="btn btn-success" onClick={addItem}>Add item</button>
            {place === "missing" ? <button className="btn btn-primary" onClick={itemsBought}>Items Bought</button>
                : <button className="btn btn-danger" onClick={toDelete}>Delete item</button>}

        </>
    );
}

export default PantryPlace;
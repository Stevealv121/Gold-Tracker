import React from "react";
import { useState, useEffect } from 'react';
import fridge from "../../assets/icons/fridge.png"
import fruits from "../../assets/icons/fruits.png"
import counter from "../../assets/icons/kitchen_counter.png"
import freezer from "../../assets/icons/freezer.png"
import pantry from "../../assets/icons/pantry.png"
import snacks from "../../assets/icons/snacks.png"
import vegetables from "../../assets/icons/vegetables.png"
import remember from "../../assets/icons/remember.png"
import "./pantry.css";
import { useNavigate } from "react-router-dom";

const Pantry = props => {

    const [places, setPlaces] = useState([]);

    let navigate = useNavigate();

    const getPlaces = () => {
        let places = [
            { key: 0, name: "refrigerator", img: fridge },
            { key: 1, name: "freezer", img: freezer },
            { key: 2, name: "fruits", img: fruits },
            { key: 3, name: "breakfast_table", img: counter },
            { key: 4, name: "pantry", img: pantry },
            { key: 5, name: "snacks", img: snacks },
            { key: 6, name: "vegetables", img: vegetables },
            { key: 7, name: "missing", img: remember }];
        setPlaces(places);
    }

    useEffect(() => {
        getPlaces();
    }, [])

    const handleClick = async (e, location) => {
        props.select(location.name);
        navigate("/place");
    }

    return (
        <div className="main">
            <br />
            <h2>Pantry</h2>
            <br /><br />
            {places.map((data, key) => (
                <div id="placeCard" key={key} className="card" onClick={(e) => handleClick(e, data)}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-auto">
                                <img id="placeIcon" src={data.img} alt="iconData" />
                            </div>
                            <div className="col">
                                <h4>{data.name}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <br />
        </div>
    );
}

export default Pantry;
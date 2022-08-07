import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CashFlowDataService from "../../../services/cashflow";
import trashIcon from "../../../assets/icons/trash.svg";
import saveIcon from "../../../assets/icons/save.svg";

const EditCashFlow = props => {

    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [cashflow, setCashFlow] = useState(0);
    let navigate = useNavigate();

    //state for a input field to show
    const [showInput, setShowInput] = useState([]);

    //state for a input field to show
    const [showInput2, setShowInput2] = useState(false);

    const setArrayOfInputs = () => {
        for (let i = 0; i < cashflow.length; i++) {
            showInput.push(false);
        }
    }

    const getCashFlow = (type, user) => {
        CashFlowDataService.getCashflow(type, user)
            .then(response => {
                console.log(response.data);
                setCashFlow(response.data);
                setArrayOfInputs();
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const addCashFlow = (type, user) => {
        CashFlowDataService.postCashFlow({ type, user, description, amount })
            .then(response => {
                console.log(response.data);
                setDescription("");
                setAmount(0);
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const editCashFlow = (id, type, user, description, amount) => {
        CashFlowDataService.editCashFlow({ id, type, user, description, amount })
            .then(response => {
                console.log(response.data);
                setDescription("");
                setAmount(0);
            })
            .catch((e) => {
                console.log(e);
            })
    }


    const handleShowInput = (index, action) => {
        if (action === "edit") {
            editCashFlow(cashflow[index]._id, type, props.user, description, amount);
        }
        showInput[index] = !showInput[index];
        setShowInput(showInput);
    }

    const removeItem = async (id) => {
        CashFlowDataService.deleteCashFlow(id)
            .then(response => {
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            }
            )
    }

    const styleColorGrey = {
        color: "#e0e0e0"
    }

    const getType = (type) => {
        setType(type);
    }

    useEffect(() => {
        getCashFlow(props.type, props.user);
        getType(props.type);
    }, [props.type, props.user, cashflow])

    return (
        <>
            <br />
            <h2>{type}</h2>
            <br /><br />
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Description</th>
                        <th scope="col">Cash Flow</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cashflow ? cashflow.map((cashflow, index) => (
                        <tr id="table_row" key={index + 1}>
                            <th scope="row">{index + 1}</th>
                            {showInput[index] ?
                                <td>
                                    <input type="text" defaultValue={cashflow.description} onChange={(e) => setDescription(e.target.value)} />
                                </td>
                                : <td onClick={() => { handleShowInput(index, "show") }}>{cashflow.description}</td>
                            }
                            {showInput[index] ? <td>
                                <input type="number" defaultValue={cashflow.amount} onChange={(e) => setAmount(+e.target.value)} />
                            </td> : <td onClick={() => { handleShowInput(index, "show") }}>{cashflow.amount} CRC</td>
                            }
                            {showInput[index] ? <td><img id="icon" src={saveIcon} alt="" onClick={() => { handleShowInput(index, "edit") }}
                            /></td> : <td><img id="icon" src={trashIcon} alt="" onClick={(e) => removeItem(cashflow._id)} /></td>
                            }
                        </tr>
                    )) : <tr><td>No items</td></tr>}
                    <tr id="table_row">
                        <th style={styleColorGrey}>N</th>
                        {showInput2 ? <td><input type="text" placeholder="Add description" onChange={(e) => { setDescription(e.target.value) }} /></td>
                            : <td style={styleColorGrey} onClick={() => { setShowInput2(true) }}>Add description</td>}
                        {showInput2 ? <td><input type="number" placeholder="Add amount" onChange={(e) => { setAmount(+e.target.value) }} /></td>
                            : <td style={styleColorGrey} onClick={() => { setShowInput2(true) }}>Add amount</td>}
                        <td><img id="icon" src={saveIcon} alt="" onClick={() => {
                            addCashFlow(type, props.user);
                            setShowInput2(false);
                        }} /></td>
                    </tr>
                </tbody>
            </table>
            <br />
            <button className="btn btn-secondary" onClick={() => { navigate("/cashflow") }}>Go back</button>
        </>
    )
}

export default EditCashFlow;
import React from "react";

export default function Home() {
    return (
        <div className="Home">
            <h2>Alpha View</h2>
            <br /><br />
            <div className="card">
                <div className="card-body">
                    <h4>Account Balance: getApi</h4>
                    <br />
                    <form class="row g-3">
                        <label htmlFor="add">Add to account</label>
                        <input type="number" id="add" />
                        <button className="btn btn-success">+</button>
                    </form>
                    <br />
                    <form class="row g-3">
                        <label htmlFor="remove">Remove from account</label>
                        <input type="number" id="remove" />
                        <button className="btn btn-danger">-</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
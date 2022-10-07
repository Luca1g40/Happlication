import React, {useState} from "react";
import "../Drinks.css"

const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "halloo",
    database: "tuts"
})

client.connect();
client.query(`Select * from drinken`, (err, res) => {
    if (!err) {
        console.log(res.rows);
    }
    else {
        console.log(err.message);
    }
    // eslint-disable-next-line no-unused-expressions
    client.end;
})


export default function Drinks(){
    return (
        <>
            <progress className="progres"></progress>

            <form className="drankenlijst">
                <div className="lijst">
                    <div className="">

                    </div>
                </div>

            </form>

        </>
    );
}

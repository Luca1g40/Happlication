import React, {useState} from "react";
import "../Modal.css";

export default function Modal(){

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    return (
        <>
            <button
                onClick={toggleModal}
                className="btn-modal">
                Open
            </button>

            {modal && (


            <div className="modal">
                <div
                    onClick={toggleModal}
                    className="overlay"></div>
                    <div className="modal-content">

                        <p className="name">Sushi roll</p>
                        <button className="add-up">+</button>
                        <button className="subtract">-</button>
                        <p className="amount">1</p>.
                        <br/>
                        <p className="description"> Sushi roll me komkommer
                        en tonijn.</p>
                        <br/>
                        <br/>
                        <img className="foto" src="../../../src/images/foto.JPG" alt=""></img>
                        <button
                        className='close-modal'
                        onClick={toggleModal}>bestellen</button>

                    </div>
            </div>
            )}
        </>
    );
}
import React, {useState} from "react";
import Counter from "./Counter";
import "../Modal.css";
import SubmitButton from "./SubmitButton"

export default function Modal({productName,productDetails}){

    const [modal, setModal] = useState(false);
    const [count, setCount] = useState(0);


    const toggleModal = () => {
        setModal(!modal)
    }
    const increment = () => setCount(prevCount => prevCount + 1);
    const decrement = () =>{
        if (count!==0){
            setCount(prevCount => prevCount - 1)
        }
    } ;

    // function handleClick(){
    //     // Simple POST request with a JSON body using fetch
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ title: 'React POST Request Example' })
    //     };
    //     fetch(submitUrl, requestOptions)
    //         .then(response => response.json())
    //         .then(data => {});
    // }

    return (
        <>
            <button
                onClick={toggleModal}
                className="btn-modal">
                Open
            </button>

            {modal && (


            <div className="modal">
                <div onClick={toggleModal} className="overlay"/>
                    <div className="modal-content">

                        <p className="name">Sushi roll</p>
                        {/*{<Counter />}*/}

                        <button  className="add-up" onClick={increment}>+</button>
                        <button  className="subtract" onClick={decrement}>-</button>
                        <h4 className="subtract">{count}</h4>

                        <br/>
                        <p className="description"> Sushi roll me komkommer en tonijn.</p>
                        <br/>
                        <br/>
                        <img className="foto" src="../../../src/images/foto.JPG" alt=""/>
                        <button
                        className='close-modal'

                        onClick={toggleModal}>Cancel</button>
                        <SubmitButton buttonText="yoo"/>

                    </div>
            </div>
            )}
        </>
    );
}
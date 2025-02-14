import "./Modal.css";
import data from "../json/modal-data.json";
import close from "/assets/icon-close-modal.svg";
import { useEffect, useState } from "react";

type modal = {
    id: string | number;
    title: string;
    price: number;
    left: number;
    content: string;
}

const Modal = ({isOpen ,  closeModal } : any) => {
    const [selected, setSelected] = useState({} as modal);

    const handleRadio =(data:any) => {
        setSelected(data);
    }

    const handleBackdropClick = (e : React.MouseEvent<HTMLDivElement>) => {
          closeModal();  
    }

    if(!isOpen) return null;
    return (
        <div className={`modal ${isOpen ? 'is-active' : ''}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <section className="modal-card-body">
                    <div className="is-flex">
                        <div className="subtitle has-text-weight-bold">Back this project</div>
                        <div className="ml-auto">
                            <button className="is-large" aria-label="close"  onClick={(e:any)=> handleBackdropClick(e)}>
                                <img src={close}></img>
                            </button>                    
                        </div>
                    </div>
                    <div>Want to support us in bringing Mastercraft Bamboo Monitor Rise out in the world?</div>
                    {
                        data.map((d:modal, index:number)=> (
                            <div key={index} className={(selected.id == "s"+index ? "selected-line":"default-line")+" card my-6 py-5 is-shadowless"}> 
                                <div className="field px-5">
                                    <div className="control is-flex">
                                        <label className="radio my-auto">
                                            <input 
                                                type="radio" 
                                                id={"s"+index}
                                                style={{"transform":"scale(1.5)", "color":"whit"}}
                                                onChange={(e)=>handleRadio(e.target)}
                                                value={d.title}
                                                checked={selected.id == "s"+index}
                                            ></input>
                                        </label>
                                        <div className="is-flex-desktop">
                                            <div className="has-text-weight-bold ml-4">{d.title}</div>
                                            <div className="has-text-primary mx-4">Pledge ${d.price} or more</div>
                                        </div>
                                        <div className="is-hidden-mobile ml-auto">
                                            <span className="has-text-weight-bold">{d.left} </span>
                                            <span>left</span>
                                        </div>
                                    </div>
                                    <div className="content control my-4">
                                        <div className="has-text-grey">
                                            {d.content}
                                        </div>
                                    </div>
                                    <div className="is-hidden-tablet">
                                        <span className="has-text-weight-bold">{d.left} </span>
                                        <span>left</span>
                                    </div>
                                </div>
                                <div className="divide-line"></div>
                                <div className="field px-5">
                                    <div className="control">
                                        <div className="is-flex-desktop has-text-centered margin-top-2">
                                            <span className="my-auto has-text-grey">Enter your pledge</span>
                                            <div className="is-flex ml-auto is-centered-mobile margin-top-1">
                                                <span className="mx-2">
                                                    <input type="text" size={5} className="input is-rounded" defaultValue={"$"}></input>
                                                </span>
                                                <span className="mx-2">
                                                    <button className="button is-rounded is-primary px-4 py-3 is-size-7 has-text-white has-text-weight-bold">
                                                        Continue
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))  
                    }
                    
                </section>

             </div>
             
        </div>
    );
};

export default Modal;
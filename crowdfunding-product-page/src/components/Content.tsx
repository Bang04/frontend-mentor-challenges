import React, { useEffect, useState } from "react";
import Modal from "./Modal";

import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../store/index';

import data from "../json/modal-data.json";
import "./Content.css";
import logo from "../../public/assets/logo-mastercraft.svg";
import bookmarkOff from "../../public/assets/icon-bookmark.svg";
import bookmarkOn from "../../public/assets/icon-bookmark-on.png";
type modal = {
  title: string;
  price: number;
  left: number;
  content: string;
}

const Content = () =>{

  const bookmark = useSelector((state:any) => state.bookmarkReducer);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const handlerBookmark = () =>{
    dispatch(toggle(bookmark));
  }

  return (
    <div className="container is-max-tablet">
      <img src={logo} className="logo is-64x64"/>
      <div className="top section mb-5 has-text-centered ">
        <h1 className="title is-4 has-text-black 	mb-3">Mastercraft Bamboo Monitor Riser</h1>
        <h2 className="subtitle is-6">A beautiful & handcrafted monitor stand to reduce neck and eye strain.</h2>
        
        {/* desktop */}
        <div className="is-hidden-mobile is-flex is-justify-content-space-between mt-6">
          <button  className="button is-success is-rounded has-text-weight-semibold has-text-white px-6 py-0" onClick={openModal}> 
            Back this project
          </button>
          <button className={`bookmark button p-0 pr-5 is-rounded has-text-weight-semibold ${bookmark? "on" : ""} `} onClick={handlerBookmark}>
            <img src={ bookmark? bookmarkOn : bookmarkOff } className="mr-3"/> Bookmark 
          </button>
        </div>

        {/* mobile */}
        <div className="is-hidden-desktop is-hidden-tablet is-flex is-justify-content-space-between mt-3">
          <button 
            className="button is-success is-rounded has-text-weight-semibold has-text-white px-6 py-0" 
            onClick={openModal}>
                Back this project
          </button>
          <div onClick={handlerBookmark}>
            <img src={ bookmark? bookmarkOn : bookmarkOff } />
          </div>
        </div>
      </div>

      <div className="section mb-5">
        <div className="total columns">
          <div className="column m-0 p-0">
              <div className="title has-text-black mb-2">$89,914</div>
              <p>of $100,000 backed</p>
              <div className="bottom-line mt-5"></div>
          </div>
          <div className="column m-0 p-0">
            <div className="title has-text-black mb-2">5,007</div>
            <p>total backers</p>
            <div className="bottom-line mt-5"></div>
          </div>
          <div className="column m-0 p-0">
            <div className="title has-text-black mb-2">56</div>
            <p>days left</p>
          </div>
        </div>

        {/* 막대 그래프 */}
        <div className="progress-bar mt-5">
          <div className="progress"></div>
        </div>
      </div>

      <section className="section">
        <div className="content mb-5">
            <div className="title is-5 has-text-black">About this project</div>
            <p className="pb-4 is-size-6">The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform that elevates your screen to a more comfortable viewing height. Placing your monitor at eye level has the potential to improve your posture and make you more comfortable while at work, helping you stay focused on the task at hand.</p>
            <p className="pb-4 is-size-6">Featuring artisan craftsmanship, the simplicity of design creates extra desk space below your computer to allow notepads, pens, and USB sticks to be stored under the stand.</p>
        </div>
      {
        data.map((d:modal, index:number) => {
          if(d.price > 0){
           const disable = d.left == 0? "disable" : "";
            return (
             
              <div className={`funding box has-background-white ${disable}`}>
                 {/* desktop */}
                  <div className="is-hidden-mobile is-flex is-justify-content-space-between">
                    <div className="title has-text-black is-6">{d.title}</div>
                    <div className="price has-text-weight-medium">Pledge ${d.price} or more</div>
                  </div>
                  {/* mobile */}
                  <div className="is-hidden-desktop is-hidden-tablet is-flex is-flex-direction-column mb-5">
                    <div className="title has-text-black is-6 mb-2">{d.title}</div>
                    <div className="price has-text-weight-medium">Pledge ${d.price} or more</div>
                  </div>

                  <div className="content">
                    <p>{d.content}</p>
                  </div>


                  <div className="is-hidden-mobile is-flex is-justify-content-space-between">
                    <div><span className="title is-3 has-text-black mr-2">{d.left}</span>left </div>
                    <div><button className="button is-success is-rounded has-text-weight-semibold has-text-white px-5 py-4" >Select Reward</button></div>
                  </div>

                  <div className="is-hidden-desktop is-hidden-tablet is-flex is-flex-direction-column">
                    <div className="mb-5"><span className="title is-3 has-text-black mr-2">{d.left}</span>left </div>
                    <div><button className="button is-success is-rounded has-text-weight-semibold has-text-white px-5 py-4" >Select Reward</button></div>
                  </div>
              </div> 
            );
          }
        })
      }
      </section>
      <Modal isOpen = {isOpen} closeModal = {closeModal}/>
    </div>
  );
}

export default Content;


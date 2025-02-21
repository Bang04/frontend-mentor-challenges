import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { ConfirmModal } from "./ConfirmModal";

import { useDispatch, useSelector } from 'react-redux';
import { toggle, update } from '../store/index';

import "./Content.css";
import logo from "../../public/assets/logo-mastercraft.svg";
import bookmarkOff from "../../public/assets/icon-bookmark.svg";
import bookmarkOn from "../../public/assets/icon-bookmark-on.png";
import data from "../json/pledge-data_.json"; //삭제 예정?파일


interface Pledge {
  id : string;            // 약정의 고유 ID
  title : string;         // 약정 이름 
  amount : number;        // 약정 금액 (예: 50,000원)
  content : string;       // 약정에 대한 설명
  left : number;          // 약정 유효 일수 (기부 가능한 기간)
  miniprice : number;     // 최소기부액
}

type modal = {
  title: string;
  price: number;
  left: number;
  content: string;
}

const Content = () =>{

  const bookmark = useSelector((state:any) => state.bookmarkReducer);
  const {backers, progress } = useSelector((state:any) => state.crowdReducer);
  const currentAmount = progress.currentAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const backersCount = progress.backersCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const percentage = Math.round(progress.percentage);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
    setIsConfirm(false);
  }

  const openConfirmModal = () => {
    closeModal();
    setIsConfirm(true);
  };

  const handlerBookmark = () =>{
    dispatch(toggle(bookmark));
  }
  useEffect(() => {
    dispatch(update());
  },[backers]);
  return (
    <div className="content-wrapper">
      <div className="content-container">

        <img src={logo} className="logo"/>
        <div className="content-box center">
          <div className="title">Mastercraft Bamboo Monitor Riser</div>
          <div className="subtitle gray mt-3">A beautiful & handcrafted monitor stand to reduce neck and eye strain.</div>
          
         
         <div className="top button-group">
            <button  className="button" onClick={openModal}> 
              Back this project
            </button>
            {/* desktop */}
            <div className="is-hidden-mobile"> 
              <button className={`button bookmark ${bookmark? "on" : ""} `} onClick={handlerBookmark}>
                <img src={ bookmark? bookmarkOn : bookmarkOff }/> Bookmarked
              </button>
            </div>
            {/* mobile */}
            <div className="is-hidden-desktop is-hidden-tablet">
              <div className="bookmark m" onClick={handlerBookmark}>
                <img src={ bookmark? bookmarkOn : bookmarkOff } />
              </div>
            </div>
         </div>
        </div>

        <div className="content-box total">
          <div className="columns">
            <div className="column">
                <div className="title">${currentAmount}</div>
                <p className="gray">of $100,000 backed</p>
            </div>
            <div className="column">
              <div className="title">{backersCount}</div>
              <p className="gray">total backers</p>
            </div>
            <div className="column">
              <div className="title">{progress.endDays}</div>
              <p className="gray">days left</p>
            </div>
          </div>

          {/* 막대 그래프 */}
          <div className="progressbar">
            <div className="progress" style={{ width : `${percentage}%` }}></div>
          </div>
        </div>

        <div className="content-box pledge">
          <div className="content">
              <div className="title">About this project</div>
              <p className="gray">The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform that elevates your screen to a more comfortable viewing height. Placing your monitor at eye level has the potential to improve your posture and make you more comfortable while at work, helping you stay focused on the task at hand.</p>
              <p className="gray">Featuring artisan craftsmanship, the simplicity of design creates extra desk space below your computer to allow notepads, pens, and USB sticks to be stored under the stand.</p>
          </div>
        {
          data.map((d:Pledge, index:number) => {
            if(d.miniprice > 0){
            const disable = d.left == 0? "disable" : "";
              return (
              
                <div className={`funding mb-5 ${disable}`} key={index}>
                    <div className="content-header">
                      <div className="title">{d.title}</div>
                      <div className="price">Pledge ${d.miniprice} or more</div>
                    </div>
                    <div className="content">
                      <p className="gray">{d.content}</p>
                    </div>
                    <div className="button-group">
                      <div className="is-flex is-align-items-center">
                        <div className="left">{d.left}</div>
                        <div className="gray pl-2 mr-6 ">left</div>
                      </div>
                      <button className="button">Select Reward</button>
                    </div>
                </div> 
              );
            }
          })
        }
        </div>
      </div>
    
      <Modal isOpen = {isOpen} closeModal = {closeModal} openConfirmModal={openConfirmModal}/>
      <ConfirmModal isConfirm={isConfirm} closeModal={closeModal}></ConfirmModal>
    </div>
  );
}

export default Content;


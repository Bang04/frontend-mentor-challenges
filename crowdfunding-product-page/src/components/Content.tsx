import React, { useEffect, useState } from "react";
import Modal from "./Modal";

import { useDispatch, useSelector } from 'react-redux';
import { toggle, update } from '../store/index';

import "./Content.css";
import logo from "../../public/assets/logo-mastercraft.svg";
import bookmarkOff from "../../public/assets/icon-bookmark.svg";
import bookmarkOn from "../../public/assets/icon-bookmark-on.png";
import data from "../json/pledge-data_.json"; //삭제 예정?파일

interface Pledge {
  id: string;           // 약정의 고유 ID
  title: string;         // 약정 이름 
  amount: number;       // 약정 금액 (예: 50,000원)
  content: string;  // 약정에 대한 설명
  left : number; // 약정 유효 일수 (기부 가능한 기간)
  miniprice : number; // 최소기부액
}

const Content = () =>{

  const bookmark = useSelector((state:any) => state.bookmarkReducer);
  const {backers, progress } = useSelector((state:any) => state.crowdReducer);
  const currentAmount = progress.currentAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const backersCount = progress.backersCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const percentage = Math.round(progress.percentage);
  console.log("percentage : "+percentage);
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
  useEffect(() => {
    dispatch(update());
  },[backers]);
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
            <img src={ bookmark? bookmarkOn : bookmarkOff } className="mr-3"/> Bookmarked
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
              <div className="title has-text-black mb-2">${currentAmount}</div>
              <p>of $100,000 backed</p>
              <div className="bottom-line mt-5"></div>
          </div>
          <div className="column m-0 p-0">
            <div className="title has-text-black mb-2">{backersCount}</div>
            <p>total backers</p>
            <div className="bottom-line mt-5"></div>
          </div>
          <div className="column m-0 p-0">
            <div className="title has-text-black mb-2">{progress.endDays}</div>
            <p>days left</p>
          </div>
        </div>

        {/* 막대 그래프 */}
        <div className="progress-bar mt-5">
          <div className="progress" style={{ width : `${percentage}%;` }}></div>
        </div>
      </div>

      <section className="section">
        <div className="content mb-5">
            <div className="title is-5 has-text-black">About this project</div>
            <p className="pb-4 is-size-6">The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform that elevates your screen to a more comfortable viewing height. Placing your monitor at eye level has the potential to improve your posture and make you more comfortable while at work, helping you stay focused on the task at hand.</p>
            <p className="pb-4 is-size-6">Featuring artisan craftsmanship, the simplicity of design creates extra desk space below your computer to allow notepads, pens, and USB sticks to be stored under the stand.</p>
        </div>
      {
        data.map((d:Pledge, index:number) => {
          if(d.miniprice > 0){
           const disable = d.left == 0? "disable" : "";
            return (
             
              <div className={`funding box has-background-white ${disable}`}>
                 {/* desktop */}
                  <div className="is-hidden-mobile is-flex is-justify-content-space-between">
                    <div className="title has-text-black is-6">{d.title}</div>
                    <div className="price has-text-weight-medium">Pledge ${d.miniprice} or more</div>
                  </div>
                  {/* mobile */}
                  <div className="is-hidden-desktop is-hidden-tablet is-flex is-flex-direction-column mb-5">
                    <div className="title has-text-black is-6 mb-2">{d.title}</div>
                    <div className="price has-text-weight-medium">Pledge ${d.miniprice} or more</div>
                  </div>

                  <div className="content">
                    <p>{d.content}</p>
                  </div>

                  {/* desktop */}
                  <div className="is-hidden-mobile is-flex is-justify-content-space-between">
                    <div><span className="title is-3 has-text-black mr-2">{d.left}</span>left </div>
                    <div><button className="button is-success is-rounded has-text-weight-semibold has-text-white px-5 py-4" >Select Reward</button></div>
                  </div>
                  {/* mobile */}
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



import React, { useEffect, useState } from "react";

import close from "/images/icon-close-modal.svg";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../store";
import { updatePot } from "../../store";
import { Pot } from "../../store";
const MODAL_TEXT = {
  add: {
     title: "Add to 'Savings'",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus  hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.",
    graph : "New Amount",
    input: "Add",
    btn : "Addition",
  },
  withdraw: {
    title: "Withdraw from 'Savings'",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus  hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.",
    graph : "New Amount",
    input: "Withdraw",
    btn : "Withdrawl",
  },
};

type ModalType = keyof typeof MODAL_TEXT;

interface PotAmountModalProps {
    closeModal : () => void;
    modalType : ModalType;
    id?: string;
}

export const PotAmountModal = ({ closeModal, modalType , id}: PotAmountModalProps) => {
   
    const dispatch = useDispatch();
    const pot = useSelector((state: rootState) =>
        state.potReducer.find((pot: Pot) => pot.id === id) //수정 할 pot 데이터 가져오기
    );
    const text = MODAL_TEXT[modalType];

    const [ inputValue , setInputValue ] = useState<number>(0); //입력한 값
    const [ currentPct , setCrrentPct ] = useState<number>(0); // 현재 total 백분율 
    const [ changeTotal , setChageTotal ] = useState<number>(0); // 전체값 - inputValue 
    const [ changePct , setChangePct ] = useState<number>(0); // 변경된 total 백분율 
    const [ diffPct, setDiffPct] = useState<number>(0); // 추가 or 빼기
    const [error, setError] = useState<string>(""); // 에러 메세지

    

    const onClickHandler = () => {
        if (id !== undefined && pot) {
            dispatch(updatePot({ id, total: changeTotal }));
            closeModal();
        } else if (id === undefined) {
            setError("ID가 정의되지 않았습니다.");
        } else {
            setError("Pot이(가) 정의되지 않았습니다.");
        }
    }

    const handleBackdropClick = (e : React.MouseEvent<HTMLDivElement>) => {
        closeModal();
    }
    
    useEffect(() => {
        if(inputValue === 0){
            if (pot) {
                setCrrentPct(Number(((pot.total / pot.target) * 100).toFixed(2)));
                setChageTotal(pot.total);
                setDiffPct(0);
            }
        }
        
    }, [pot]);

    useEffect(() =>{
        const timeout = setTimeout(() => {
            setError("");
            if(Number(inputValue) < 0){
                setError("0$ 이상 입력 가능합니다.");
                return;
            }
            if (modalType === "withdraw" && pot && typeof pot?.total === "number" && inputValue > pot.total) { //출금하기
                setError("잔액보다 많이 뺄 수 없습니다.");
                return;
            }

            if (modalType === "add" && pot && typeof pot?.total === "number" && inputValue > pot.target) { //입금하기
                setError("목표 금액 초과되었습니다. 이하로 입력해주세요");
                return;
            }
            
            if(pot && 
                typeof pot.total === "number" && 
                typeof pot.target === "number" && 
                pot.target !== 0 
            ){
                let newTotal = pot.total;

                if(inputValue >= 0){
                    if(modalType == "add" ){
                        newTotal += inputValue;
                      
                    }else if(modalType == "withdraw" ){ // withdraw
                       newTotal -= inputValue;
                    }
                   
                    const newPct = Math.round((newTotal / pot.target) * 10000) / 100;
                    const currentPct = Math.round((pot.total / pot.target) * 10000) / 100;
                    
                    setCrrentPct(currentPct);
                    setChangePct(newPct);
                    setDiffPct(Math.abs(currentPct - newPct));
                  
                    setChageTotal(newTotal);
                }
            }  
          
    },100); //1초 후
        return () => clearTimeout(timeout);
    },[inputValue,pot, modalType])

return (
   <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-100">
		<div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full relative">
            <div className="flex justify-between pb-5">
                <span className="text-2xl self-center font-semibold">{text.title}</span>
                <button
                        onClick={(e:any)=> handleBackdropClick(e)}
                        className="p-2 rounded hover:bg-gray-100"
                    >
                    <img src={close} />
                </button>
            </div>
            <div className="pb-5">
                <p className="text-sm text-gray-500">{text.description}</p>
            </div>
            <div className="flex justify-between"> 
                <span className="text-xs text-gray-500">New Amount</span>
                <span className="text-3xl font-semibold">${changeTotal.toFixed(2)}</span>
            </div>
             
            <div>
                { modalType == "add" ? (
                    <div className="flex w-full h-3 bg-gray-100">
                        <div className='h-3 bg-black' style={{ width: `${currentPct}%` }}></div>
                        <div className='h-3 bg-green-800' style={{ width: `${changePct}%` }}> </div>
                    </div>
                ):(
                        <div className="flex w-full h-3 bg-gray-100">
                        <div className='h-3 bg-black' style={{ width: `${changePct }%` }}></div>
                        <div className=' h-3  bg-red-600' style={{ width: `${diffPct}%`}}></div>
                    </div>
                )}
            </div>
             <div className="flex justify-between"> 
                <span className="text-xs text-red-600">{changePct} %</span>
                <span className="text-xs gray-100">Target of ${pot?.target}</span>
            </div>
            <div className="pb-3">
                <label className="block text-sm font-medium text-gray-700">Amount to {text.input}</label>
                <input onChange={(e) => {setInputValue(Number(e.target.value))}} type="text" name="target" placeholder="$" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            
            <button 
                type="button" 
                onClick={onClickHandler}
                className="text-xs w-full py-3 px-4 bg-black text-white font-normal rounded-md focus:outline-none">Confilrm {text.btn}</button>
        </div>
	</div>
    );
}	
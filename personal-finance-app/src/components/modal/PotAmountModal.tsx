
import React, { useEffect, useState } from "react";

import close from "/images/icon-close-modal.svg";
import { useSelector } from "react-redux";
import { rootState } from "../../store";

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
    const _data = useSelector((state:rootState)=> state.dataReducer);
    const pot =  _data.pots.find((pot) => pot.id == id);
    const text = MODAL_TEXT[modalType];

    const [ inputValue , setInputValue ] = useState<number>(0); //입력한 값
    const [ currentPct , setCrrentPct ] = useState<number>(0); // 현재 total 백분율 

    const [ changeTotal , setChageTotal ] = useState<number>(0); // 전체값 - inputValue 
    const [ changePct , setChangePct ] = useState<number>(0); // 변경된 total 백분율 
    const [ diffPct, setDiffPct] = useState<number>(0); // 추가 or 빼기
    const [error, setError] = useState<string>(""); // 에러 메세지

    

    const handleBackdropClick = (e : React.MouseEvent<HTMLDivElement>) => {
        closeModal();
    }
    useEffect(() => {
      
        if (pot && 
            typeof pot.target === "number" && 
            typeof pot.target === "number" && 
            pot.target !== 0
        ) {
            const pct = Number(((pot.total / pot.target) * 100).toFixed(2));
            setCrrentPct(pct);
            setChageTotal(pot.total);
            // setCrrentPct(Number(((pot.total / pot.target) * 100).toFixed(2)));
            // console.log("currentPct : "+ currentPct);
        }
        
    }, []);

    useEffect(() =>{
        const amount = parseFloat(inputValue.toString());
        const timeout = setTimeout(() => {
            setError("");
            if(amount < 0){
                setError("0$ 이상 입력 가능합니다.");
                return;
            }
            if (modalType === "withdraw" && pot && typeof pot.total === "number" && amount > pot.total) { //출금하기
                setError("잔액보다 많이 뺄 수 없습니다.");
                return;
            }

            if (modalType === "add" && pot && typeof pot.total === "number" && amount > pot.target) { //입금하기
                setError("목표 금액 초과되었습니다. 이하로 입력해주세요");
                return;
            }
            
            if(pot && 
                typeof pot.total === "number" && 
                typeof pot.target === "number" && 
                pot.target !== 0 
            ){
                if(amount > 0){
                    if(modalType == "add" ){
                        const newTotal = pot.total + inputValue;
                        const pct = Number(((pot.total / pot.target) * 100).toFixed(2));
                        setCrrentPct(pct);   //기존 퍼센트 바 
                        const newPct = Number(((newTotal / pot.target) * 100).toFixed(2));
                        setChangePct(newPct);
                        setChageTotal(Number(newTotal));

                    }else if(modalType == "withdraw"){
                        // const newTotal = pot.total + inputValue;
                        //    const newPct = Number(((newTotal / pot.target) * 100).toFixed(2));
                        //    console.log("withdraw pct : "+pct);
                        //    setChangePct(newPct);
                        // setDiffPct(pct);
                    }
                }else{
                    console.log("amount 0 보다 작음 : "+amount);
                    setChangePct(0);
                    setChageTotal(pot.total);
                }
               
            }  
          
    },500); //1초 후
        return () => clearTimeout(timeout);
    },[inputValue])

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
                            <div className='h-3 bg-black' style={{ width: `${diffPct}%` }}></div>
                            <div className=' h-3  bg-red-600' style={{ width: `${changePct}%`}}></div>
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
            
            <button type="button" className="text-xs w-full py-3 px-4 bg-black text-white font-normal rounded-md focus:outline-none">Confilrm {text.btn}</button>
        </div>
	</div>
    );
}	
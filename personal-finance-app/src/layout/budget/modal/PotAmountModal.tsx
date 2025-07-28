
import React, { useEffect, useState } from "react";

import close from "/images/icon-close-modal.svg";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../../store";
import { updatePot } from "../../../store";
import { Pot } from "../../../store";

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
// TODO: Modal 공통 모듈로 리팩토링 하기 
// 저금/출금하기 기능
export const PotAmountModal = ({ closeModal, modalType , id}: PotAmountModalProps) => {
   
    const dispatch = useDispatch();
    const pot = useSelector((state: rootState) =>
        state.potReducer.find((pot: Pot) => pot.id === id) //수정 할 pot 데이터 가져오기
    );
    const text = MODAL_TEXT[modalType];

    const [ inputValue , setInputValue ] = useState<number>(0); //입력한 값
    const [ currentPct , setCrrentPct ] = useState<number>(0); // 현재 total 백분율 
    const [ changeTotal , setChangeTotal ] = useState<number>(0); // 전체값 - inputValue 
    const [ changePct , setChangePct ] = useState<number>(0); // 변경된 total 백분율 
    const [ diffPct , setDiffPct] = useState<number>(0); // 추가 or 빼기
    const [error , setError] = useState<string>(""); // 에러 메세지

    //초기화 
    const initialize = () =>{
       if ( inputValue === 0 && 
            pot &&
            typeof pot.total === "number" &&
            typeof pot.target === "number" &&
            pot.target !== 0
        ){
            const pct = Number(((pot.total / pot.target) * 100).toFixed(2));
            setCrrentPct(pct);
            setChangeTotal(pot.total);
            setError(""); 
            if(modalType == "add"){ //저금할때
                setDiffPct(0);
                setChangePct(Number(((pot.total / pot.target) * 100).toFixed(2)));
            }
            if(modalType == "withdraw"){//출금할때
                setDiffPct(pct);
                setChangePct(0);
            }
        }
    }
    const validate = () => {
        let isResult = true;
        const parsed = Number(inputValue);
        if(inputValue == 0 || isNaN(Number(inputValue))){
            setError("숫자를 입력해 주세요");
            isResult = false;
            return;
        }
        if(!Number.isInteger(inputValue)){
            setError("정수만 입력해 주세요");
             isResult = false;
            return;
        }
        if(parsed <=0){
             setError("1이상 입력해 주세요");
             isResult = false;
            return;
        }
        if ( modalType == "add" && pot &&  typeof pot.target === "number" &&  parsed > pot.target && (parsed + pot.total) > pot.target){
            setError(`입력한 값 또는 입력한 값 + Total 합은 목표 금액($${pot.target}) 보다 클 수 없습니다.`);
             isResult = false;
            return;
        }
         if(modalType == "withdraw" && pot &&  typeof pot.target === "number" && parsed > pot.total){
            setError(`출금 가능한 금액($${pot.target})을 초과할 수 없습니다.`);
             isResult = false;
            return;
        }

        return isResult;
    }

    const handleBackdropClick = (e : React.MouseEvent<HTMLDivElement>) => {
        closeModal();
    }
    
    //load될때 초기화
    useEffect(() => {
        initialize();
        setError("");
    }, [modalType]);

    useEffect(() =>{
         initialize();
         setError("");
        const timeout = setTimeout(() => {
            if (!pot) {
                setError("Pot이(가) 정의되지 않았습니다.");
                return;
            }
            let newTotal = pot.total;
            if(inputValue > 0){
                if(modalType == "add" )newTotal += inputValue;
                else if(modalType == "withdraw" ) newTotal -= inputValue;
                
                if(pot && 
                    typeof pot.total === "number" && 
                    typeof pot.target === "number" && 
                    pot.target !== 0 
                ){
                    const newPct = (newTotal / pot.target) * 100; //변경된 total 퍼센트 
                    const minusPct = (inputValue / pot.target) * 100; //입력한 total 퍼센트
                    const current = (pot.total / pot.target) * 100; //현재 퍼센트
                    const changeTotalPct = (changeTotal / pot.target) * 100;
                    
                    setCrrentPct(currentPct);// add 일때
                    setChangeTotal(newTotal); // 뺄때 변동 % 프로그래스바 

                    if(modalType == "withdraw" ){
                       if(inputValue > pot.total){ //저금액보다 입력값이 초과한 경우
                            setDiffPct(0); //기존 그래프 0%
                            setChangePct(current);  //출금 그래프 기존금액 % 길이 넣음
                       }else{
                            setDiffPct(newPct); 
                            setChangePct(minusPct);
                       }
                    }else{
                        setChangePct(changeTotalPct); //변경된 total 값 퍼센트 
                        setDiffPct(newPct); // add 일때
                    }
                }
            }else{
                initialize();
            }
    },1000); //1초 후
        return () => clearTimeout(timeout);
    },[inputValue,pot, modalType])


    const onClickHandler = () => {
         if (id === undefined) {
            setError("ID가 정의되지 않았습니다.");
        }
        if (validate()) {
            dispatch(updatePot({ id, total: changeTotal }));
            closeModal();
        }
       
    }

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
              { modalType == "add" ? (// 저금추가
                <>
                    {/* 그래프 */}
                    <div className="flex w-full h-3 bg-gray-100">
                        <div className='h-3 bg-black' style={{ width: `${currentPct}%` }}></div>  {/* 기존 그래프 */}
                        <div className='h-3 bg-green-800 overflow-x-hidden' style={{ width: `${diffPct}%` }}> </div> {/* 변동 그래프 */}
                    </div>
                    {/* 기존 target 퍼센트, +,-퍼센트 */}
                    <div className="flex justify-between"> 
                        <span className="text-xs text-green-800">{diffPct.toFixed(2)} %</span>
                        <span className="text-xs gray-100">Target of ${pot?.target}</span>
                    </div>
                </>
                ):(
                // 저금빼기 
                <>
                    <div>
                         {/* 그래프 */}
                        <div className="flex w-full h-3 bg-gray-100">
                            <div className='h-3 bg-black' style={{ width: `${diffPct}%` }}></div>{/* 기존 그래프 */}
                            <div className=' h-3  bg-red-600 overflow-x-hidden' style={{ width: `${changePct}%`}}></div>{/* 변동 그래프 */}
                        </div>
                    </div>
                     {/* 기존 target 퍼센트, +,-퍼센트 */}
                    <div className="flex justify-between"> 
                        <span className="text-xs text-red-600">{diffPct.toFixed(2)} %</span>
                        <span className="text-xs gray-100">Target of ${pot?.target}</span>
                    </div>
                </>
               
             )}
           
            <div className="pb-3">
                <label className="block text-sm font-medium text-gray-700">Amount to {text.input}</label>
                <input 
                    onChange={(e) => {setInputValue(Number(e.target.value))}} 
                    type="text" name="target" placeholder="$" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
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
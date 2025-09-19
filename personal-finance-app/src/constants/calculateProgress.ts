export const calculateProgress = ({ target, total, type, inputValue }: any) => {

    let inputPercent :number = 0,currentPercent : number = 0;
    let changeTotal : number = 0, changeTotalPct: number = 0,diffPct : number = 0;
    let displayPct : number = 0;

    currentPercent = (total/target) * 100;      //기존 총액 퍼센트
    inputPercent = (inputValue / target) * 100; //입력값 기준 퍼센트

    if(type == "deposit"){
        diffPct = currentPercent;
        changeTotalPct = inputPercent;
        changeTotal = total+inputValue;
        displayPct = currentPercent + inputPercent;

    }else if(type == "withdraw"){
        diffPct = currentPercent-inputPercent;
        changeTotalPct = inputPercent;
        changeTotal = total-inputValue;
        displayPct = currentPercent - inputPercent;
    } 

    return({diffPct,changeTotalPct,changeTotal,displayPct} )
}
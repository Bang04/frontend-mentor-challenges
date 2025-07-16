export const validateInputs = (name: any, target: any) => {

    if(name.trim() === "") {
        return "제목을 입력해주세요.";
    }else if(name.length > 30){
        return "30자 미만으로 입력해주세요.";
    }

   if(!target){
            return "목표액을 입력해주세요";
        }else if(target < 0 || target > 2000){
            return "목표액은 0 이상 2000 이하로 입력해주세요2";
        }else if(!validateNumber(target)){
            return "숫자만 입력 가능합니다.";
        }
    return "";
} 

export const validateField = (name: any, value: any) => {
      if(name === "name" ){
            if( value.trim() === "") {
               return "제목을 입력해주세요.";
            }else if(value.length > 30){
                return "30자 미만으로 입력해주세요.";
            }
      }
    if(name === "target"){
        if( !value){
            return "숫자만 입력해주세요";
        }else if(value < 0 || value > 2000){
             return"목표액은 0 이상 2000 이하로 입력해주세요2";
        }else if(!validateNumber(value)){
             return"숫자만 입력 가능합니다";
        }
    }
    return "";
} 

const validateNumber = (value:any) => {
    const numberRegex = /^\d+$/;
    return numberRegex.test(value);
};
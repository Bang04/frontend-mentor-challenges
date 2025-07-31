// pnum 타입일때 value 를 name 으로 대체
type button = {
    type: string,
    closeModal?: () => void | undefined, //모달 닫기
    handler?: () => void,   //이벤트 핸들러
    disabled?: boolean,
    pageNum?: number,      // 페이징 필요
    bg_color?: string,       //버튼 배경색
    text_color?: string,     //버튼 글자색
    name: string | number   //버튼명 or value 사용
}

export const Button = ({ type, handler, closeModal, disabled, pageNum, bg_color, text_color, name }: button) => {

    switch (type) {
        case "modal":
            return <button type="button" className={bg_color + " py-3 px-4 my-1 text-xs w-full  font-normal rounded-md cursor-pointer focus:outline-none " + text_color} 
            onClick={() => handler? handler() : closeModal}> {name} </button>;

        case "page":
            return <button type="button" disabled={disabled} className="button px-5 py-1 rounded-sm border-1 cursor-pointer hover:bg-black hover:text-white hover:opacity-50"
                onClick={handler}>{name}</button>;

        case "pnum":
            return <button key={name} type="button" className={`hover:bg-black hover:text-white hover:opacity-50 cursor-pointer w-8 h-8 rounded-sm border-1 mx-1 ${pageNum == name ? "bg-black text-white" : ""}`}
                onClick={handler}> {name} </button>;
        default:
            return <button type="button" className="py-4 px-4  text-sm text-white font-semibold  bg-black rounded-lg"
                onClick={() => handler} >{name}</button>;
    }
}

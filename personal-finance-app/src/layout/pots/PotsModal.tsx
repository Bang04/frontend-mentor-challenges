import { Modal, modal } from "../../components/modal";
import { Select } from "../../components/select";
import { COLOR } from "../../constants/color";
import { JSX, useEffect, useState } from "react";
import { MODAL_TEXT } from "../../constants/modalText";
import { pushData, removeData, updateData } from "../../store/firebase/subscribe";
import { useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { selectedTheme } from "../../store/selectors/transactionSelector";
import { validateField } from "./PotValidators";

export const PotsModal = ({ isOpen, closeModal, prop, type }: modal) => {
    if (!isOpen) return null;
    const [name, setName] = useState(prop?.name ?? "");
    const [color, setColor] = useState(prop?.theme ?? "");
    const [target, setTarget] = useState(prop?.target ?? "");

    const [inputValue, setInputValue] = useState<number>(0); //입력한 값
    const [currentPct, setCrrentPct] = useState<number>(0); // 현재 total 백분율 
    const [changeTotal, setChangeTotal] = useState<number>(0); // 전체값 - inputValue 
    const [changePct, setChangePct] = useState<number>(0); // 변경된 total 백분율 
    const [diffPct, setDiffPct] = useState<number>(0); // 추가 or 빼기
    const [error, setError] = useState<string>(""); // 에러 메세지
    const [errors, setErrors] = useState("");
    const customColor: string[] = useSelector(selectedTheme);

    const _color = COLOR.map((v) => {
        if (customColor.includes(v.key)) {
            v.disabled = true;
        };
        return v;
    }).sort((a, b) => Number(b.disabled) - Number(a.disabled));

    const selectedIndex = _color.findIndex((v) => v.disabled == false);

    const dispatch = useAppDispatch();

    const getMaximum = (target: any) => {
        setTarget(target);
    }

    const addPot = () => {
        dispatch(pushData({
            "path": "pots",
            "value": {
                name: name,
                theme: color,
                target: target * 1,
                total : inputValue
            }
        }));

        closeModal();
    }

    const editPot = () => {
        dispatch(updateData({
            path: "pots/" + prop.id,
            partial: {
                "name"  : name,
                "theme" : color,
                "total" : changeTotal * 1,
                "target": target * 1,
            }
        }));

        closeModal();
    }

    const deletePot = () => {
        dispatch(removeData({
            path: "pots/" + prop.id
        }));

        closeModal();
    }

    const handlerKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const msg = validateField(e.currentTarget.name, e.currentTarget.value);
        setErrors(msg);
    }

    const buttons = [
        { name: 'Add Pot', type: 'add', color: { text: 'text-white', background: 'bg-black' }, handler: addPot, },
        { name: "Save Changes", type: "edit", color: { background: 'bg-black', text: 'text-white' }, handler: editPot },
        { name: "Confirm Addition", type: "deposit", color: { text: 'text-white', background: 'bg-black' }, handler: editPot },
        { name: "Confirm Withdrawal", type: "withdraw", color: { text: 'text-white', background: 'bg-black' }, handler: editPot },
        { name: "Yes, Confirm Deletion", type: "remove", color: { background: 'bg-red-500', text: 'text-white' }, handler: deletePot },
        { name: "No, Go Back", type: "remove", color: { background: 'bg-white', text: 'text-gray-500' }, handler: closeModal }
    ];

    //초기화 
    const initialize = () => {
        if (inputValue === 0 &&
            prop &&
            typeof prop.total === "number" &&
            typeof prop.target === "number" &&
            prop.target !== 0
        ) {
            const pct = Number(((prop.total / prop.target) * 100).toFixed(2));
            setCrrentPct(pct);
            setChangeTotal(prop.total);
            setError("");
            if (type == "deposit") { //저금할때
                setDiffPct(0);
                setChangePct(0);
            }
            if (type == "withdraw") {//출금할때
                setDiffPct(pct);
                setChangePct(0);
            }
        }
    }

    //load될때 초기화
    useEffect(() => {
        initialize();
        setError("");
    }, [type]);

    useEffect(() => {
        initialize();
        setError("");
        const timeout = setTimeout(() => {
            if (!prop) {
                setError("Pot이(가) 정의되지 않았습니다.1");
                return;
            }
            let newTotal = prop.total;
            if (inputValue > 0) {
                if (type == "deposit") newTotal += inputValue;
                else if (type == "withdraw") newTotal -= inputValue;

                if (prop &&
                    typeof prop.total === "number" &&
                    typeof prop.target === "number" &&
                    prop.target !== 0
                ) {
                    const newPct = (newTotal / prop.target) * 100; //변경된 total 퍼센트 
                    const minusPct = (inputValue / prop.target) * 100; //입력한 total 퍼센트
                    const current = (prop.total / prop.target) * 100; //현재 퍼센트
                    const changeTotalPct = (changeTotal / prop.target) * 100;

                    setCrrentPct(currentPct);// add 일때
                    setChangeTotal(newTotal); // 뺄때 변동 % 프로그래스바 

                    if (type == "withdraw") {
                        if (inputValue > prop.total) { //저금액보다 입력값이 초과한 경우
                            setDiffPct(0); //기존 그래프 0%
                            setChangePct(current);  //출금 그래프 기존금액 % 길이 넣음
                        } else {
                            setDiffPct(newPct);
                            setChangePct(minusPct);
                        }
                    } else {
                        setChangePct(changeTotalPct); //변경된 total 값 퍼센트 
                        setDiffPct(newPct); // add 일때
                        setChangePct(minusPct);
                    }
                }
            } else {
                initialize();
            }
        }, 1000); //1초 후
        return () => clearTimeout(timeout);
    }, [inputValue, prop, type])

    const customEdit = () => {
        return (
            <div>
                <div className="pb-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-500">Pot Name</label>
                    <input type="text" name="name" placeholder="e.g.Rainy Days" defaultValue={name}  onChange={(e) => setName(e.target.value)} onKeyUp={handlerKeyUp} maxLength={30} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <p className="text-xs text-right text-gray-400 pt-1">30 characters left</p>
                </div>

                <div className="pb-3">
                    <label className="block text-sm font-medium text-gray-700">Target</label>
                    <input type="text" name="target" defaultValue={target} onChange={(e) => getMaximum(e.target.value)} onKeyUp={handlerKeyUp} placeholder="$ e.g.2000" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="pb-3">
                    <label className="text-sm font-sm text-gray-700">Theme</label>
                    <Select items={_color} name="color" defaultValue={_color[selectedIndex]?.value} onSelectChanged={setColor}></Select>
                </div>

                {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}

            </div>
        )
    }
    const customUpdate = () => {
        return (
            <div>
                <div className="flex justify-between">
                    <span className="text-xs text-gray-500">New Amount</span>
                    <span className="text-3xl font-semibold ">${changeTotal.toFixed(2)}</span>
                </div>
                {type == "deposit" ? (// 저금추가
                    <>
                        {/* 그래프 */}
                        <div className="flex w-full h-3 bg-gray-100 gap-0.5">
                            <div className='h-3 bg-black rounded-s-lg' style={{ width: `${currentPct}%` }}></div>  {/* 기존 그래프 */}
                            <div className='h-3 bg-green-800 overflow-x-hidden rounded-r-lg' style={{ width: `${changePct}%` }}> </div> {/* 변동 그래프 */}
                        </div>
                        {/* 기존 target 퍼센트, +,-퍼센트 */}
                        <div className="flex justify-between">
                            <span className="text-xs text-green-800 ">{diffPct.toFixed(2)} %</span>
                            <span className="text-xs gray-100">Target of ${prop?.target}</span>
                        </div>
                    </>
                ) : (
                    // 저금빼기 
                    <>
                        <div>
                            {/* 그래프 */}
                            <div className="flex w-full h-3 bg-gray-100 gap-0.5">
                                <div className='h-3 bg-black rounded-s-lg' style={{ width: `${diffPct}%` }}></div>{/* 기존 그래프 */}
                                <div className=' h-3  bg-red-600 overflow-x-hidden rounded-r-lg' style={{ width: `${changePct}%` }}></div>{/* 변동 그래프 */}
                            </div>
                        </div>
                        {/* 기존 target 퍼센트, +,-퍼센트 */}
                        <div className="flex justify-between">
                            <span className="text-xs text-red-600 rounded-s-lg">{diffPct.toFixed(2)} %</span>
                            <span className="text-xs gray-100">Target of ${prop?.target}</span>
                        </div>
                    </>

                )}

                <div className="pb-3">
                    <label className="block text-sm font-medium text-gray-700">{MODAL_TEXT["pots"]?.[type]["input"]}</label>
                    <input
                        onChange={(e) => { setInputValue(Number(e.target.value)) }}
                        type="text" name="total" placeholder="$" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
            </div>
        )
    }

    const formComponents: Record<string, JSX.Element> = {
        add: customEdit(),
        edit: customEdit(),
        remove: <></>,
        deposit: customUpdate(),
        withdraw: customUpdate()
    }


    return (
        <Modal isOpen={isOpen}
            closeModal={closeModal}
            title={MODAL_TEXT["pots"]?.[type]["title"]}
            description={MODAL_TEXT["pots"]?.[type]["description"]}
            buttons={buttons}
            type={type}
        >
            {formComponents[type] ?? <></>}
        </Modal>
    )


};

    // const validate = () => {
    //     let isResult = true;
    //     const parsed = Number(inputValue);
    //     if (inputValue == 0 || isNaN(Number(inputValue))) {
    //         setError("숫자를 입력해 주세요");
    //         isResult = false;
    //         return;
    //     }
    //     if (!Number.isInteger(inputValue)) {
    //         setError("정수만 입력해 주세요");
    //         isResult = false;
    //         return;
    //     }
    //     if (parsed <= 0) {
    //         setError("1이상 입력해 주세요");
    //         isResult = false;
    //         return;
    //     }
    //     if (type == "deposit" && prop && typeof prop.target === "number" && parsed > prop.target && (parsed + prop.total) > prop.target) {
    //         setError(`입력한 값 또는 입력한 값 + Total 합은 목표 금액($${prop.target}) 보다 클 수 없습니다.`);
    //         isResult = false;
    //         return;
    //     }
    //     if (type == "withdraw" && prop && typeof prop.target === "number" && parsed > prop.total) {
    //         setError(`출금 가능한 금액($${prop.target})을 초과할 수 없습니다.`);
    //         isResult = false;
    //         return;
    //     }

    //     return isResult;
    // }
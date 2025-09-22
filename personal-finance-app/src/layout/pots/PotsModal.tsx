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
import { ProgressBar } from "./ProgressBar";
import { calculateProgress } from "../../constants/calculateProgress";

export const PotsModal = ({ isOpen, closeModal, prop, type }: modal) => {
    if (!isOpen) return null;
    const [name, setName] = useState(prop?.name ?? "");
    const [color, setColor] = useState(prop?.theme ?? "");
    const [target, setTarget] = useState(prop?.target ?? "");

    const [inputValue, setInputValue] = useState<number>(0);
    const [changeTotal, setChangeTotal] = useState<number>(0);
    const [changePct, setChangePct] = useState<number>(0);
    const [diffPct, setDiffPct] = useState<number>(0);
    const [displayPct, setDisplayPct] = useState<number>(0);

    const [error, setError] = useState("");
    const customColor: string[] = useSelector(selectedTheme);

    const dispatch = useAppDispatch();

    const _color = COLOR.map((v) => {
        if (customColor.includes(v.key)) {
            v.disabled = true;
        };
        return v;
    }).sort((a, b) => Number(b.disabled) - Number(a.disabled));

    const selectedIndex = _color.findIndex((v) => v.disabled == false);


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
                total: inputValue
            }
        }));
        closeModal();
    }

    const editPot = () => {
        dispatch(updateData({
            path: "pots/" + prop.id,
            partial: {
                "name": name,
                "theme": color,
                "total": changeTotal * 1,
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
        setError(msg);
    }

    const buttons = [
        { name: 'Add Pot', type: 'add', color: { text: 'text-white', background: 'bg-black' }, handler: addPot, },
        { name: "Save Changes", type: "edit", color: { background: 'bg-black', text: 'text-white' }, handler: editPot },
        { name: "Confirm Addition", type: "deposit", color: { text: 'text-white', background: 'bg-black' }, handler: editPot },
        { name: "Confirm Withdrawal", type: "withdraw", color: { text: 'text-white', background: 'bg-black' }, handler: editPot },
        { name: "Yes, Confirm Deletion", type: "remove", color: { background: 'bg-red-500', text: 'text-white' }, handler: deletePot },
        { name: "No, Go Back", type: "remove", color: { background: 'bg-white', text: 'text-gray-500' }, handler: closeModal }
    ];

    useEffect(() => {
        const state = calculateProgress({ target: prop?.target, total: prop?.total, type, inputValue })
        setDiffPct(state.diffPct);
        setChangePct(state.changeTotalPct);
        setChangeTotal(state.changeTotal);
        setDisplayPct(state.displayPct)
    }, [inputValue, prop, type]);


    const customEdit = () => {
        return (
            <div>
                <div className="pb-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-500">Pot Name</label>
                    <input type="text" name="name" placeholder="e.g.Rainy Days" defaultValue={name} onChange={(e) => setName(e.target.value)} onKeyUp={handlerKeyUp} maxLength={30} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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

                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

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

                <ProgressBar type={type} target={prop?.target} changePct={changePct} diffPct={diffPct} displayPct={displayPct} />

                <div className="pb-3">
                    <label className="block text-sm font-medium text-gray-700">{MODAL_TEXT["pots"]?.[type]["input"]}</label>
                    <input
                        onChange={(e) => { setInputValue(Number(e.target.value)) }}
                        onKeyUp={handlerKeyUp} 
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
export const ProgressBar = ({ target, type, diffPct, changePct, displayPct}: any) => {

    return (
        <>
            <div className="flex w-full h-3 bg-gray-100 gap-0.5">
                 {/* 기존 퍼센트 */}
                <div className='h-3 bg-black rounded-s-lg' style={{ width: `${diffPct}%` }}/>
                {/* 변동 퍼센트 */}
                <div 
                    className={`h-3 overflow-x-hidden rounded-r-lg ${type === "deposit" ? 'bg-green-800 ' : 'bg-red-600'} `}
                    style={{ width: `${changePct}%` }}
                />
            </div>
            <div className="flex justify-between">
                <span className={`text-xs  ${type === "deposit" ? 'text-green-800' : ' text-red-600'} `}>
                    {displayPct.toFixed(2)} %
                </span>
                <span className="text-xs gray-100">
                    Target of ${target}
                </span>
            </div>
        </>
    )
}


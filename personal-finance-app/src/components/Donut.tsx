export type donut = {
  total: number,
  spent: number,
  data: {
    color: string,
    value: number
  }[]
};

const rounding = (info: donut) => {
  const _data = info.data;

  // get raw point
  const raw = _data.map((v,i)=> Math.round((v.value/info.total)*100));

  // get raw total point
  const rawTotal = raw.reduce((a,b)=> a+b);

  const percent = raw.map((v,i)=> Math.round(v*100/rawTotal));

  // 반올림 하는거 잘 분배하는 필요!
  info.data.map((v,i)=> ({
    ...v,
    value: percent[i]
  })); 

  return info;
};

export const Donut = ({ info }: { info: donut}) => {
    let offset = 0;
    const test = rounding(info);

    return (
        <div className="flex justify-center itmes-center">
            <div className="relative">
               <svg width={300} height={300} viewBox="0 0 42 42">
              //기본 배경 원
                <circle
                  cx="21"
                  cy="21"
                  r="15.9"
                  stroke="lightgray"
                  stroke-width="5"
                  fill="transparent"
                />
                {
                  test.data?.map((v, i)=> {
                    const dd = -offset;
                    offset += v.value;

                    return (
                      <>
                        <g key={i}>
                          <circle
                            cx="21"
                            cy="21"
                            r="15.9"
                            stroke={v.color}
                            stroke-width="5"
                            fill="transparent"
                            stroke-dasharray={`${v.value} ${100-v.value}`}
                            stroke-dashoffset={dd}
                        />                        
                        </g>
                      </>
                    )
                  })
                }
  
              </svg> 
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-bold m-2">
                  ${info.spent}
                </p>
                <p className="text-xs text-gray-400">
                  of ${info.total} limit
                </p>
              </div>
            </div>
        </div>
    )




}
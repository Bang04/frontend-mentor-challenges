export type donut = {
  total: number,
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
  info.data.map((v,i)=> {
    v.value = percent[i];
    return v;
  }); 

  return info;
};

export const Circular = ({ info }: { info: donut}) => {
    let offset = 0;
    const test = rounding(info);

    return (
        <div className="flex justify-center itmes-center">
            <div className="relative">
              <svg width={200} height={200} viewBox="0 0 42 42">
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
                    )
                  })
                }
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-sky-500">
                70%
              </div>
            </div>
        </div>
    )




}
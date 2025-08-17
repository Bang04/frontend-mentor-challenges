import { useSelector } from "react-redux";
import { selectChartData, selectRoundingValues } from "../store/selectors/chartSelector";


export const Donut = () => {
    let offset = 0;

    const chartData = useSelector(selectChartData);
    const graphData = useSelector(selectRoundingValues);

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
                  strokeWidth="5"
                  fill="transparent"
                />
                {
                  graphData?.map((v, i)=> {
                    const moffset = -offset;
                    offset += v.value;

                    return (
                        <g key={i}>
                          <circle
                            cx="21"
                            cy="21"
                            r="15.9"
                            stroke={v.theme}
                            strokeWidth="5"
                            fill="transparent"
                            strokeDasharray={`${v.value} ${100-v.value}`}
                            strokeDashoffset={moffset}
                        />                        
                        </g>
                    )
                  })
                }
  
              </svg> 
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-bold m-2">
                  { chartData?.sumSpent }
                </p>
                <p className="text-xs text-gray-400">
                  of { chartData?.totalAmount } limit
                </p>
              </div>
            </div>
        </div>
    )




}
import { useSelector } from "react-redux";
import { selectChartData, selectRoundingValues } from "../store/selectors/chartSelector";

type chartProps = {
  chartSize: number;
  outerThickness: number;
  innerThickness: number;
  startAngle: number;
  opacity: number;
}

const hexToRgba = (hex: string, alpha = 1) => {
  let h = hex.replace("#", "");
  if (h.length === 3) {
    h = h.split("").map(c => c + c).join("");
  }
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const Donut:React.FC<chartProps> = (props: chartProps) => {
    const chartData = useSelector(selectChartData);
    const graphData = useSelector(selectRoundingValues);

    const size = props.chartSize;

    const cx = size / 2;
    const cy = size / 2;

    const outerR = cx - props.outerThickness / 2;
    const innerR = outerR - props.outerThickness / 2 - props.innerThickness / 2;

    const co = 2 * Math.PI * outerR;
    const ci = 2 * Math.PI * innerR;

    let accOuter = 0;
    let accInner = 0;

    const rotate = `rotate(${props.startAngle} ${cx} ${cy})`;

    const total = graphData?.reduce((p,n)=> p + n.value, 0);

    return (
        <div className="flex justify-center itmes-center">
            <div className="relative">
               <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img">
                <g transform={rotate}>
                  //기본 배경 원
                  <circle
                    cx={cx}
                    cy={cy}
                    r={outerR}
                    stroke="lightgray"
                    strokeWidth={props.outerThickness}
                    fill="none"
                    strokeLinecap="butt"
                  />
                {
                  graphData?.map((v, i)=> {
                    const proportion = v.value / (total ?? 100)

                    const outerLength = proportion * co;
                    const innerLength = proportion * ci;
                    
                    const dashoffOuter = -accOuter;
                    const dashoffInner = -accInner;

                    accOuter += outerLength;
                    accInner += innerLength;

                    return (
                        <g key={i}>
                          <circle
                            cx={cx}
                            cy={cy}
                            r={innerR}
                            stroke={hexToRgba(v.theme, props.opacity)}
                            strokeWidth={props.innerThickness}
                            fill="none"
                            strokeDasharray={`${innerLength} ${ci - innerLength}`}
                            strokeDashoffset={dashoffInner}
                            strokeLinecap="butt"
                        />                        
                          <circle
                            cx={cx}
                            cy={cy}
                            r={outerR}
                            stroke={v.theme}
                            strokeWidth={props.outerThickness}
                            fill="none"
                            strokeDasharray={`${outerLength} ${co - outerLength}`}
                            strokeDashoffset={dashoffOuter}
                            strokeLinecap="butt"
                        />                        
                        </g>
                      
                    )
                  })
                }
                 </g>
              </svg> 
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-bold m-2">
                  { "$" + chartData?.sumSpent }
                </p>
                <p className="text-xs text-gray-400">
                  of { "$" + chartData?.totalAmount } limit
                </p>
              </div>
            </div>
        </div>
    )




}
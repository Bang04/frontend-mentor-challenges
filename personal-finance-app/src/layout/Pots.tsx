import { useSelector } from "react-redux";
import { rootState } from "../store"
import { Card } from "../components/Card"

export const Pots = () => {
 const _data = useSelector((state:rootState)=> state.dataReducer);
    return (
        <div className="flex flex-wrap md:flex-row justify-center">
            {
                _data.pots.length > 0 ? (
                _data.pots.map((item, index) => (
                    <div className="flex w-full  md:w-1/2 ">
                        <Card key={index} >
                            <div>
                                <div>{item.name}</div>
                                <div><img src="" alt="" /></div>
                            </div>
                            <div>
                                <div  className="flex justify-between">
                                    <span>Total Saved</span>
                                    <span>${item.total}</span>
                                </div>
                                <div>
                                    <div>그래프</div>
                                </div>
                                <div  className="flex justify-between">
                                    <span>%</span>
                                    <span>Target of ${item.target}</span>
                                </div>
                                <div className="flex justify-between">
                                    <button className="text-lg bg-gray-100 font-semibold hover:bg-white  py-4 px-13 rounded-lg">+Add Money</button>
                                    <button className="text-lg bg-gray-100 font-semibold hover:bg-white  py-4 px-16 rounded-lg">Withdraw</button>
                                </div>
                            </div>
                        </Card>
                    </div>
                   
                ))
                ) : (
                <div>No results found</div>
                )
            }
        </div>
  );
};
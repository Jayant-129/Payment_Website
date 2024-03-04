import { useState } from "react";
import {useSearchParams , useNavigate} from 'react-router-dom';
import axios from "axios";

export default function Send({}){
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();
    return(
    <div className="flex justify-center h-screen">
        <div className = "flex flex-col justify-center h-full">
            <div className="shadow-2xl h-max w-96 rounded-lg pt-6 pl-8 pr-7">
                <div className="text-center text-4xl pt-4 font-bold">
                        Send Money
                </div>
                <div className="flex justify-start mt-10"> 
                    <div className="rounded-full bg-green-400 flex justify-center h-12 w-12">
                        <div className="flex flex-col justify-center">
                            {name[0].toUpperCase()}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center ml-4 text-2xl font-bold">
                        {name}
                    </div>
                </div>
                <div className="text-sm">
                    Amount (in Rs)
                </div>
                <input onChange={(e) => {
                    setAmount(e.target.value);
                }}
                placeholder="Enter Amount" className="mt-1 p-2 mb-4 w-full rounded-md border-2"/>
                <div className="mt-2 mb-6">
                  <button onClick={ async () => {
                        await axios.post("http://localhost:3000/api/v1/account/transfer", {
                            to: id,
                            amount
                        }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        });
                        navigate('/dashboard');
                  }}
                  type="button" class="w-full focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Intialize Transfer</button>
                </div>
            </div>
        </div>
    </div>
)};
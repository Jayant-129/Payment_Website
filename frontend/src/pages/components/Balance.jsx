import axios from "axios"
import React, { useState, useEffect } from 'react';

export default function Balance(){
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            setBalance(response.data.balance);
        };

        fetchBalance();
    }, []);

    return <div className="flex">
        <div className="text-2xl font-bold">
            Your Balance
        </div>
        <div className="text-2xl font-md ml-4">
            ${balance}
        </div>
    </div>
}
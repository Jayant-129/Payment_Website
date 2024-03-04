import { Link } from 'react-router-dom';
export default function BottomWaring({label,buttonText, to}){
    return(
    <div className="flex justify-center text-gray-500 py-2">
        <div>
            {label}
        </div>
        <Link className = "cursor-pointer underline pl-1" to={to}> 
        {buttonText}</Link>
    </div>
    )
};
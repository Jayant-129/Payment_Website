export default function InputBox({label,placeholder, onChange}){
    return(
        <div className="mx-7 py-2">
            <div className = "font-semibold text-sm text-left py-2">
                {label}
            </div>
            <input onChange={onChange} className = "w-full px-2 mt-2 border-2 py-1 rounded-md" type ="text" placeholder={placeholder}/>
        </div>
    )
}
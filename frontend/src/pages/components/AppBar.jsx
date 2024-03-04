export default function AppBar(){
    return <div className="h-14 shadow flex justify-between">
        <div className = "flex flex-col justify-center h-full ml-4 font-bold text-2xl">
                PayTM App
        </div>
        <div className="flex">
            <div className= "flex flex-col justify-center h-full mr-4">
                    Hello, User
            </div>
            <div className = "rounded-full h-12 w-12 bg-slate-200 flex justify-center mr-2 mt-1 cursor-pointer">
                <div className="flex flex-col justify-center">
                    U
                </div>
            </div>
        </div>
    </div>
}
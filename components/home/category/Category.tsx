import { ActionTypes, GlobalContext } from "@/lib/store/Layout"
import { useContext } from "react"
import { BsChat, BsChatDotsFill, BsPeople, BsPeopleFill } from "react-icons/bs"

const Category = () => {
    const dispatcher = useContext(GlobalContext)
    return (
        <>
            <nav className='p-4'>
                <section className='w-full p-3 flex items-center justify-center'>
                    <div onClick={() => dispatcher?.dispatch({ type: ActionTypes.ACTIVED })} className={` w-[6rem] flex justify-center p-2 rounded-bl-full rounded-tl-full ${dispatcher?.state.isActive.chat ? "bg-orange-50 text-stone-600" : "bg-stone-700 text-stone-100"} `}>
                        {
                            dispatcher?.state.isActive.chat ? <BsChatDotsFill size={30} /> : <BsChat size={30} />
                        }
                    </div>
                    <div onClick={() => dispatcher?.dispatch({ type: ActionTypes.UNACTIVED })} className={` w-[6rem] flex justify-center p-2 rounded-br-full rounded-tr-full ${dispatcher?.state.isActive.people ? "bg-orange-50 text-stone-600" : "bg-stone-700 text-stone-100"} `}>
                        {
                            dispatcher?.state.isActive.people ? <BsPeopleFill size={30} /> : <BsPeople size={30} />
                        }
                    </div>
                </section>
            </nav>
        </>
    )
}

export default Category
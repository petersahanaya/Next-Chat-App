import { RiSearch2Line } from "react-icons/ri"

const Search = () => {
    return (
        <>
            <header className="flex pt-3 justify-center items-center relative w-[80vw] m-auto">
                <input className="p-2 rounded-full text-[.8rem] bg-stone-600 text-stone-200 pl-10  w-full placeholder:text-stone-300 outline-none" type="text" placeholder="search" />
                <span className="text-stone-100 absolute left-[5px] top-[18px]">
                    <RiSearch2Line size={20} />
                </span>
            </header>
        </>
    )
}

export default Search
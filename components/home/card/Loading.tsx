const CardLoading = () => {
    const loadArr = [1, 2, 3, 4, 5, 6]
  return (
    <main>
        {loadArr.map((_, i) => (
            <section key={i} className={`w-full h-[5rem] bg-stone-800 flex items-center px-4 animate-pulse`}>
            <div className="w-[65px] h-[65px] overflow-hidden bg-stone-500 rounded-full">
            </div>
            <div className="relative h-full w-[13rem]">
                <span className="text-sm relative flex top-[8px] left-[5px] justify-between items-center w-full">
                    <div className="w-[8rem] h-[1rem] bg-stone-500 rounded-full"></div>
                    <div className="w-[3rem] h-[1rem] bg-stone-500 rounded-full"></div>
                </span>
                <span className="w-[13rem] overflow-hidden">
                    <div className="w-full mt-8 ml-[5px] bg-stone-500 h-[1rem] rounded-full"></div>
                </span>
            </div>
        </section>
        ))}
    </main>
  )
}

export default CardLoading
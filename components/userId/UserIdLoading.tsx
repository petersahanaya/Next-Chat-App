const UserIdLoading = () => {
    const loadArr = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <main className="w-screen h-screen bg-stone-900">
        <header className="w-screen bg-stone-800 h-[12vh] flex justify-around items-center animate-pulse">
            <section>
                <div className="w-[4rem] h-[4rem] rounded-full bg-stone-600"></div>
            </section>
            <span className="bg-stone-600 w-[6rem] p-2 rounded-full "></span>
            <span className="bg-stone-600 w-[2rem] p-2 rounded-full "></span>
        </header>
        <nav className="w-screen h-screen flex flex-col gap-4 mt-4 p-2">
            {loadArr.map((load, i) => (
                <section className={`bg-stone-600 p-3 w-[12rem] animate-pulse ${load % 2 == 0 ? "place-self-end rounded-tl-full rounded-bl-full rounded-tr-full" : "place-self-start rounded-tl-full rounded-br-full rounded-tr-full"}`} key={i}>
                    <div></div>
                </section>
            ))}
        </nav>
        <footer className="flex animate-pulse w-screen h-[12vh] bg-stone-800 fixed bottom-0 right-0 justify-center items-center">
            <div className="w-[12rem] p-5 rounded-tl-full  rounded-bl-full bg-stone-600"></div>
            <span className="w-[3rem] h-[3rem] rounded-tr-full  rounded-br-full bg-stone-600"></span>
        </footer>
    </main>
  )
}

export default UserIdLoading
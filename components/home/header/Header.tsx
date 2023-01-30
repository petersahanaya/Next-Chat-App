import { SessionUser } from "@/types/types";
import { IoIosNotifications } from "react-icons/io";
import { RiUserSearchLine } from "react-icons/ri";
import Image from "next/image";

const Header = ({ name, email, id, image }: SessionUser) => {
  return (
    <header className="w-screen bg-stone-800 h-[13vh] flex justify-around items-center px-2">
      <nav className="flex flex-col justify-center w-full h-full">
        <section className="flex items-center gap-2">
          <div className="w-[60px] h-[60px] relative rounded-full overflow-hidden shadow-sm">
            <Image src={image!} priority alt={`${name} profile`} fill />
          </div>
          <div>
            <p className="text-stone-300 text-sm">Sign In as</p>
            <p className="text-orange-50 font-[500]">{name}</p>
          </div>
        </section>
      </nav>
      <section className="flex items-center gap-2 mr-4">
      <span className="font-bold text-stone-50">
        <IoIosNotifications size={30} />
      </span>
      <span className="text-stone-700 bg-orange-50 rounded-full p-2 font-bold">
        <RiUserSearchLine size={25}/>
      </span>
      </section>
    </header>
  );
};

export default Header;


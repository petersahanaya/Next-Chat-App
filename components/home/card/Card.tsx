import { GlobalContext } from "@/lib/store/Layout";
import Link from "next/link";
import { UserType } from "@/types/types";
import { useContext } from "react";
import useSWR, { Fetcher } from "swr";
import { GoPrimitiveDot } from "react-icons/go";
import CardLoading from "./Loading";
import Images from "@images";
import { BASEURL } from "@/lib/url";
import { useSession } from "next-auth/react";

const fetcher: Fetcher<{ users: UserType[] }> = async (url: string) => {
  const res = await fetch(url);
  return await res.json();
};

const Card = () => {
  const dispatcher = useContext(GlobalContext);
  const { data : session } = useSession()
  const query = dispatcher?.state.isActive.people ? "/api/users" : `/api/friend?userId=${session?.user.id}`

  const { data: Users, isLoading } = useSWR(
    `${BASEURL + query}`,
    fetcher
  );

  if (isLoading) {
    return <CardLoading />;
  }

  return (
    <main>
        <>
          <div className="pb-3 px-4 flex justify-start gap-3 items-center">
            <span className="text-green-500">
              <GoPrimitiveDot size={20} />
            </span>
            <p className="text-stone-300">{dispatcher?.state.isActive.people ? "Stranger's" : "Friend's"}</p>
          </div>
          {Users?.users.map((user, i) => (
            <Link key={i} href={`/user/${user.userId}`}>
              <section className="w-full h-[5rem] bg-stone-800 flex items-center px-4">
                <div className="w-[65px] h-[65px] overflow-hidden">
                  <Images
                    profile={user.profile!}
                    width={65}
                    height={65}
                    radius="rounded-full"
                  />
                </div>
                <div className="relative h-full w-[16rem]">
                  <span className="text-sm relative flex top-[8px] left-[5px] justify-between items-center w-full">
                    <p className="font-[500] text-stone-200 text-sm">
                      {user.username}
                    </p>
                    <p className="text-stone-400 text-[.7rem]">13 : 23</p>
                  </span>
                  {
                    <span className="w-[15rem] overflow-hidden">
                      <p className="text-stone-300 text-[.8rem] text-ellipsis inline-block whitespace-nowrap overflow-hidden w-full pt-4 pl-[8px]">
                        message are end to end encrypt and really really secure
                        so its totally okay
                      </p>
                    </span>
                  }
                </div>
              </section>
            </Link>
          ))}
        </>
    </main>
  );
};

export default Card;

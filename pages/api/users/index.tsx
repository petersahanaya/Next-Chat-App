import { UserType } from "@/types/types";
import { CollectionDB } from "@/lib/db/collections/collection";
import { NextApiHandler } from "next";

const handler : NextApiHandler = async (req, res) => {
    if(req.method === "GET") {
        try {
            const Users = await CollectionDB<UserType>("users")
            
            const users = await Users?.find({}, {projection : {_id : 0, email : 0}}).toArray()

            return res.json({users})
        }catch(e) {
            console.error(e)
            return res.json({msg : e})
        }
    }
}

export default handler
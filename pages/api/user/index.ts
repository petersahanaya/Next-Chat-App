import { CollectionDB } from "@/lib/db/collections/collection"
import { NextApiHandler } from "next"
import { UserType } from "@/types/types"

const handler : NextApiHandler = async (req, res) => {
    if(req.method === "GET") {
        const { userId } = req.query as {userId : string}
        try {
            const User = await CollectionDB<UserType>("users")
            
            const found = await User?.findOne({userId}, {projection : { _id : 0 }})

            if(!found) return res.status(400).json({msg : "Cannot found user.."})

            return res.json({user : found})
        }catch(e) {
            console.error(e)
            return res.status(400).json({msg : e})
        }
    }
}

export default handler
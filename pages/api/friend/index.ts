import { CollectionDB } from "@/lib/db/collections/collection";
import { ChatPostType, RoomChatType, UserType } from "@/types/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    if (req.method === "GET") {
        const { userId } = req.query as { userId: string }
        try {
            const Friend = await CollectionDB<ChatPostType>("chat")
            const User = await CollectionDB<UserType>("users")
            const Room = await CollectionDB<RoomChatType>("room-chat")

            const rooms = await Room?.find({}, { projection: { _id: 0 } }).toArray()

            const getUser = async (): Promise<UserType[]> => {
                let allUsers = [] as UserType[]

                for (let i = 0; i < rooms!.length; i++) {
                    const founded = rooms![i].room.includes(userId)

                    if (founded) {
                        const filtered = rooms![i].room.filter(room => room !== userId) ?? []

                        // const user = await Friend?.findOne({ roomId: rooms![i].roomId })

                        const get = await User?.findOne({ userId : filtered[0] }, { projection: { _id: 0 } }) as UserType

                        allUsers = [...allUsers, get]
                    }
                }
                return allUsers
            }

            return res.json({ users: await getUser() })
        } catch (e) {
            res.status(400).json({ msg: e })
            console.error(e)
        }
    }

}

export default handler
import { CollectionDB } from "@/lib/db/collections/collection"
import { ChatPostType, ChatType, RoomChatType } from "@/types/types"
import crypto from 'crypto'
import { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, res) => {
    if (req.method === "POST") {
        const { profile, receiverProfile, receiverUserId, receiverUsername, userId, username, message } = req.body as ChatPostType

        const Chat = await CollectionDB<ChatPostType>("chat")
        const RoomChat = await CollectionDB<RoomChatType>("room-chat")

        try {
            const foundedRoom = await RoomChat!.find({}, { projection: { _id: 0 } }).toArray()

            const find = foundedRoom.find((foundedRoom) => foundedRoom.room.includes(receiverUserId) && foundedRoom.room.includes(userId))
            
            if (!find) {
                const uuid = crypto.randomUUID()
                const PostedRoom = await RoomChat?.insertOne({ room: [receiverUserId, userId], roomId: uuid, createdAt : new Date().toISOString() })
            }

            const checkRoomId = await RoomChat!.find({}, { projection: { _id: 0 } }).toArray()

            const find2 = checkRoomId.find((foundedRoom) => foundedRoom.room.includes(receiverUserId) && foundedRoom.room.includes(userId))

            const PostedChat = await Chat?.insertOne({ profile, receiverProfile, receiverUserId, receiverUsername, userId, username, message, roomId: find2?.roomId, createdAt : new Date().toISOString() })

            return res.json({ msg: "Posted" })
        } catch (e) {
            console.error(e)
            return res.status(400).json({ msg: e })
        }
    }

    if (req.method === "GET") {
        const { receiverUserId, userId } = req.query as { receiverUserId: string, userId: string }

        try {
            const Chat = await CollectionDB<ChatType>("chat")
            const RoomChange = await CollectionDB<RoomChatType>("room-chat")

            const foundedRoom = await RoomChange!.find({}, { projection: { _id: 0 } }).toArray()

            const roomId = foundedRoom.find((room) => room.room.includes(receiverUserId) && room.room.includes(userId))

            if (!roomId) return res.json({ chat: [] })

            const find = await Chat?.find({ roomId: roomId.roomId }, { projection: { _id: 0 } }).toArray()

            if (!find || !find.length) return res.json({ chat: [] })

            return res.json({ chat: find })
        } catch (e) {
            console.error(e)
            return res.status(400).json({ msg: e })
        }
    }
}

export default handler
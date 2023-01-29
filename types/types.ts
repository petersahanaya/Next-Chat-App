import { ObjectId, ObjectID } from "bson"

export type UserType = {
    _id? : ObjectID,
    userId : string
    username : string,
    email : string,
    profile : string
}

export type ChatType = {
    _id? : ObjectID
    userId : string,
    username : string,
    profile : string,
    receiverUserId : string,
    receiverUsername : string,
    receiverProfile : string,
    roomId? : string,
    createdAt? : string
}

export type RoomChatType = {
    _id? : ObjectID,
    room : [string, string],
    roomId : string,
    createdAt? : string
}

export type ChatPostType = {
    message : string
} & ChatType

export type SessionUser = {
    name?: string | null ;
    email?: string | null ;
    image?: string | null ;
    id? : string | null
}
import { DbConnect,type DBType } from "../mongo"

export const CollectionDB = async <T>(name : Required<"users" | "chat" | "room-chat">) => {
    try {
        const { db } = await DbConnect() as DBType
        //@ts-expect-error
        const selectedCollection = db.collection<T>(name)
        
        return selectedCollection
    }catch(e) {
        console.error(e)
    }
}
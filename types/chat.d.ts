export interface Chat {
    id: string
    name: string
    conversation_id: string
}

export interface Message {
    id: string
    role: "user" | "assistant"
    answer: string
    chatId: string
}

export interface MessageRequestBody {
    messages: Message[]
    model: string
}
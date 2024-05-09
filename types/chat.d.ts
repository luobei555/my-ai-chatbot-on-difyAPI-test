export interface Chat {
    id: string
    name: string
    conversation_id: string
}

export interface Message {
    id: string
    query: string
    answer: string
}

export interface MessageRequestBody {
    messages: Message[]
    model: string
}
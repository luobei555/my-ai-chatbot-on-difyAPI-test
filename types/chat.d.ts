export interface Chat {
    id: string
    name: string
}

export interface Message {
    query: string
    answer: string
}

export interface MessageRequestBody {
    messages: Message[]
    model: string
}
import * as z from "zod"

export type Message = {
  role: string
  content: string
}

export type GeneratedMessage = {
  role: string
  content: string
  isGenerating: boolean
}

export const messageSchema = z.object({
  message: z.string(),
})

export type messageData = z.infer<typeof messageSchema>

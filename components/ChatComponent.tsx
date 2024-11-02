"use client"
import { generateAIResponse } from "@/lib/generateAIResponse"
import { cn } from "@/lib/utils"
import { GeneratedMessage, messageData } from "@/types"
import { Send } from "lucide-react"
import { KeyboardEvent, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Textarea } from "./ui/textarea"
import UserAvatar from "./UserAvatar"

function ChatComponent() {
  const { handleSubmit, register, reset, watch, getValues } =
    useForm<messageData>({
      defaultValues: {
        message: "",
      },
    })
  const [messages, setMessages] = useState<GeneratedMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messageEndRef = useRef<null | HTMLDivElement>(null)
  const [history, setHistory] = useState<{ role: string; content: string }[]>(
    []
  )

  const scrollToBottom = () =>
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const onSubmit = async (data: messageData) => {
    const message = data.message.trim()
    if (!message) return

    const userMessage = { role: "user", content: message }
    // const updatedUserMessage = {
    //   ...userMessage,
    //   isGenerating: false,
    // }
    // // addMessage(updatedUserMessage)
    reset()
    setIsTyping(true)

    try {
      const fullResponse = await generateAIResponse(message, history)
      const aiMessage = {
        role: "model",
        content: fullResponse,
      }
      updateMessagesWithResponse(userMessage.content, aiMessage.content)
      setHistory([...history, userMessage, aiMessage])
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error generating AI reply"
      handleErrorMessage(errorMessage)
    } finally {
      setIsTyping(false)
    }
  }

  const addMessage = (newMessage: GeneratedMessage) =>
    setMessages(prev => [...prev, newMessage])

  const updateMessagesWithResponse = (
    userMessage: string,
    fullResponse: string
  ) =>
    setMessages(prev => [
      ...prev,
      { role: "user", content: userMessage, isGenerating: false },
      { role: "model", content: fullResponse, isGenerating: false },
    ])

  const handleErrorMessage = (errorMessage: string) =>
    addMessage({ role: "model", content: errorMessage, isGenerating: false })

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      const message = getValues("message")
      onSubmit({ message })
      e.preventDefault()
      return
    }

    // setMessage(e.currentTarget.value)
  }

  return (
    <div className="w-full h-screen flex flex-col mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gemini AI Chatbot</h1>
      <ScrollArea className="w-full flex-1 mb-4 p-4 border rounded-md">
        {messages.map((m, index) => (
          <div
            key={index}
            className={`mb-4 flex gap-2 ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}>
            {m.role !== "user" && <UserAvatar user="AI" />}
            <div
              className={`max-w-[80%] inline-block p-2 rounded-lg ${
                m.role === "user"
                  ? "bg-blue-500 text-white rounded-tr-none"
                  : "bg-slate-200 text-black  rounded-tl-none"
              }`}>
              {m.role === "user" ? (
                <p>{m.content}</p>
              ) : (
                <ReactMarkdown
                  className={cn(
                    "prose max-w-none",
                    m.isGenerating ? "animate-typing" : ""
                  )}
                  components={{
                    code(props) {
                      const { children, className, ...rest } = props
                      const match = /language-(\w+)/.exec(className || "")
                      return match ? (
                        <SyntaxHighlighter
                          PreTag="div"
                          language={match[1]}
                          style={vscDarkPlus}>
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code {...rest} className={className}>
                          {children}
                        </code>
                      )
                    },
                  }}>
                  {m.content || "Thinking..."}
                </ReactMarkdown>
              )}
            </div>
            {m.role === "user" && <UserAvatar user="ME" />}
          </div>
        ))}
        {isTyping && (
          <div className="text-left">
            <p className="inline-block p-2 rounded-lg bg-gray-200"></p>
          </div>
        )}
        <div ref={messageEndRef} />
      </ScrollArea>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex gap-2">
        <Textarea
          {...register("message")}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          className="flex-grow max-h-20"
        />
        <Button
          type="submit"
          name="Send"
          disabled={watch("message").length === 0 || isTyping}>
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </form>
    </div>
  )
}

export default ChatComponent

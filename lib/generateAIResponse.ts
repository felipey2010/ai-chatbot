export const generateAIResponse = async (
  message: string,
  history: { role: string; content: string }[]
): Promise<string> => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.response
  } catch (error) {
    console.error("Error fetching AI response:", error)
    throw new Error("Failed to fetch AI response.")
  }
}

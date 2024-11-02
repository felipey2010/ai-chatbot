# AI CHATBOT

Gemini AI Chatbot is a conversational application designed as a hands-on-board test of chat support with AI. Developed with Next.js, this app uses server-side and client-side rendering for optimized performance and user experience. The chat system retains a history of conversations, making it easy to review previous interactions. Additionally, the message inbox includes form validation via React Hook Form, and the UI is crafted with Shadcn UI components and Tailwind CSS.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#teck-stack)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Contribution](#contribution)

## Features

- **AI-Powered Chat Support**: Engage in real-time conversations with AI support for quick responses..
- **Message History**: Keep track of past messages and conversations.
- **Validation with React Hook Form and Typescript**: Ensure all messages are validated before submission.
- **Enhanced UI with shadcn components**: Enhanced UI with ShadCN Components.
- **Design with Tailwind CSS**: Easy to use css styling.
- **Security**: Utilizes both server-side and client-side rendering with Next.js.

## Tech Stack

- Next.js (latest version)
- React Hook Form for form validation
- ShadCN UI for reusable UI components
- Tailwind CSS for styling
- TypeScript for type-safe development
- Gemini API model for AI responses

### Installation

- Clone the repository `https://github.com/felipey2010/ai-chatbot.git`
- Install dependencies: `npm install`
- Set up environment variable. Visit [Google AI Studio](https://aistudio.google.com/apikey) to get your API key.
- Include .env in your .gitignore
- Build your project: `npm run build`
- Start the server: `npm start` or `npm run dev`

Runs on localhost:3000 by default but can be configured using the `PORT` environment variable.

## Configuration

Create a `.env` file in the root directory with the following environment variables:

```bash
GEMINI_API_KEY=
```

## Contribution

If you would like to contribute to the development of this project, please follow these steps:

1. Fork this repository.
2. Create a branch for your feature or bug fix (git checkout -b feature/feature-name).
3. Commit your changes (git commit -am 'Add a new feature').
4. Push to the branch (git push origin feature/feature-name).
5. Create a new Pull Request.

---

This document was prepared by [Felipey](https://github.com/felipey2010) and is subject to change as the project develops.

## How to Build Your Own AI Agent: A Step-by-Step Guide with the Saafir Framework

Today, artificial intelligence (AI) is fundamentally changing software development practices. So, how can you create your own AI-powered assistants or "agents"? In this article, we'll learn step-by-step how to develop intelligent AI agents that can understand your commands and perform tasks on your behalf using the TypeScript-based Saafir framework.

### What is an AI Agent? A Simple Overview

In their simplest definition, AI agents are intelligent software components that automate specific tasks for you, understand and interpret your natural language commands, and can even perform various actions based on these commands (such as calling a function or making an API request). You can think of them as your personal assistants in the digital world.

### Why Choose the Saafir Framework?

While many tools are available, Saafir offers some significant advantages, especially for TypeScript developers:

-   **Smart Type Conversion**: AI models often return text-based responses. Saafir saves you a lot of trouble by automatically converting these texts (e.g., "July 15, 2025" or "true") into the correct JavaScript types (Date, boolean, number, etc.).
-   **Type Safety with Zod**: Thanks to integrated Zod schemas, you can ensure that data coming from or sent to the AI is in the expected format. This significantly reduces runtime errors.
-   **Flexible Integration**: It can be easily integrated with popular Node.js frameworks like Express.js, Fastify, tRPC, and even WebSocket servers.
-   **Multi-language Support**: You can enable your agent to interact with users in English or other supported languages.
-   **Developer-Friendly**: Speeds up the development process with its debug mode and understandable structure.

### Quick Start with Saafir

Incorporating Saafir into your project is quite easy. First, let's install the necessary packages:

```bash
npm install saafir zod openai chalk
# or
bun add saafir zod openai chalk
```

### Creating Your First AI Assistant

Now, let's write our first AI agent that will perform a simple user creation task.

#### 1. Defining Action Schemas and Functions

First, we need to define a Zod schema for the "action" our agent will perform and a function that will execute this action. The schema determines what parameters the AI should collect and in what types.

```typescript
import { Saafir } from 'saafir';
import { z } from 'zod';

// Zod schema for the user creation action
const createUserSchema = z.object({
  name: z.string().describe("The user's full name"),
  email: z.string().email().describe("The user's email address"),
  age: z.number().min(18).describe("The user's age, must be at least 18"),
  isActive: z.boolean().optional().default(true).describe("Whether the user account is active (default: active)")
});

// Function to perform the user creation action
const createUser = async (input: z.infer<typeof createUserSchema>) => {
  console.log('Creating new user:', input);
  // Database record or other operations can be done here
  return { 
    message: `User ${input.name} created successfully. Email: ${input.email}, Age: ${input.age}, Active: ${input.isActive}`,
    userId: `user_${Math.random().toString(36).substr(2, 9)}` 
  };
};
```
*Note: The `.describe()` methods in the schemas help the AI understand the parameters better.*

#### 2. Initializing and Using the Agent

After defining our schema and function, we can initialize the Saafir agent with this information.

```typescript
// ... previous imports and definitions

// Configure the Saafir agent
const userManagerAgent = new Saafir({
  name: "UserManagerAgent", // Give your agent a name
  description: "An AI assistant used to manage user accounts.", // General description of the agent
  apiKey: process.env.OPENROUTER_API_KEY!, // Your OpenRouter API key
  model: "anthropic/claude-3.5-sonnet", // AI model to be used
  language: "English", // Agent's communication language
  debug: true, // To see detailed logs during development
  actions: {
    createUser: { // Give the action a unique name
      call: createUser, // Function to run when this action is called
      schema: createUserSchema, // Parameter schema for this action
      description: "Creates a new user account with the given information." // Description of the action to be understood by the AI
    }
  }
});

// Run the agent by giving a command in natural language
async function main() {
  const userInput = "Create a user named John Doe, with email john@example.com, aged 25.";
  try {
    const response = await userManagerAgent.run(userInput);
    console.log("AI Response:", response);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
// Expected Output (example):
// AI Response: {
//   message: 'User John Doe created successfully. Email: john@example.com, Age: 25, Active: true',
//   userId: 'user_xxxxxxxxx'
// }
```

It's that simple! The natural language command you give to the `userManagerAgent.run()` function is processed by Saafir, the AI model selects the `createUser` action, extracts the necessary parameters (name, email, age) from your sentence, validates them with `createUserSchema`, and finally calls your `createUser` function with these parameters.

### Running Your Saafir Agent in Different Environments

Saafir can be easily integrated with various Node.js backend frameworks. Here are a few popular examples:

#### E-commerce Assistant with Express.js

Imagine an AI assistant for an e-commerce site with capabilities to add products and create orders.

```typescript
import express from 'express';
// ... Saafir and Zod imports ...
// ... productSchema, orderSchema, addProduct, createOrder functions ...
// ... ecommerceAgent definition ...

const app = express();
app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }
    // Assuming ecommerceAgent is defined earlier
    // const response = await ecommerceAgent.run(message); 
    // res.json({ success: true, response });
    // Placeholder for example:
    res.json({ success: true, response: "AI response for Express integration will be here." });
  } catch (error) {
    console.error("Express chat error:", error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown server error occurred.' 
    });
  }
});

app.listen(3000, () => {
  console.log('E-commerce AI assistant is waiting for POST requests at http://localhost:3000/chat.');
});
// Usage: With a POST request {"message": "Add a new laptop, price 25000 TL, category electronics"}
```
*Note: The Express.js example above is shortened for the fluency of the blog post. You may need to adapt the full `ecommerceAgent` definition and action functions according to previous sections or your project structure.*

### Finance Manager with Fastify

An AI that can perform operations like adding expenses or setting budgets for personal finance tracking.

```typescript
import Fastify from 'fastify';
// ... Saafir and Zod imports ...
// ... transactionSchema, budgetSchema, addTransaction, setBudget functions ...
// ... financeAgent definition ...

const fastify = Fastify({ logger: true });

fastify.post<{ Body: { message: string } }>('/finance-chat', async (request, reply) => {
  try {
    const { message } = request.body;
    if (!message) {
      reply.status(400);
      return { error: 'Message cannot be empty' };
    }
    // Assuming financeAgent is defined earlier
    // const response = await financeAgent.run(message);
    // return { success: true, response };
    // Placeholder for example:
    return { success: true, response: "AI response for Fastify integration will be here." };
  } catch (error) {
    fastify.log.error(error);
    reply.status(500);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown server error occurred.' 
    };
  }
});

const startFastify = async () => {
  try {
    await fastify.listen({ port: 3001 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
startFastify();
// Usage: With a POST request {"message": "I spent 500 TL at the market today, category food"}
```
*Note: The Fastify example is also similarly shortened.*

### Task Manager with tRPC

Interacting with AI via tRPC endpoints for project and task management.

```typescript
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
// ... Saafir and Zod imports ...
// ... taskSchema, projectSchema, createTask, createProject functions ...
// ... taskAgent definition ...

const t = initTRPC.create();
const appRouter = t.router({
  taskChat: t.procedure
    .input(z.object({ message: z.string() }))
    .mutation(async ({ input }) => {
      if (!input.message) {
        throw new Error('Message cannot be empty');
      }
      // Assuming taskAgent is defined earlier
      // const response = await taskAgent.run(input.message);
      // return { success: true, response };
      // Placeholder for example:
      return { success: true, response: "AI response for tRPC integration will be here." };
    }),
});

const server = createHTTPServer({ router: appRouter });
server.listen(3002);
console.log('Task management AI assistant tRPC endpoint is running on http://localhost:3002.');
// Usage: By calling the taskChat mutation with a tRPC client {"message": "Create a task named 'Write Saafir article' for tomorrow"}
```
*Note: The tRPC example is also similarly shortened.*

### Real-time Chatbot with WebSocket

Adding AI capabilities to a real-time chat application using `uWebSockets.js` (or a similar WebSocket library).

```typescript
import { App, TemplatedApp } from 'uWebSockets.js'; // uWebSockets.js import corrected
// ... Saafir and Zod imports ...
// ... messageSchema, roomSchema, sendMessage, createRoom functions ...
// ... chatAgent definition ...

const uwsApp: TemplatedApp = App({}); // TemplatedApp type used
uwsApp.ws('/*', {
  message: async (ws, messageBuffer, isBinary) => {
    try {
      const message = Buffer.from(messageBuffer).toString();
      const data = JSON.parse(message);
      if (data.type === 'ai_command' && data.message) {
        // Assuming chatAgent is defined earlier
        // const response = await chatAgent.run(data.message);
        // ws.send(JSON.stringify({ type: 'ai_response', response }));
        // Placeholder for example:
        ws.send(JSON.stringify({ type: 'ai_response', response: "AI response for WebSocket integration will be here." }));
      }
    } catch (error) {
      console.error("WebSocket error:", error);
      ws.send(JSON.stringify({ type: 'error', message: 'Error processing message' }));
    }
  },
});

uwsApp.listen(3003, (token) => {
  if (token) {
    console.log('Chat AI assistant is waiting for WebSocket connections at ws://localhost:3003.');
  } else {
    console.log('Port 3003 could not be opened.');
  }
});
// Usage: By sending a JSON message {"type": "ai_command", "message": "Create general chat room"} via WebSocket.
```
*Note: The WebSocket example is also similarly shortened, and `uWebSockets.js` usage is simplified.*

### Advanced Capabilities of Saafir

Saafir is not just about basic action calls. It also comes with some powerful features to ease your development process.

#### Automatic Type Conversions: Seamless Communication with AI

One of Saafir's biggest conveniences is its ability to automatically convert text-based data from AI into the correct JavaScript types.

```typescript
const advancedSchema = z.object({
  createdAt: z.date().describe("Creation date (e.g., 'today', 'tomorrow at 2 PM')"),
  isActive: z.boolean().describe("Activity status (e.g., 'yes', 'active')"),
  price: z.number().describe("Price information (e.g., '150 USD')"),
  tags: z.array(z.string()).describe("Tags (comma-separated, e.g., 'technology, artificial intelligence')"),
  metadata: z.object({
    version: z.string(),
    author: z.string()
  }).describe("Metadata in JSON format (e.g., '{\'version\': \'1.0\', \'author\': \'John\'}')"),
  categories: z.set(z.string()).describe("Categories (comma-separated, unique)"),
  attributes: z.map(z.string(), z.string()).describe("Attributes in JSON format (key-value pairs)"),
  bigNumberValue: z.bigint().describe("A large number value (e.g., '12345678901234567890')"),
  description: z.string().optional().describe("Description (optional)"),
  priority: z.number().optional().describe("Priority level (optional)")
});
```
These automatic conversions make the data flow between AI and your application extremely smooth.

### Debugging (Debug Mode)

Understanding what's happening during the development phase is crucial. Saafir's `debug: true` option helps you by printing every step of the agent's decision-making process to the console:

```typescript
const agent = new Saafir({
  // ... other settings
  debug: true, // Enable debug mode
});

// Example Console Output:
// [SaafirAgent][DEBUG][2025-06-09T10:30:25.123Z] User input: "Create a new user..."
// [SaafirAgent][DEBUG][2025-06-09T10:30:26.456Z] AI Request: {...}
// [SaafirAgent][DEBUG][2025-06-09T10:30:27.789Z] AI Response: { actionName: 'createUser', parameters: {...} }
// [SaafirAgent][DEBUG][2025-06-09T10:30:27.795Z] Validating parameters for action 'createUser'...
// [SaafirAgent][DEBUG][2025-06-09T10:30:27.800Z] Executing action 'createUser'...
// [SaafirAgent][DEBUG][2025-06-09T10:30:27.850Z] Action 'createUser' executed. Result: {...}
```

#### Multi-language Support and Personalization

You might want your agent to speak different languages with users or adopt a specific personality.

```typescript
const multilingualAgent = new Saafir({
  // ... other settings
  language: "English", // Or "Turkish", "Spanish", "French", etc.
  context: "You are a witty and friendly assistant helping customers on an e-commerce site. You can provide detailed information about products and make recommendations.",
  // Additional information like title, referer can also be sent to the AI model.
});

// When the user says "Yeni bir kullanıcı oluştur adı John",
// if set to English, you might get a response like "New user named John created."
```
The `context` parameter gives the AI model important clues about the agent's role and behavior.

### Conclusion and Next Steps

The Saafir framework significantly simplifies creating AI-powered agents with TypeScript. Managing complex AI interactions becomes easier thanks to automatic type conversions, Zod-integrated schema validation, and its flexible structure.

In this guide, we've covered Saafir's capabilities, from basic setup to different framework integrations and some advanced features. You now have the necessary knowledge to bring your own AI agents to life. Start leveraging the power of AI by trying Saafir in your projects!

Remember, the AI world is constantly evolving. Tools like Saafir will help you keep up with this development. Good luck!

---

Take your AI-powered applications to the next level with **Saafir**! 🚀

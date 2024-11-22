<strong>Elysia.js</strong> is a minimal and performance-focused JavaScript framework designed for developing modern web applications. The framework is specifically optimized to work in the **Node.js** environment and aims to strike a balance between ease of use and speed. Additionally, <strong>Elysia.js</strong> is a Bun-based framework.


In this article, we will examine the basic features of Elysia.js, compare it with other popular JavaScript frameworks and provide a basic use case.  

---

## Key Features of Elysia.js  

- **Lightweight and Performance:** Elysia.js is lightweight and optimised in accordance with modern JavaScript standards. In benchmark tests, it generally outperforms frameworks such as Express and Fastify.  
- **Easy API:** It has a simple and easy-to-learn API, which enables rapid application development.
- **Plug-in Support:** Despite its minimal structure, it offers an expandable plug-in ecosystem according to needs.  
- **TypeScript Support:** Elysia.js works perfectly with TypeScript and prioritises type safety.  

---

## Comparison with other frameworks  

Below you can find a comparison of Elysia.js with other popular JavaScript frameworks:

| Feature            | **Elysia.js**      | **Express.js**     | **Fastify**        | **NestJS**         |  
|--------------------|-------------------|--------------------|--------------------|--------------------|  
| **Performance**     | Very High            | Medium               | High             | Medium               |  
| **Learning Curve** | Low             | Very Low          | Medium               | High             |  
| **Plug-in Ecosystem** | Wide            | Very Wide          | Wide              | Very Wide          |  
| **TypeScript Support** | Perfect        | Weak              | Medium                | Very Good            |  
| **Swagger Compitable** | Perfect        | Weak             | Weak                | Good            |  


Elysia.js is especially ideal for projects that have high performance requirements and need fast development processes. It is also very suitable for complex backend software.

---

## Example of using Elysia.js  

Below you can find a basic example of creating an Elysia.js application:  

```javascript
// Install Elysia.js
import { Elysia } from 'elysia';

const app = new Elysia();

// Defining a simple GET endpoint
app.get('/', () => {
  return { message: 'Hello Elysia.JS !' };
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000!');
});
```


## End-to-End Type Safety 

In the following example, we see that the parameter in the request made to the relevant endpoint or the content in the body of the request is automatically type checked.

```javascript
import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'

const app = new Elysia()
    .use(swagger())
    .get('/user/:id', ({ params: { id } }) => id, {
        params: t.Object({
            id: t.Numeric() // Data of type number
        })
    })
    .listen(3000)

export type App = typeof app;

```

**An image summarising the processes of the control mechanism**

![elysia-js-benchmarks](https://raw.githubusercontent.com/hypecode-tech/blogs/main/elysia-js-rewriting-the-rules-of-the-game-part-1/elysia-js-benchmarks.webp)


If the data type in the request does not match the data type standards provided by Elysia, it generates a *422* error.


## Automatic Swagger Support

Another feature that makes <strong>Elysia.js</strong> indispensable for developers is that it creates it for you without the need to make definitions such as additional @params for <strong>Swagger</strong> thanks to end-to-end data security.

This prevents the backend developers from wasting time writing extra documentation and prevents the frontend developer from wasting time if the documentation is wrong.

The process is more secure, robust and automated.

## Ultra High Performance

**Elysia.js** not only offers developer-friendly features and type safety but also delivers performance results that could rewrite the rules of the game. The image below shows the same application written with other frameworks and the results of the benchmark test.

The results demonstrate that **Elysia.js** is approximately *21x* faster than Express + Node.js.

The most important factor behind this is, of course, <a href="https://bun.sh/" title="Bun.JS">Bun</a>.

![elysia-js-life-cycle](https://raw.githubusercontent.com/hypecode-tech/blogs/main/elysia-js-rewriting-the-rules-of-the-game-part-1/elysia-js-life-cycle.webp)


## How to Create Elysia.JS Project ?

It is very easy to use and very easy to create a project. All you need to do is open the terminal and enter the command ```bun create elysia app``.

Before doing this, make sure that <a href="https://bun.sh/" title="Bun.JS">Bun</a> is installed in your working environment. You can check by running ```bun -v```. If you don’t get any result, you can install it by running the command ```curl -fsSL https://bun.sh/install | bash``` and then create your project.


## Conclusion

That's the whole process. After this time, everything is limited to your imagination. You have a run-time and type-safe typescript backend framework. 



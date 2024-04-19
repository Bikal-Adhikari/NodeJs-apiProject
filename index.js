import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Exploring the Potential of Quantum Computing",
    content:
      "Quantum computing represents a paradigm shift in computation, promising unprecedented processing power and the ability to solve complex problems at a speed unimaginable with classical computers. With applications ranging from cryptography and drug discovery to optimization and machine learning, quantum computing is poised to revolutionize various industries. This post delves into the fundamentals of quantum computing and its potential impact on the future.",
    author: "Daniel Lee",
    date: "02/02/2024",
  },
  {
    id: 2,
    title: "The Evolution of E-Commerce: Trends and Innovations",
    content:
      "E-commerce has come a long way since its inception, constantly evolving to meet the changing needs and preferences of consumers. From the early days of online shopping to the rise of mobile commerce and social commerce, the e-commerce landscape continues to transform. This post examines key trends and innovations shaping the future of e-commerce, including AI-powered personalization, augmented reality shopping experiences, and the growing role of sustainability.",
    author: "Sophia Patel",
    date: "20/05/2023",
  },
  {
    id: 3,
    title: "Unlocking the Potential of Renewable Energy Sources",
    content:
      "As the world grapples with the challenges of climate change and environmental degradation, renewable energy sources offer a promising solution to reduce reliance on fossil fuels and mitigate greenhouse gas emissions. From solar and wind power to hydroelectric and geothermal energy, this post explores the vast potential of renewable energy sources in powering a sustainable future. It discusses technological advancements, policy initiatives, and the economic benefits of transitioning to renewable energy.",
    author: "Aiden Garcia",
    date: "25/8/2023",
  },
  {
    id: 4,
    title: "The Promise of 5G Technology: Revolutionizing Connectivity",
    content:
      "5G technology heralds a new era of connectivity, offering faster speeds, lower latency, and greater capacity than its predecessors. With its potential to enable transformative technologies such as autonomous vehicles, smart cities, and immersive virtual reality experiences, 5G is poised to revolutionize various industries. This post explores the capabilities of 5G technology and its implications for the future of communication and innovation.",
    author: "Olivia Nguyen",
    date: "15/09/2023",
  },
  {
    id: 5,
    title: "The Future of Work: Embracing Remote and Flexible Arrangements",
    content:
      "The traditional office-based model of work is undergoing a significant transformation, accelerated by advancements in technology and changes in societal attitudes. Remote work, once considered a perk, has now become a necessity for many organizations in the wake of the COVID-19 pandemic. This post examines the shift towards remote and flexible work arrangements, exploring the benefits, challenges, and implications for the future of work.",
    author: "Ethan Smith",
    date: "20/09/2023",
  },
  {
    id: 6,
    title: "The Role of Blockchain in Supply Chain Management",
    content:
      "Blockchain technology has the potential to revolutionize supply chain management by providing transparency, traceability, and security throughout the entire supply chain process. From tracking the origin of products to verifying the authenticity of goods, blockchain offers a decentralized and immutable ledger that enhances trust and efficiency. This post discusses the applications of blockchain in supply chain management and its impact on industry practices.",
    author: "Isabella Brown",
    date: "25/09/2023",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = (lastId += 1);
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero based
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: formattedDate,
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});

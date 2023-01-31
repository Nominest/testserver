import { nanoid } from "nanoid";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
const port = 8000;

let categories = [
  { id: 1, title: "Технологи", description: "Технологи мэдээ" },
  { id: 2, title: "Цаг Үе", description: "Цаг үеийн мэдээ" },
  { id: 3, title: "Түүх", description: "Түүхийн мэдээ" },
  { id: 4, title: "Соёл", description: "Соёлийн мэдээ" },
  { id: 5, title: "Спорт", description: "Спортийн мэдээ" },
  { id: 6, title: "Гадаад мэдээ", description: "Гадаад мэдээ" },
];

let articles = [
  {
    id: 1,
    imageUrl: "https://miro.medium.com/max/1400/1*OVhfYqPzT-biY3G6tU17xA.webp",
    title:
      "ChatGPT in an iOS Shortcut — Worlds Smartest HomeKit Voice Assistant",
    categoryId: 1,
    description:
      "Ever since I tried ChatGPT and GPT-3, everything else feels painfully dumb and useless: Siri, Alexa, Google Home and all other “smart” assistants.Here’s the shocking thing: you can build your own in less than an hour!",
    text: "Ever since I tried ChatGPT and GPT-3, everything else feels painfully dumb and useless: Siri, Alexa, Google Home and all other “smart” assistants.Here’s the shocking thing: you can build your own in less than an hour!Ever since I tried ChatGPT and GPT-3, everything else feels painfully dumb and useless: Siri, Alexa, Google Home and all other “smart” assistants.Here’s the shocking thing: you can build your own in less than an hour!Ever since I tried ChatGPT and GPT-3, everything else feels painfully dumb and useless: Siri, Alexa, Google Home and all other “smart” assistants.Here’s the shocking thing: you can build your own in less than an hour!Ever since I tried ChatGPT and GPT-3, everything else feels painfully dumb and useless: Siri, Alexa, Google Home and all other “smart” assistants.Here’s the shocking thing: you can build your own in less than an hour!",
  },
  {
    id: 2,
    imageUrl: "https://miro.medium.com/max/1400/1*qshjaVzbtHBx5eI0BsH1Gw.webp",
    title: "Inclusive Design for the 2023 Lunar New Year",
    categoryId: 2,
    description:
      "Lunar New Year celebrations are significant for Sino cultures, with many shared rituals to ring in the new year and prepare for the coming of spring — like decorating with red and gold, lighting fireworks to ward off evil spirits, gifting red envelopes with “lucky money,” and deep cleaning their homes to rid their lives of lousy luck.",
    text: "Lunar New Year celebrations are significant for Sino cultures, with many shared rituals to ring in the new year and prepare for the coming of spring — like decorating with red and gold, lighting fireworks to ward off evil spirits, gifting red envelopes with “lucky money,” and deep cleaning their homes to rid their lives of lousy luck.You might also be familiar with the 12-animal “Chinese Zodiac” associated with the Lunar New Year, where each year marks the transition from one animal to the next. In 2023, some will celebrate The Year of the Rabbit. But our friends in Vietnamese communities will celebrate this coming Lunar New Year with a different furry friend. For them, 2023 (and every 12 years) is The Year of the Cat.This is my creative journey to uncover why this is the case.",
  },
  {
    id: 3,
    imageUrl:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*l9yQEYry4mPPajh4bLxP_w.jpeg",
    title: "Diary of a Brand: Blank Street Coffee",
    categoryId: 2,
    description:
      "And appear it has. After its founding in 2020, Blank Street now has north of 50 locations across NYC, London, Boston and DC, with ambitions to expand into the hundreds. Fortunate timing (many prime locations were vacant thanks to COVID19’s impact on hospitality) and a hefty fundraise (BSC has raised $67M from VC funds including General Catalyst and Tiger Global, real estate giant Tishman Speyer, and the founders of Allbirds, Harry’s, and Warby Parker) fueled much of that growth.",
    text: "And appear it has. After its founding in 2020, Blank Street now has north of 50 locations across NYC, London, Boston and DC, with ambitions to expand into the hundreds. Fortunate timing (many prime locations were vacant thanks to COVID19’s impact on hospitality) and a hefty fundraise (BSC has raised $67M from VC funds including General Catalyst and Tiger Global, real estate giant Tishman Speyer, and the founders of Allbirds, Harry’s, and Warby Parker) fueled much of that growth.On the outside, Blank Street appears to be a modern coffeeshop. What makes Blank Street worthy of such rapid expansion?Blank Street’s vision: somewhat cheaper coffee.According to Blank Street, the brand’s founders Issam Freiha and Vinay Menda (who happen to be venture capitalists themselves) created the brand with a simple mission: to make good coffee cheaper.",
  },
  {
    id: 4,
    imageUrl: "https://miro.medium.com/max/1400/1*EYh6l6A7c6ec-PK8AJchTQ.webp",
    title: "The new Wikipedia appearance that took the whole village",
    categoryId: 6,
    description:
      "This week my team reached an important milestone in our biggest project — the deployment of a new look for English Wikipedia. This was the most significant change to the desktop site in over a decade.",
    text: "I’m sure many would smirk at the idea a redesign could take three whole years, rather than three months, but much of this time has been consulting with various partners and refactoring the code that has evolved over twenty years. We’ve followed an agile approach to development, incrementally building out a grand vision set by our designers. Our first iteration, to our Basque language Wikipedia, was in fact deployed as far back as July 2020. We’ve built responsibly, intentionally, and strategically, thinking holistically about the entire behemoth that is our codebase. When I look back at our release timeline at all the things we did as a means to an end of this project, it’s incredible to see what’s been achieved over three years.",
  },
  {
    id: 5,
    imageUrl: "https://miro.medium.com/max/1400/0*3bPbSq7pXs8P5Mdq",
    title: "Can ChatGPT kill Google?",
    categoryId: 1,
    description:
      "Even the New York Times has an entire article dedicated to this. According to them, ‘Code Red’ went off in the highest structures of the company.Google is scared, very scared.The reason?Artificial Intelligence has recently made a giant leap that could put at very risk Google’s core business, search.",
    text: "Google is currently valued at a whopping 1.13 trillion dollars.That’s a one and twelve zeros. But what’s even crazier, is that Google was, in November 2021, an almost 2 trillion dollar company.That’s quite a decrease, but it still allows them to be the fourth biggest company in the world by market capitalization.Of course, being so huge, one imagines that its revenues are also huge, right?256 billion dollars in revenue in 2021. Not bad.But how much money is that?For reference, more than Portugal’s expected entire GDP for 2022.In other words, Google’s revenues in 2021 were bigger than what Portugal managed to produce, as an entire country, for a whole year.Seeing those numbers, one can’t act surprised by Google’s insane valuation.Or should we?Truth be told, Google’s business model has a catch.Diversification isn’t Google’s strongest suit.It’s undeniable that Google has some impressive numbers.As a more visual representation, let’s look at the following monographic",
  },
];

let users = [
  {
    id: 1,
    email: "enrosek95@gmail.com",
    password: "Kingenrose123~",
    token: nanoid(),
  },
];

let curUser;

app.use(cors());
app.use(bodyParser.json());

const checkToken = (token) => {
  let result = false;

  users.map((user) => {
    if (user.token === token) result = true;
  });

  return result;
};

// Categories Routes

app.get("/categories", (req, res) => {
  res.status(200);
  res.json(categories);
});

app.get("/categories/:id", (req, res) => {
  let { id } = req.params;
  id = Number(id);
  let category;

  for (let cat of categories) {
    if (cat.id === id) {
      category = cat;
      break;
    }
  }

  res.json(category);
});

app.post("/categories", (req, res) => {
  if (!curUser) return res.status(401).send(`Unauthorized account`);

  if (!checkToken(req.headers.authorization))
    return res.status(403).send(`Invalid token`);

  const newCategory = {
    id: categories[categories.length - 1].id + 1,
    ...req.body,
  };
  categories.push(newCategory);
  res.json(newCategory);
});

app.patch("/categories/:id", (req, res) => {
  if (!curUser) return res.status(401).send(`Unauthorized account`);

  if (!checkToken(req.headers.authorization))
    return res.status(403).send(`Invalid token`);

  let { id } = req.params;
  id = Number(id);
  categories = categories.map((category) => {
    if (category.id === id) return { id, ...req.body };
    return category;
  });

  res.json({ id, ...req.body });
});

app.delete("/categories/:id", (req, res) => {
  if (!curUser) return res.status(401).send(`Unauthorized account`);

  if (!checkToken(req.headers.authorization))
    return res.status(403).send(`Invalid token`);

  let { id } = req.params;
  id = Number(id);

  categories = categories.filter((category) => {
    if (category.id !== id) return category;
  });

  res.json(id);
});

// Articles Routes

app.get("/articles", (req, res) => {
  res.status(200);
  res.json(articles);
});

app.get("/articles/:id", (req, res) => {
  const { id } = req.params;
  let newArticle;
  for (let article of articles) {
    if (article.id === Number(id)) {
      newArticle = article;
      break;
    }
  }

  res.json(newArticle);
});

app.post("/articles", (req, res) => {
  if (!curUser) return res.status(401).send(`Unauthorized account`);

  if (!checkToken(req.headers.authorization))
    return res.status(403).send(`Invalid token`);

  const newArticle = { id: articles[articles.length - 1].id + 1, ...req.body };
  articles.push(newArticle);
  res.json(newArticle);
});

app.patch("/articles/:id", (req, res) => {
  if (!curUser) return res.status(401).send(`Unauthorized account`);

  if (!checkToken(req.headers.authorization))
    return res.status(403).send(`Invalid token`);

  let { id } = req.params;
  id = Number(id);
  articles = articles.map((article) => {
    if (article.id === id) return { id, ...req.body };
    return article;
  });

  res.json({ id, ...req.body });
});

app.delete("/articles/:id", (req, res) => {
  if (!curUser) return res.status(401).send(`Unauthorized account`);

  if (!checkToken(req.headers.authorization))
    return res.status(403).send(`Invalid token`);

  let { id } = req.body;
  id = Number(id);

  articles = articles.filter((article) => {
    if (article.id !== id) return article;
  });

  res.json(id);
});

app.get("/articles/categories/:id", (req, res) => {
  const { id } = req.params;

  res.json(
    articles.filter((article) => {
      if (article.categoryId === Number(id)) return article;
    })
  );
});

// Users Routes
app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  let isExists = false;

  users.map((user) => {
    if (user.email === email) {
      isExists = true;
      curUser = user;
    }
  });

  if (!isExists) {
    res.status(404).send({
      message: `User didn't found`,
    });
  }

  if (curUser.email !== email || curUser.password !== password) {
    res.status(400).send({
      message: "Email or password doesn't match",
    });
  }

  res.send({
    message: "Success",
    body: curUser.token,
  });
});

app.post("/signup", (req, res) => {
  const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperLetters = lowerLetters.toUpperCase();
  const numbers = "0123456789";
  const specials = "@$!%*#?&.~";

  const checkLowerLetters = (pass) => {
    let result = false;
    for (let letter of lowerLetters) {
      if (pass.includes(letter)) {
        result = true;
        break;
      }
    }

    return result;
  };

  const checkUpperLetters = (pass) => {
    let result = false;
    for (let letter of upperLetters) {
      if (pass.includes(letter)) {
        result = true;
        break;
      }
    }

    return result;
  };

  const checkNumbers = (pass) => {
    let result = false;
    for (let letter of numbers) {
      if (pass.includes(letter)) {
        result = true;
        break;
      }
    }

    return result;
  };

  const checkSpecials = (pass) => {
    let result = false;
    for (let letter of specials) {
      if (pass.includes(letter)) {
        result = true;
        break;
      }
    }

    return result;
  };

  const checkPassword = (pass) => {
    if (
      checkLowerLetters(pass) &&
      checkUpperLetters(pass) &&
      checkNumbers(pass) &&
      checkSpecials(pass) &&
      pass.length > 8
    )
      return true;

    return false;
  };

  const { email, password, repassword } = req.body;

  for (let user of users) {
    if (user.email === email)
      return res.status(400).send({ message: `Email already exists` });
  }

  if (password !== repassword)
    return res
      .status(400)
      .send({ message: `Password doesn't match with repeated password` });

  if (!checkPassword(password))
    return res.status(400).send({ message: `Password requirement invalid` });

  if (!password.includes("@") || !password.includes("."))
    return res.status(400).send({ message: `Email type is wrong!` });

  const newUser = {
    id: users[users.length - 1].id + 1,
    email,
    password,
    token: nanoid(),
  };

  users.push(newUser);

  res.send({
    message: `Success`,
    body: newUser,
  });
});

app.post("/users/me", (req, res) => {
  res.json(curUser);
});

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);

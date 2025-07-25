# 📚 Book Review GraphQL API

A GraphQL API to fetch books and their reviews. No database, just vibes (and hardcoded arrays).

---

## ▶️ Run It

```bash
npm i
npm run dev
````

Then hit: [http://localhost:3001](http://localhost:3001)

---

## 🧠 Sample Queries

```graphql
query {
  getAllBooks {
    title
    reviews {
      comment
      rating
    }
  }
}

query {
  getAllReviews {
    reviewer
    book {
      title
    }
  }
}
```

---

## 📁 Files

* `index.js` – server, schema, resolvers
* `book.js` – the books
* `review.js` – the reviews
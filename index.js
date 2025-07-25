import express from "express";
import { ApolloServer } from "@apollo/server";
import cors from "cors"
import { expressMiddleware } from "@as-integrations/express5";
import { BOOKS } from "./book.js";
import {REVIEWS} from "./review.js";

const app=express()
const server=new ApolloServer({
    typeDefs:`
      type Book {
        id: ID!
        title: String!
        author: String!
        publishedYear: Int!
        genre: String!
        reviews: [Review]
      }

      type Review {
        id: ID!
        rating: Int!
        comment: String!
        reviewer: String!
        book: Book
      }

      type Query {
        getAllBooks: [Book]
        getBook(id: ID!): Book
        getAllReviews: [Review]
        getReviewsByBook(bookId: ID!): [Review]
      }
    `,
    resolvers:{
        Book:{
            reviews: (book)=>REVIEWS.filter((r)=>r.bookId===book.id)
        },
        Review:{
            book: (review)=>BOOKS.find((b)=>b.id===review.bookId)
        },
        Query:{
            getAllBooks:()=>BOOKS,
            getBook: (_, { id }) => BOOKS.find((b) => b.id === id),
            getAllReviews: () => REVIEWS,
            getReviewsByBook: (_, { bookId }) => REVIEWS.filter((r) => r.bookId === bookId),
        }
    }
})

await server.start()

app.use(cors(),express.json(),expressMiddleware(server))
app.listen(3001,()=>{
    console.log(`Server running on PORT 3001`)
})
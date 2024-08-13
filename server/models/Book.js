const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    google_id: {
      type: String,
      unique: true,
    },
    book_title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    start_date: {
      type: Date,
      default: null,
    },
    end_date: {
      type: Date,
      default: null,
    },
    page_count: {
      type: Number,
      default: 0,
    },
    categories: {
      type: [String],
      default: [],
    },
    img: {
      type: String,
      default: '',
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("books", bookSchema);

module.exports = Book;

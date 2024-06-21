import React from 'react';
import ContactElement from '../Components/ContactElement';
import BookFrame from '../Components/BookFrame';

function Test() {
  const dummyBook = {
    title: "The Great Gatsby",
    authorDetails: {
      name: "F. Scott Fitzgerald",
      publishedDate: "April 10, 1925"
    },
    bookImage: "https://example.com/great-gatsby.jpg", // URL to the book image
    availability: true // Assume the book is available
  };

  return (
    <div>
      <ContactElement
        name="John Doe"
        message="Hey there! How are you?"
        imgSrc="https://example.com/avatar.jpg"
      />
      <ContactElement
        name="Alice Smith"
        message="Hi, I'm doing great. Thanks for asking!"
        imgSrc="https://example.com/avatar2.jpg"
      />

      <BookFrame book={dummyBook} />

    </div>
  );
}

export default Test;
const books = [
  {
    id: 1,
    title: "The Catcher in the Rye",
    availability: "Available",
    bookImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    authorDetails: {
      image: "https://via.placeholder.com/100/FF5733/FFFFFF?text=J.D.+Salinger",
      name: "J.D. Salinger",
      publishedDate: "1951-07-16"
    },
    description: "The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It is widely considered one of the greatest American novels of the 20th century.",
    comments: [
      { id: '1', imgLink: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Commenter+1', author: 'Commenter 1', content: 'Great article!', timestamp: '2024-02-18T10:30:00' },
      { id: '2', imgLink: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Commenter+2', author: 'Commenter 2', content: 'I agree!', timestamp: '2024-02-18T11:00:00' }
    ],
    averageRating: 4.2
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    availability: "Not Available",
    bookImage: "https://images.unsplash.com/photo-1611444319605-0731c984f0cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    authorDetails: {
      image: "https://via.placeholder.com/100/FF5733/FFFFFF?text=Harper+Lee",
      name: "Harper Lee",
      publishedDate: "1960-07-11"
    },
    description: "To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature.",
    comments: [
      { id: '1', imgLink: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Commenter+1', author: 'Commenter 1', content: 'Great article!', timestamp: '2024-02-18T10:30:00' },
      { id: '2', imgLink: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Commenter+2', author: 'Commenter 2', content: 'I agree!', timestamp: '2024-02-18T11:00:00' }
    ],
    averageRating: 4.6
  },
  {
    id: 3,
    title: "1984",
    availability: "Available",
    bookImage: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    authorDetails: {
      image: "https://via.placeholder.com/100/FF5733/FFFFFF?text=George+Orwell",
      name: "George Orwell",
      publishedDate: "1949-06-08"
    },
    description: "1984 is a dystopian novel by English writer George Orwell. It was published in 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime.",
    comments: [
      { id: '1', imgLink: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Commenter+1', author: 'Commenter 1', content: 'Great article!', timestamp: '2024-02-18T10:30:00' },
      { id: '2', imgLink: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Commenter+2', author: 'Commenter 2', content: 'I agree!', timestamp: '2024-02-18T11:00:00' }
    ],
    averageRating: 4.4
  },
  {
    id: 5,
    title: 'The Great Gatsby',
    availability: 'Available',
    bookImage: 'https://source.unsplash.com/random/300x400/?book,gatsby',
    authorDetails: {
      image: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=F.+Scott+Fitzgerald',
      name: 'F. Scott Fitzgerald',
      publishedDate: '1925-04-10'
    },
    description: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts first-person narrator Nick Carraway’s interactions with mysterious millionaire Jay Gatsby and Gatsby’s obsession to reunite with his former lover, Daisy Buchanan.',
    comments: [
      { id: '1', imgLink: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Commenter+1', author: 'Commenter 1', content: 'Great book!', timestamp: '2024-02-18T10:30:00' },
      { id: '2', imgLink: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Commenter+2', author: 'Commenter 2', content: 'A classic!', timestamp: '2024-02-18T11:00:00' }
    ],
    averageRating: 4.2
  },
  {
    id: 6,
    title: 'To Kill a Mockingbird',
    availability: 'Not Available',
    bookImage: 'https://source.unsplash.com/random/300x400/?book,mockingbird',
    authorDetails: {
      image: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Harper+Lee',
      name: 'Harper Lee',
      publishedDate: '1960-07-11'
    },
    description: 'To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature. The plot and characters are loosely based on Lee’s observations of her family, her neighbors and an event that occurred near her hometown of Monroeville, Alabama, in 1936, when she was 10 years old.',
    comments: [
      { id: '1', imgLink: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Commenter+1', author: 'Commenter 1', content: 'A must-read!', timestamp: '2024-02-18T10:30:00' },
      { id: '2', imgLink: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Commenter+2', author: 'Commenter 2', content: 'One of my favorites!', timestamp: '2024-02-18T11:00:00' }
    ],
    averageRating: 4.7

  },
  {
    id: 7,
    title: '1984',
    availability: 'Available',
    bookImage: 'https://source.unsplash.com/random/300x400/?book,1984',
    authorDetails: {
      image: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=George+Orwell',
      name: 'George Orwell',
      publishedDate: '1949-06-08'
    },
    description: '1984 is a dystopian novel by English writer George Orwell. It was published in 1949 as a critique of totalitarian regimes and their use of propaganda, surveillance, and manipulation of history to maintain power.',
    comments: [
      { id: '1', imgLink: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Commenter+1', author: 'Commenter 1', content: 'Scary how relevant it still is today.', timestamp: '2024-02-18T10:30:00' },
      { id: '2', imgLink: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Commenter+2', author: 'Commenter 2', content: 'A chilling read.', timestamp: '2024-02-18T11:00:00' }
    ],

  }
]

export default books;
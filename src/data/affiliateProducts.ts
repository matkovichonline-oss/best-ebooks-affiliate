export type BookCategory = 'Mystery & Thriller' | 'Personal Development' | 'Science Fiction & Fantasy';

export interface AffiliateProduct {
  id: string;
  category: BookCategory;
  title: string;
  author: string;
  miniReview: string;
  amazonUrl: string;
  coverText: string;
  coverUrl?: string; // Optional real image URL
}

export const defaultProducts: AffiliateProduct[] = [
  // MYSTERY & THRILLER
  {
    id: 'm1',
    category: 'Mystery & Thriller',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    miniReview: 'A shocking psychological thriller of a woman\'s act of violence against her husband—and of the therapist obsessed with uncovering her motive. The twist will leave you completely speechless.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'The Silent Patient',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg'
  },
  {
    id: 'm2',
    category: 'Mystery & Thriller',
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    miniReview: 'A toxic marriage, a missing wife, and a husband who looks incredibly guilty. This is the gold standard for domestic thrillers.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'Gone Girl',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780307588371-L.jpg'
  },
  {
    id: 'm3',
    category: 'Mystery & Thriller',
    title: 'The Girl on the Train',
    author: 'Paula Hawkins',
    miniReview: 'A gripping, fast-paced narrative of voyeurism, addiction, and murder that you absolutely cannot put down.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'The Girl on the Train',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781594634024-L.jpg'
  },
  {
    id: 'm4',
    category: 'Mystery & Thriller',
    title: 'Verity',
    author: 'Colleen Hoover',
    miniReview: 'Dark, disturbing, and incredibly compelling. A struggling writer discovers a horrific manuscript in the home of her literary hero.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'Verity',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781538724736-L.jpg'
  },
  {
    id: 'm5',
    category: 'Mystery & Thriller',
    title: 'The Housemaid',
    author: 'Freida McFadden',
    miniReview: 'Twisty, fast-paced, and wildly entertaining. You think you know where the story is going until the rug is pulled completely out from under you.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'The Housemaid',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781538742570-L.jpg'
  },
  {
    id: 'm6',
    category: 'Mystery & Thriller',
    title: 'And Then There Were None',
    author: 'Agatha Christie',
    miniReview: 'The quintessential locked-room mystery. Ten strangers invited to a secluded island who begin dying one by one. A masterpiece.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'And Then There Were None',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780062073488-L.jpg'
  },
  {
    id: 'm7',
    category: 'Mystery & Thriller',
    title: 'Sharp Objects',
    author: 'Gillian Flynn',
    miniReview: 'A dark, atmospheric exploration of trauma, family dysfunction, and murder in a small, oppressive town.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'Sharp Objects',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780307341556-L.jpg'
  },
  {
    id: 'm8',
    category: 'Mystery & Thriller',
    title: 'Dark Places',
    author: 'Gillian Flynn',
    miniReview: 'Raw and unapologetically gritty. A woman investigates the brutal massacre of her family twenty-five years later.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'Dark Places',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780307341570-L.jpg'
  },
  {
    id: 'm9',
    category: 'Mystery & Thriller',
    title: 'The Guest List',
    author: 'Lucy Foley',
    miniReview: 'A wedding on a remote Irish island turns deadly. Multiple POVs keep the tension unbearable until the final reveal.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'The Guest List',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780062868930-L.jpg'
  },
  {
    id: 'm10',
    category: 'Mystery & Thriller',
    title: 'The Maid',
    author: 'Nita Prose',
    miniReview: 'A charming, heart-warming cozy mystery with a highly unique, neurodivergent protagonist who discovers a dead body in her hotel.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'The Maid',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780593356159-L.jpg'
  },

  // PERSONAL DEVELOPMENT
  {
    id: 'p1',
    category: 'Personal Development',
    title: 'Atomic Habits',
    author: 'James Clear',
    miniReview: 'The definitive guide to breaking bad behaviors and adopting good ones. Clear, actionable, and profoundly effective.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'Atomic Habits',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg'
  },
  {
    id: 'p2',
    category: 'Personal Development',
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    miniReview: 'A counterintuitive approach to living a good life. It strips away the toxic positivity and demands brutal honesty with oneself.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'The Subtle Art',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780062457714-L.jpg'
  },
  {
    id: 'p3',
    category: 'Personal Development',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    miniReview: 'A monumental exploration into the biases and heuristics that drive human decision-making and behavior.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'Thinking Fast and Slow',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg'
  },
  {
    id: 'p4',
    category: 'Personal Development',
    title: 'How to Win Friends and Influence People',
    author: 'Dale Carnegie',
    miniReview: 'The absolute classic on human relations. Essential reading for anyone looking to improve their social and professional skills.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'How to Win Friends',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780671027032-L.jpg'
  },
  {
    id: 'p5',
    category: 'Personal Development',
    title: 'The 7 Habits of Highly Effective People',
    author: 'Stephen R. Covey',
    miniReview: 'A principle-centered approach for solving personal and professional problems. Timeless, powerful wisdom.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'The 7 Habits',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781982137274-L.jpg'
  },
  {
    id: 'p6',
    category: 'Personal Development',
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    miniReview: 'A foundational text on financial literacy that completely shatters the myth that you need to earn a high income to be rich.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'Rich Dad Poor Dad',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg'
  },
  {
    id: 'p7',
    category: 'Personal Development',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    miniReview: 'The private thoughts of a Roman Emperor. A cornerstone of Stoic philosophy that is incredibly relevant to modern anxiety.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'Meditations',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780812968255-L.jpg'
  },
  {
    id: 'p8',
    category: 'Personal Development',
    title: 'Outliers',
    author: 'Malcolm Gladwell',
    miniReview: 'Examines the external factors, timing, and 10,000 hours of practice that combine to create exceptional success.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'Outliers',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780316017930-L.jpg'
  },
  {
    id: 'p9',
    category: 'Personal Development',
    title: 'Can\'t Hurt Me',
    author: 'David Goggins',
    miniReview: 'An incredibly raw, inspiring memoir of overcoming abuse, poverty, and obesity to become a Navy SEAL and ultra-endurance athlete.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'Can\'t Hurt Me',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781544512273-L.jpg'
  },
  {
    id: 'p10',
    category: 'Personal Development',
    title: 'The Four Agreements',
    author: 'Don Miguel Ruiz',
    miniReview: 'A simple yet profound code of conduct based on ancient Toltec wisdom that promises freedom and true happiness.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'The Four Agreements',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781878424310-L.jpg'
  },

  // SCIENCE FICTION & FANTASY
  {
    id: 's1',
    category: 'Science Fiction & Fantasy',
    title: 'Dune',
    author: 'Frank Herbert',
    miniReview: 'An epic, sprawling masterpiece of politics, religion, and ecology on a desert planet. The defining novel of the sci-fi genre.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'Dune',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg'
  },
  {
    id: 's2',
    category: 'Science Fiction & Fantasy',
    title: '1984',
    author: 'George Orwell',
    miniReview: 'A chilling, prescient dystopian warning about totalitarianism, surveillance, and the manipulation of truth.',
    amazonUrl: 'https://amzn.to/example',
    coverText: '1984',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg'
  },
  {
    id: 's3',
    category: 'Science Fiction & Fantasy',
    title: 'The Martian',
    author: 'Andy Weir',
    miniReview: 'A brilliant, scientifically accurate thriller about an astronaut stranded on Mars relying entirely on his ingenuity to survive.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'The Martian',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780553418026-L.jpg'
  },
  {
    id: 's4',
    category: 'Science Fiction & Fantasy',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    miniReview: 'A fantastic, uplifting sci-fi adventure about a lone astronaut racing to save humanity while making an unexpected friend.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'Project Hail Mary',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg'
  },
  {
    id: 's5',
    category: 'Science Fiction & Fantasy',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    miniReview: 'The classic, charming adventure of Bilbo Baggins that introduced the world to Middle-Earth and high fantasy.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'The Hobbit',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780345339683-L.jpg'
  },
  {
    id: 's6',
    category: 'Science Fiction & Fantasy',
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    miniReview: 'The magical beginning to the most beloved fantasy series of our generation. Utterly enchanting from start to finish.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'Harry Potter 1',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg'
  },
  {
    id: 's7',
    category: 'Science Fiction & Fantasy',
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    miniReview: 'Lyrical, beautiful prose defining a gripping coming-of-age story of a gifted young man growing into a legendary magician.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'Name of the Wind',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg'
  },
  {
    id: 's8',
    category: 'Science Fiction & Fantasy',
    title: 'Ender\'s Game',
    author: 'Orson Scott Card',
    miniReview: 'A brilliant exploration of morality, childhood, and warfare wrapped in a compelling story of a young military genius in space.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'Ender\'s Game',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780812550702-L.jpg'
  },
  {
    id: 's9',
    category: 'Science Fiction & Fantasy',
    title: 'The Three-Body Problem',
    author: 'Cixin Liu',
    miniReview: 'Mind-bending, incredibly intelligent hard sci-fi that tackles physics, the Fermi paradox, and an incredibly unique alien invasion.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'Three-Body Problem',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780765382030-L.jpg'
  },
  {
    id: 's10',
    category: 'Science Fiction & Fantasy',
    title: 'Foundation',
    author: 'Isaac Asimov',
    miniReview: 'A sweeping, intellectual sci-fi epic concerning the fall of a galactic empire and the mathematical psychohistory used to shorten the dark ages.',
    amazonUrl: 'https://amzn.to/example',
    coverText: 'Foundation',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780553293357-L.jpg'
  }
];

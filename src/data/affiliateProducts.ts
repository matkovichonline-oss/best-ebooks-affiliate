export interface AffiliateProduct {
  id: string;
  title: string;
  miniReview: string;
  amazonUrl: string;
  coverText: string;
}

export const INITIAL_PRODUCTS: AffiliateProduct[] = [
  {
    id: 'aff_1',
    title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits',
    miniReview: 'This book fundamentally changed the way I look at daily routines. Clear, actionable, and backed by science, it is the perfect read for anyone struggling with procrastination.',
    amazonUrl: 'https://amzn.to/example1',
    coverText: 'Atomic Habits'
  },
  {
    id: 'aff_2',
    title: 'The Psychology of Money',
    miniReview: 'Morgan Housel brilliantly explains that financial success is not about what you know, but how you behave. A fascinating and quick read that will change your financial perspective.',
    amazonUrl: 'https://amzn.to/example2',
    coverText: 'The Psychology of Money'
  }
];

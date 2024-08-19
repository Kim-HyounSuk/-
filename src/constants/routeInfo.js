import About from '../pages/about.js';
import Category from '../pages/category.js';
import Main from '../pages/home.js';

export const BASE_URL = 'http://localhost:5173';

export const routes = [
  { path: /^\/$/, element: Main },
  { path: /^\/category/, element: Category },
  { path: /^\/about/, element: About },
];

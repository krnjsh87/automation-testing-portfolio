/**
 * Test data fixtures for API testing.
 * Contains users, products, orders, invalid data, and endpoint constants.
 */

export interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
}

export interface Product {
  id?: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image?: string;
}

export interface Order {
  id?: number;
  userId: number;
  date?: string;
  products?: unknown[];
}

export const TEST_USERS = {
  valid: {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    phone: '1-770-736-8031',
    website: 'hildegard.org',
  },
  newUser: {
    name: 'Test User',
    email: 'test@example.com',
    username: 'testuser',
    phone: '123-456-7890',
    website: 'https://example.com',
  },
  updateUser: {
    name: 'Updated User',
    email: 'updated@example.com',
    username: 'updateduser',
    phone: '999-999-9999',
  },
};

export const TEST_PRODUCTS = {
  valid: {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'A test product',
    category: 'electronics',
  },
  newProduct: {
    title: 'New Product',
    price: 49.99,
    description: 'New product for testing',
    category: 'books',
  },
};

export const TEST_ORDERS = {
  valid: {
    id: 1,
    userId: 1,
    date: new Date().toISOString(),
  },
  newOrder: {
    userId: 1,
    date: new Date().toISOString(),
  },
};

export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const ENDPOINTS = {
  users: '/users',
  posts: '/posts',
  comments: '/comments',
  albums: '/albums',
  todos: '/todos',
  /** JSONPlaceholder doesn't have products/orders; using posts/todos as proxies */
  products: '/posts',
  orders: '/todos',
};

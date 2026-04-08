import { test, expect } from '@playwright/test';
import { APIClient } from '../src/api-client';
import { ENDPOINTS } from '../src/test-data';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

test.describe('Posts API Tests (Product Proxy)', () => {
  let apiClient: APIClient;

  test.beforeAll(() => {
    apiClient = new APIClient();
  });

  test('TC101: GET all posts - success', async () => {
    const response = await apiClient.get<Post[]>(ENDPOINTS.products);

    expect(response).toBeTruthy();
    expect(Array.isArray(response)).toBe(true);
    expect(response.length).toBeGreaterThan(0);
    expect(response[0]).toHaveProperty('id');
    expect(response[0]).toHaveProperty('title');
  });

  test('TC102: GET single post - success', async () => {
    const postId = 1;

    const response = await apiClient.get<Post>(`${ENDPOINTS.products}/${postId}`);

    expect(response).toBeTruthy();
    expect(response.id).toBe(postId);
    expect(response.title).toBeTruthy();
    expect(response.body).toBeTruthy();
  });

  test('TC103: POST create post - success', async () => {
    const newPost = {
      title: 'New Test Post',
      body: 'This is a test post body',
      userId: 1,
    };

    const response = await apiClient.post<Post>(ENDPOINTS.products, newPost);

    expect(response).toBeTruthy();
    expect(response).toHaveProperty('id');
    expect(response.title).toBe(newPost.title);
  });

  test('TC104: PUT update post - success', async () => {
    const postId = 1;
    const updateData = {
      title: 'Updated Post',
      body: 'Updated body content',
      userId: 1,
    };

    const response = await apiClient.put<Post>(
      `${ENDPOINTS.products}/${postId}`,
      updateData
    );

    expect(response).toBeTruthy();
    expect(response.title).toBe(updateData.title);
  });

  test('TC105: DELETE post - success', async () => {
    const postId = 1;

    const response = await apiClient.delete<Record<string, unknown>>(
      `${ENDPOINTS.products}/${postId}`
    );

    expect(response).toBeTruthy();
  });

  test('TC106: Filter posts by userId', async () => {
    const userId = 1;

    const response = await apiClient.get<Post[]>(
      `${ENDPOINTS.products}?userId=${userId}`
    );

    expect(Array.isArray(response)).toBe(true);
    response.forEach(post => {
      expect(post.userId).toBe(userId);
    });
  });

  test('TC107: Post title field validation', async () => {
    const posts = await apiClient.get<Post[]>(ENDPOINTS.products);

    posts.forEach(post => {
      expect(typeof post.title).toBe('string');
      expect(post.title.length).toBeGreaterThan(0);
    });
  });

  test('TC108: Posts have sequential IDs', async () => {
    const posts = await apiClient.get<Post[]>(ENDPOINTS.products);

    for (let i = 0; i < Math.min(posts.length - 1, 10); i++) {
      expect(posts[i].id).toBeLessThan(posts[i + 1].id);
    }
  });
});

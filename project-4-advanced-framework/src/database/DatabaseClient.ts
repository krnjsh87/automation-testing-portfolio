import { Pool, PoolClient } from 'pg';

export class DatabaseClient {
  private static instance: DatabaseClient;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'testdb',
      password: process.env.DB_PASSWORD || 'password',
      port: parseInt(process.env.DB_PORT || '5432', 10),
    });
  }

  public static getInstance(): DatabaseClient {
    if (!DatabaseClient.instance) {
      DatabaseClient.instance = new DatabaseClient();
    }
    return DatabaseClient.instance;
  }

  async query(text: string, params?: any[]) {
    return this.pool.query(text, params);
  }

  async close() {
    await this.pool.end();
  }
}

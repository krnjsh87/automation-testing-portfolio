/**
 * DataGenerator - Utility for generating dynamic test data.
 * Provides randomized but realistic test data for various scenarios.
 */
export class DataGenerator {
  /**
   * Generate a random string of given length
   */
  static randomString(length: number = 8): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  /**
   * Generate a random email
   */
  static randomEmail(): string {
    return `test.${DataGenerator.randomString(6)}@example.com`;
  }

  /**
   * Generate a random integer between min and max (inclusive)
   */
  static randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate a random phone number
   */
  static randomPhone(): string {
    const area = DataGenerator.randomInt(200, 999);
    const prefix = DataGenerator.randomInt(200, 999);
    const line = DataGenerator.randomInt(1000, 9999);
    return `${area}-${prefix}-${line}`;
  }

  /**
   * Generate a random user object
   */
  static randomUser(): Record<string, string> {
    const firstName = DataGenerator.randomString(6);
    const lastName = DataGenerator.randomString(8);
    return {
      firstName,
      lastName,
      username: `${firstName}.${lastName}`,
      email: DataGenerator.randomEmail(),
      phone: DataGenerator.randomPhone(),
    };
  }

  /**
   * Generate a random postal code
   */
  static randomPostalCode(): string {
    return DataGenerator.randomInt(10000, 99999).toString();
  }
}

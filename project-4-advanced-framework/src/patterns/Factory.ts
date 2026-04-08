/**
 * Factory Pattern - Creates page objects dynamically.
 * Demonstrates the Factory design pattern for test automation.
 */
import { Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

/**
 * Registry of page constructors
 */
type PageConstructor = new (page: Page) => BasePage;

export class PageFactory {
  private static registry: Map<string, PageConstructor> = new Map();

  /**
   * Register a page type
   */
  static register(name: string, constructor: PageConstructor): void {
    PageFactory.registry.set(name.toLowerCase(), constructor);
  }

  /**
   * Create a page object by type name
   */
  static create(type: string, page: Page): BasePage {
    const Constructor = PageFactory.registry.get(type.toLowerCase());
    if (!Constructor) {
      throw new Error(`Page type "${type}" is not registered. Available: ${Array.from(PageFactory.registry.keys()).join(', ')}`);
    }
    return new Constructor(page);
  }

  /**
   * Check if a page type is registered
   */
  static has(type: string): boolean {
    return PageFactory.registry.has(type.toLowerCase());
  }

  /**
   * Get all registered page type names
   */
  static getRegisteredTypes(): string[] {
    return Array.from(PageFactory.registry.keys());
  }

  /**
   * Clear all registrations (for testing)
   */
  static clear(): void {
    PageFactory.registry.clear();
  }
}

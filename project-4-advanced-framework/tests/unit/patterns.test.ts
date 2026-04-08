/**
 * Unit tests for design patterns: Singleton, Factory, Strategy.
 */
import { TestConfig } from '../../src/config/TestConfig';
import { PageFactory } from '../../src/patterns/Factory';
import { FastStrategy, ResilientStrategy, VerboseStrategy, TestRunner } from '../../src/patterns/Strategy';
import { DataGenerator } from '../../src/utils/DataGenerator';

describe('Singleton Pattern - TestConfig', () => {
  afterEach(() => {
    TestConfig.resetInstance();
  });

  test('getInstance returns the same instance', () => {
    const instance1 = TestConfig.getInstance();
    const instance2 = TestConfig.getInstance();
    expect(instance1).toBe(instance2);
  });

  test('get returns default config values', () => {
    const config = TestConfig.getInstance();
    expect(config.get('baseURL')).toBe('https://www.saucedemo.com');
    expect(config.get('environment')).toBe('test');
  });

  test('set updates config value', () => {
    const config = TestConfig.getInstance();
    config.set('customKey', 'customValue');
    expect(config.get('customKey')).toBe('customValue');
  });

  test('getAll returns readonly copy', () => {
    const config = TestConfig.getInstance();
    const all = config.getAll();
    expect(all).toHaveProperty('baseURL');
    expect(all).toHaveProperty('environment');
  });
});

describe('Factory Pattern - PageFactory', () => {
  afterEach(() => {
    PageFactory.clear();
  });

  test('has returns false for unregistered type', () => {
    expect(PageFactory.has('nonexistent')).toBe(false);
  });

  test('create throws for unregistered type', () => {
    expect(() => PageFactory.create('nonexistent', {} as never)).toThrow(
      'Page type "nonexistent" is not registered'
    );
  });

  test('getRegisteredTypes returns empty initially', () => {
    expect(PageFactory.getRegisteredTypes()).toEqual([]);
  });
});

describe('Strategy Pattern - TestRunner', () => {
  test('FastStrategy does not retry', () => {
    const strategy = new FastStrategy();
    expect(strategy.shouldRetry(new Error('any error'))).toBe(false);
    expect(strategy.name).toBe('fast');
  });

  test('ResilientStrategy retries on timeout', () => {
    const strategy = new ResilientStrategy();
    expect(strategy.shouldRetry(new Error('timeout error'))).toBe(true);
    expect(strategy.shouldRetry(new Error('assertion error'))).toBe(false);
  });

  test('VerboseStrategy does not retry', () => {
    const strategy = new VerboseStrategy();
    expect(strategy.shouldRetry(new Error('any error'))).toBe(false);
  });

  test('TestRunner can switch strategies', () => {
    const runner = new TestRunner(new FastStrategy());
    expect(runner.getStrategyName()).toBe('fast');

    runner.setStrategy(new ResilientStrategy());
    expect(runner.getStrategyName()).toBe('resilient');

    runner.setStrategy(new VerboseStrategy());
    expect(runner.getStrategyName()).toBe('verbose');
  });
});

describe('DataGenerator', () => {
  test('randomString generates correct length', () => {
    const str = DataGenerator.randomString(10);
    expect(str.length).toBe(10);
  });

  test('randomEmail has valid format', () => {
    const email = DataGenerator.randomEmail();
    expect(email).toContain('@');
    expect(email).toContain('example.com');
  });

  test('randomInt is within range', () => {
    for (let i = 0; i < 50; i++) {
      const num = DataGenerator.randomInt(1, 10);
      expect(num).toBeGreaterThanOrEqual(1);
      expect(num).toBeLessThanOrEqual(10);
    }
  });

  test('randomUser has all fields', () => {
    const user = DataGenerator.randomUser();
    expect(user).toHaveProperty('firstName');
    expect(user).toHaveProperty('lastName');
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('phone');
  });

  test('randomPostalCode is 5 digits', () => {
    const code = DataGenerator.randomPostalCode();
    expect(code.length).toBe(5);
    expect(parseInt(code)).toBeGreaterThanOrEqual(10000);
  });
});

import * as options from '../options';
import { parseCliOptions, freezeOptions, buildVersionUrls, OPTIONS } from '../options';

describe('options', () => {
  it('should return specific properties', () => {
    expect(options).toMatchSnapshot();
  });
});

describe('parseCliOptions', () => {
  const originalArgv = process.argv;

  afterEach(() => {
    process.argv = originalArgv;
  });

  it.each([
    {
      description: 'with --docs-host flag',
      args: ['node', 'script.js', '--docs-host']
    },
    {
      description: 'without --docs-host flag',
      args: ['node', 'script.js']
    },
    {
      description: 'with other arguments',
      args: ['node', 'script.js', 'other', 'args']
    },
    {
      description: 'with --pf-version 4',
      args: ['node', 'script.js', '--pf-version', '4']
    },
    {
      description: 'with --pf-version 5',
      args: ['node', 'script.js', '--pf-version', '5']
    },
    {
      description: 'with --pf-version 6',
      args: ['node', 'script.js', '--pf-version', '6']
    },
    {
      description: 'with both --docs-host and --pf-version',
      args: ['node', 'script.js', '--docs-host', '--pf-version', '5']
    }
  ])('should attempt to parse args $description', ({ args = [] }) => {
    process.argv = args;

    const result = parseCliOptions();

    expect(result).toMatchSnapshot();
  });
});

describe('buildVersionUrls', () => {
  it('should build URLs for version 6 (default)', () => {
    const result = buildVersionUrls();

    expect(result.pfExternal).toContain('refs/heads/main');
    expect(result.pfExternalDesignComponents).toContain('design-guidelines/components');
    expect(result).toMatchSnapshot();
  });

  it('should build URLs for version 5', () => {
    const result = buildVersionUrls('5');

    expect(result.pfExternal).toContain('refs/heads/v5');
    expect(result.pfExternalDesignComponents).toContain('design-guidelines/components');
    expect(result).toMatchSnapshot();
  });

  it('should build URLs for version 4', () => {
    const result = buildVersionUrls('4');

    expect(result.pfExternal).toContain('refs/heads/v4');
    expect(result.pfExternal).toContain('packages/v4');
    expect(result.pfExternalDesignComponents).toContain('design-guidelines/components');
    expect(result).toMatchSnapshot();
  });
});

describe('freezeOptions', () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it('should return frozen options with consistent properties', () => {
    const result = freezeOptions({ docsHost: true });

    expect(Object.isFrozen(result)).toBe(true);
    expect(result).toBe(OPTIONS);
    expect(result).toMatchSnapshot('frozen');
  });

  it('should use version 6 by default', () => {
    const result = freezeOptions({});

    expect(result.pfVersion).toBe('6');
    expect(result.pfExternal).toContain('refs/heads/main');
  });

  it('should use specified version', () => {
    const result = freezeOptions({ pfVersion: '5' });

    expect(result.pfVersion).toBe('5');
    expect(result.pfExternal).toContain('refs/heads/v5');
  });

  it('should warn when using non-v6 version', () => {
    freezeOptions({ pfVersion: '5' });

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('Using PatternFly version 5 documentation')
    );
  });

  it('should not warn when using v6', () => {
    console.error = jest.fn();
    freezeOptions({ pfVersion: '6' });

    expect(console.error).not.toHaveBeenCalled();
  });

  it('should default to version 6 for invalid versions', () => {
    const result = freezeOptions({ pfVersion: '7' });

    expect(result.pfVersion).toBe('6');
    expect(result.pfExternal).toContain('refs/heads/main');
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('Invalid PatternFly version: 7')
    );
  });

  it('should default to version 6 for non-numeric versions', () => {
    const result = freezeOptions({ pfVersion: 'invalid' });

    expect(result.pfVersion).toBe('6');
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('Invalid PatternFly version: invalid')
    );
  });
});

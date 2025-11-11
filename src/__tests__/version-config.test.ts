import { getVersionConfig, VERSION_CONFIGS } from '../version-config';

describe('version-config', () => {
  describe('VERSION_CONFIGS', () => {
    it('should have configs for versions 4, 5, 6', () => {
      expect(VERSION_CONFIGS).toHaveProperty('4');
      expect(VERSION_CONFIGS).toHaveProperty('5');
      expect(VERSION_CONFIGS).toHaveProperty('6');
    });

    it('should have correct structure for each version', () => {
      Object.values(VERSION_CONFIGS).forEach(config => {
        expect(config).toHaveProperty('baseUrl');
        expect(config).toHaveProperty('chartsUrl');
        expect(config).toHaveProperty('llmsPath');
        expect(typeof config.baseUrl).toBe('string');
        expect(typeof config.chartsUrl).toBe('string');
        expect(typeof config.llmsPath).toBe('string');
      });
    });
  });

  describe('getVersionConfig', () => {
    it('should return valid config for version 6', () => {
      const config = getVersionConfig('6');

      expect(config.baseUrl).toContain('refs/heads/main');
      expect(config.baseUrl).toContain('patternfly-org');
      expect(config.llmsPath).toBe('6.0.0');
    });

    it('should return valid config for version 5', () => {
      const config = getVersionConfig('5');

      expect(config.baseUrl).toContain('refs/heads/v5');
      expect(config.baseUrl).toContain('patternfly-org');
      expect(config.llmsPath).toBe('5.0.0');
    });

    it('should return valid config for version 4', () => {
      const config = getVersionConfig('4');

      expect(config.baseUrl).toContain('refs/heads/v4');
      expect(config.baseUrl).toContain('packages/v4');
      expect(config.llmsPath).toBe('4.0.0');
    });

    it('should throw error for invalid version', () => {
      expect(() => getVersionConfig('3')).toThrow('Invalid PatternFly version: 3');
    });

    it('should throw error for version 7', () => {
      expect(() => getVersionConfig('7')).toThrow('Invalid PatternFly version: 7');
    });

    it('should throw error for non-numeric version', () => {
      expect(() => getVersionConfig('invalid')).toThrow('Invalid PatternFly version');
    });
  });
});

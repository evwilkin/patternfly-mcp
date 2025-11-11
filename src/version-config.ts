/**
 * PatternFly version-specific configuration
 */

/**
 * Version-specific configuration for documentation URLs
 */
interface VersionConfig {
  /** Base GitHub URL for documentation content */
  baseUrl: string;
  /** GitHub URL for charts source */
  chartsUrl: string;
  /** Path prefix for llms.txt files in docs-host mode */
  llmsPath: string;
}

/**
 * Configuration mapping for each supported PatternFly version
 */
const VERSION_CONFIGS: Record<string, VersionConfig> = {
  '6': {
    baseUrl:
      'https://raw.githubusercontent.com/patternfly/patternfly-org/refs/heads/main/packages/documentation-site/patternfly-docs/content',
    chartsUrl:
      'https://raw.githubusercontent.com/patternfly/patternfly-react/refs/heads/main/packages/react-charts/src',
    llmsPath: '6.0.0'
  },
  '5': {
    baseUrl:
      'https://raw.githubusercontent.com/patternfly/patternfly-org/refs/heads/v5/packages/documentation-site/patternfly-docs/content',
    chartsUrl:
      'https://raw.githubusercontent.com/patternfly/patternfly-react/refs/heads/v5/packages/react-charts/src',
    llmsPath: '5.0.0'
  },
  '4': {
    baseUrl:
      'https://raw.githubusercontent.com/patternfly/patternfly-org/refs/heads/v4/packages/v4/patternfly-docs/content',
    chartsUrl:
      'https://raw.githubusercontent.com/patternfly/patternfly-react/refs/heads/v4/packages/react-charts/src',
    llmsPath: '4.0.0'
  }
};

/**
 * Get version configuration with validation
 *
 * @param version - Major version (4, 5, or 6)
 * @returns Version configuration
 * @throws Error if version is invalid
 */
const getVersionConfig = (version: string): VersionConfig => {
  const config = VERSION_CONFIGS[version];

  if (!config) {
    throw new Error(`Invalid PatternFly version: ${version}. Supported versions: 4, 5, 6`);
  }

  return config;
};

export { getVersionConfig, VERSION_CONFIGS, type VersionConfig };

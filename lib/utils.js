const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Parses the user app configuration file.
 *
 * @returns {Object} The parsed configuration object.
 * @throws {Error} If the configuration file does not exist or cannot be parsed.
 */
function parseUserAppConfig() {
  const configFile = 'nhsbsa-docs.config.yaml';
  try {
    const fileContents = fs.readFileSync(`./${configFile}`, 'utf8');
    const config = yaml.load(fileContents);
    return config;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.info(
        `[nhsbsa-docs]: It looks like you don't have a ${configFile} file. Using defaults instead.`
      );
    } else {
      console.error(error);
      return null;
    }
  }
}

exports.parseUserAppConfig = parseUserAppConfig;

function logStartupLogo() {
  console.log(`
     __ _  _  _  ____  ____  ____   __       ____   __    ___  ____ 
    (  ( \\/ )( \\/ ___)(  _ \\/ ___) / _\\  ___(    \\ /  \\  / __)/ ___)
    /    /) __ (\\___ \\ ) _ (\\___ \\/    \\(___)) D ((  O )( (__ \\___ \\
    \\_)__)\\_)(_/(____/(____/(____/\\_/\\_/    (____/ \\__/  \\___)(____/
  `);
}

exports.logStartupLogo = logStartupLogo;

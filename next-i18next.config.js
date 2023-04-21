const path = require('path');

module.exports = {
    i18n: {
      defaultLocale: "de",
      locales: ["de", "en", "it", "fr"],
      localeDetection: false,
    },
    localePath:path.resolve("./locales"),
    reloadOnPrerender: process.env.NODE_ENV === 'development',
  };
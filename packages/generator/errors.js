const errorEx = require('error-ex');
module.exports = {
  InvalidParameter: errorEx('InvalidParameter', {
    parameter: errorEx.append('Invalid %s parameter'),
    details: {
      message: (details, message) => {
        return (
          message +
          '\n' +
          details
            .map(detail => `- ${detail.dataPath} ${detail.message}`.trim())
            .join('\n')
        );
      },
    },
  }),
};

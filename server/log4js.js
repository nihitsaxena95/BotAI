let log4js= require('log4js'); // importing the npm package from logging purpose of server files

log4js.configure({
  appenders: { chatbot_express_server: { type: 'file', filename: 'chatbot_express_server.log' }  },
  categories: { default:{appenders:['chatbot_express_server'], level: 'info' }} 
});

const logger=log4js.getLogger('chatbot_express_server');
logger.info('LOGGER WORKING SUCCESSFULLY');

module.exports= (logger);
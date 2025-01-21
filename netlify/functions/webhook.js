exports.handler = async (event) => {
    const VERIFY_TOKEN = process.env.SECRET_TOKEN;
  
    if (event.httpMethod === 'GET') {
      // Vérification du webhook
      const params = new URLSearchParams(event.queryStringParameters);
      if (params.get('hub.verify_token') === VERIFY_TOKEN) {
        return {
          statusCode: 200,
          body: params.get('hub.challenge'),
        };
      }
      return {
        statusCode: 403,
        body: 'Invalid token',
      };
    }
  
    if (event.httpMethod === 'POST') {
      // Gestion des notifications
      const body = JSON.parse(event.body);
      console.log('Notification reçue:', body);
      return {
        statusCode: 200,
        body: 'EVENT_RECEIVED',
      };
    }
  
    // Méthode non autorisée
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  };
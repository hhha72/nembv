# nembv
Node Express Mongo Bootstrap Vue Stack

## config file definition

    **cfg/cfg.js**

    ```javascript
    module.exports = {
      db: {
        url: 'mongodb://nembv:비밀번호@cluster0-xxx.mongodb.net:27017,cluster0-xxx.mongodb.net:27017,cluster0-xxx.mongodb.net:27017/nembv?ssl=true&replicaSet=Cluster0-xxx&authSource=admin',
        // url : "mongodb://xxx.com:27170/xxx"
        // url : 'mongodb+srv://id:pwd@cluster0-xxx.net/yyy' // 3.6이상
      },
      web: {
        // 추후 http, https, port등 
      },
    };

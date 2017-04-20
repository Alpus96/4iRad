module.exports = class SqlConnector {

  constructor(expressApp,mysql){
    let connectionCreds = require('./models/mysql-connection-creds.json');
    this.db = mysql.createConnection(connectionCreds);
    this.queries = require('./models/sql-queries.json');
    this.expressApp = expressApp;
    this.setUpRoutes();
  }

  setUpRoutes(){
    for(let queryName in this.queries){
      let querySql = this.queries[queryName];
      this.setupQuery(queryName,querySql);
    }
  }

  setupQuery(queryName,querySql){
    this.expressApp.all('/query/' + queryName,(req,res)=>{
      this.db.query(querySql,req.body.data,(err,result)=>{
        res.json(result);
      });
    })
  }

}
const moment = require('moment');
const mongoose = require('mongoose');

module.exports = {
    formatDate: function(date, format){
        return moment(date).format(format);
    },

    pesquisaData: function(date, format){
        query = { address: "Park Lane 38" };
        dbo.collection("customers").find(query).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
        });
      }

}
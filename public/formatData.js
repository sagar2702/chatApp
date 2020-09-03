var moment = require('moment');

function messageDetail(name, msg){
    return{
        username:name,
        message:msg,
        time:moment().format('h:mma')
    }
}

module.exports = messageDetail;

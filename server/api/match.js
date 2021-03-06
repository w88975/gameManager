var server = require('../index')
var jsonres = require('../../libs/jsonres')
var request = require('request')
var config = require('../../config')
var resParse = require('../../libs/resparse')

server.get('/api/matchlist',function(req,res){
    var queryText = JSON.stringify({
        pageIndex: req.query.pageIndex,
        pageSize: req.query.pageSize
    });
    request({
        url: config.remote_server + '/pk-web/sng/table/list?data=' + queryText,
        json: true,
        method: 'GET',
    },function(err,httpResponse,body) {
        if (!err) {
            var obj = {
                total: body.total || body.logcount,
                data: resParse(body)
            }
            
            res.send(jsonres(200,'success',obj))
        } else {
            res.send(jsonres(-1,'faild',null))
        }
    });
})

server.post('/api/table/delete',function(req,res){
    var bodyText = JSON.stringify({
        tableId: req.body.id
    })
    request({
        url: config.remote_server + '/pk-web/sng/table/delete',
        json: true,
        method: 'POST',
        form: {
            data: bodyText
        }
    },function(err,httpResponse,body) {
        if (!err) {
            res.send(jsonres(200,'success',body.data || []))
        } else {
            res.send(jsonres(-1,'faild',null))
        }
    });
})
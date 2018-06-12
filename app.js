const express = require('express')
const app = express()

const request = require('request')

//var urlQueue = 'http://35.187.231.36:80/api/v1/service/hibot'
var urlWoo = 'http://159.65.130.156:4471/api/v1/front-woo/menu?menu_id=20'
var urlWoo2 = 'https://cors-anywhere.herokuapp.com/159.65.130.156:4471/api/v1/front-woo/'

var lineUserID = 'U8d468e687e2a830ecf7006126484638c'
var options = { method: 'POST',
  url: 'https://api.line.me/v2/bot/message/push',
  headers: 
   { 'Postman-Token': '7380bbc8-cf34-4336-83e2-d11159eeb2dc',
     'Cache-Control': 'no-cache',
     Authorization: 'Bearer Shk6KGk9wD0a3G9tS6RCgcW9q99pmoxHBicFH4cPe2U5Ctygtl7lSaa0NriSQXREPVpwTFiZ15U+oqD0nt0+lcmUijiPbJltZG8bjt3wdnTNXvy1C+9TvT+XkGLeKdL3p52Fn43xhz85rfcCyMSq+gdB04t89/1O/w1cDnyilFU=',
     'Content-Type': 'application/json' },
  body: 
   { to: lineUserID,
     messages: 
      [ { type: 'text', text: 'Hello world' },
        { type: 'text', text: 'Test Message' } ] },
  json: true }

var jsonResponseError = {
    status: 'Error : '
}

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/order', (req, res) => {
    res.send('Order, QR Code?')
})

app.get('/queue', (req, res) => {
    //res.send('Queue, Estimate time')
    var lineID = req.query.line_id
    if(lineID !== undefined){
        urlQueue = 'http://35.187.231.36:80/api/v1/service/hibot'
        request(urlQueue, (error, response, body) => {
            if (error) {
                res.status(400)
                res.send('Error ')
                return
            }

            if (response.statusCode == 200){
                try{
                    console.log('Parsing JSON! ')
                    var temp = JSON.parse(body)
    
                    if(temp[0]['queue'] !== undefined && temp[0]['est_time'] !== undefined){
                        request({ method: 'POST',
                        url: 'https://api.line.me/v2/bot/message/push',
                        headers: 
                         { 'Postman-Token': '7380bbc8-cf34-4336-83e2-d11159eeb2dc',
                           'Cache-Control': 'no-cache',
                           Authorization: 'Bearer Shk6KGk9wD0a3G9tS6RCgcW9q99pmoxHBicFH4cPe2U5Ctygtl7lSaa0NriSQXREPVpwTFiZ15U+oqD0nt0+lcmUijiPbJltZG8bjt3wdnTNXvy1C+9TvT+XkGLeKdL3p52Fn43xhz85rfcCyMSq+gdB04t89/1O/w1cDnyilFU=',
                           'Content-Type': 'application/json' },
                        body: 
                         { to: lineID,
                           messages: 
                            [ { type: 'text', text: 'Hello world' },
                              { type: 'text', text: 'Queue : ' + temp[0]['queue'] + '\n' + 'Estimate Time : ' + temp[0]['est_time']} ] },
                        json: true }, function (error, response, body) {
                            if (error) {
                                res.status(400)
                                res.send('Error ')
                                return
                            }
    
                            if (response.statusCode == 200){
                                console.log("Push messgae completed")
                                res.end('Push messgae completed');
                            }
                            else{
                                console.log("Push messgae error")
                                res.status(400);
                                res.send('None shall pass');
                            }                        
                        })
                    }
                    else {
                        res.json(jsonResponseError)
                    }
            
                } catch (e) {
                    console.log('Error parsing JSON!')
                    res.end()
                }
            }
            else{
                console.log('Response from queue api not equle 200')
                res.status(400);
                res.send('Error ');
            }
            })
    }
    else {
        console.log("Error parameter")
        res.status(400)
        res.send('Error parameter')
    }
})

app.get('/history', (req, res) => {
    res.send('History')
})

app.get('/promotion', (req, res) => {
    res.send('Promotion')
})

app.get('/qrcode', (req, res) => {
    res.send('QR code')
})

app.get('/status', (req, res) => {
    var lineID = req.query.line_id
    var orderID = req.query.order_id
    if(orderID !== undefined && lineID !== undefined){
        urlQueue = 'http://35.187.231.36:80/api/v1/service/hibot?order_id=' + orderID
        request(urlQueue, (error, response, body) => {
            if (error) {
                res.status(400)
                res.send('Error ')
                return
            }

            if (response.statusCode == 200){
                try{
                    console.log('Parsing JSON! ')
                    var temp = JSON.parse(body)
                    console.log('Test : ', temp[0]['order_id'])
                    if(temp[0]['order_id'] !== undefined){
                        request({ method: 'POST',
                        url: 'https://api.line.me/v2/bot/message/push',
                        headers: 
                         { 'Postman-Token': '7380bbc8-cf34-4336-83e2-d11159eeb2dc',
                           'Cache-Control': 'no-cache',
                           Authorization: 'Bearer Shk6KGk9wD0a3G9tS6RCgcW9q99pmoxHBicFH4cPe2U5Ctygtl7lSaa0NriSQXREPVpwTFiZ15U+oqD0nt0+lcmUijiPbJltZG8bjt3wdnTNXvy1C+9TvT+XkGLeKdL3p52Fn43xhz85rfcCyMSq+gdB04t89/1O/w1cDnyilFU=',
                           'Content-Type': 'application/json' },
                        body: 
                         { to: lineID,
                           messages: 
                            [ { type: 'text', text: 'Order ID : ' + temp[0]['order_id'] + '\n' + 'Status : ' + temp[0]['status']+ 'Estimate Time : ' + temp[0]['est_time']} ] },
                        json: true }, function (error, response, body) {
                            if (error) {
                                res.status(400)
                                res.send('Error ')
                                return
                            }
    
                            if (response.statusCode == 200){
                                console.log("Push messgae completed")
                                res.end('Push messgae completed');
                            }
                            else{
                                console.log("Push messgae error")
                                res.status(400);
                                res.send('None shall pass');
                            }                        
                        })
                    }
                    else {
                        res.json(jsonResponseError)
                    }
            
                } catch (e) {
                    console.log('Error parsing JSON!')
                    res.end()
                }
            }
            else{
                console.log('Response from queue api not equle 200')
                res.status(400);
                res.send('Error ');
            }
            })
    }
    else {
        console.log("Error parameter")
        res.status(400)
        res.send('Error parameter')
    }
    
    /*
    request(options, function (error, response, body) {
        if (error) throw new Error(error)
      
        console.log("Push messgae completed")

        
      })
      */
})

app.listen(4460, () => {
    console.log('Start server at port 4460.')
})
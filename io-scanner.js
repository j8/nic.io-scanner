'use strict';

const appName = require('./package.json').name
const config = require('rc')(appName)
const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const LineByLineReader = require('line-by-line')
const lr = new LineByLineReader(config.wordsFile)
const headers = {
    'User-Agent':       'j8 Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}
const logger = require('bunyan').createLogger({name: 'node.io-scanner', level: process.env['BUNYAN_LEVEL'] || 'info'})

let minSec = config.minimumSeconds
let maxSec = config.maximumSeconds
let words = 0

function randomInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

lr.on('error', function (err) {
    logger.error(`==== Error scanning ${err} ====`);
})

lr.on('line', function (word) {
    lr.pause()
    words += 1

    setTimeout(function () {
    	request({url: config.url, method: 'GET', headers: headers, qs: {'query': word + config.extension}, timeout: config.requestTimeout}, function(error, response, html){
    		if(!error && response.statusCode == 200){
    			let $ = cheerio.load(html)
    			logger.info(`====  ${words}) Checking domain: ${word}${config.extension} ====`);

				$("#bodyfill b").filter(function() {
				 if( $(this).text().indexOf('pendingDelete') >= 0) {

					logger.warn(`==== Domain ${word}${config.extension} pending delete ${$(this).text()} ====`);
				 	lr.resume()
				 } else if ( $(this).text().indexOf('This Domain is') >= 0) {

				 	logger.warn(`==== BAZINGA! Domain ${word}${config.extension} is free ====`);
				 	lr.resume()
				 } else {
				 	
				 	lr.resume()
				 }
				})
    		} else {
    			logger.error(`==== Error or timeout ====`);
    			lr.resume()
    		}
    	})

    }, randomInterval(minSec,maxSec))
})
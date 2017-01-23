'use strict';

var express = require('express');
var responseTime = require('response-time');

var eventsHandler = require('../domain/events-handler');

module.exports = function(){

  return responseTime(function (req, res, time) {

    var data = {
      body: req.body,
      duration: time*1000,
      headers: req.headers,
      method: req.method,
      path: req.path,
      relativeUrl: req.originalUrl,
      query: req.query,
      url: req.protocol + '://' + req.get('host') + req.originalUrl,
      statusCode: res.statusCode
    };

    if(!!res.errorDetails){
      data.errorDetails = res.errorDetails;
    }

    if(!!res.errorCode){
      data.errorCode = res.errorCode;
    }

    eventsHandler.fire('request', data);
  });
};
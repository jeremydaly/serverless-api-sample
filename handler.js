'use strict'

/**
 * Sample serverless API using Serverless framework and lambda-api
 * @author Jeremy Daly <jeremy@jeremydaly.com>
 * @version 1.0.0
 * @license MIT
 */


// Require and init API router module
const app = require('lambda-api')({ version: 'v1.0', base: 'v1' })


//----------------------------------------------------------------------------//
// Define Middleware
//----------------------------------------------------------------------------//

  // Add CORS Middleware
  app.use(function(req,res,next) {

    // Add CORS headers for every request
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    // Call next to continue processing
    next()
  })


  // Add Authorization Middleware
  app.use(function(req,res,next) {

    // Check for Authorization headers
    if (req.headers.authorization) {
      // Attempt to parse the Bearer token
      let token = req.headers.authorization.replace(/^Bearer/,'').trim()
      // Set the token in the request scope
      req.token = token
      // Do some checking here to make sure it is valid (set an auth flag)
      req.auth = true
    }

    // Call next to continue processing
    next()
  })

//----------------------------------------------------------------------------//
// Build API routes
//----------------------------------------------------------------------------//

  // Get
  app.get('/posts', function(req,res) {
    // Send the response
    res.status(200).json({
      status: 'ok',
      version: req.version,
      auth: req.auth,
      body: req.body,
      query: req.query
    })
  })

  // Post
  app.post('/posts', function(req,res) {
    // Send the response
    res.status(200).json({
      status: 'ok',
      version: req.version,
      auth: req.auth,
      body: req.body,
      query: req.query
    })
  })

  // Put
  app.put('/posts/:post_id', function(req,res) {
    // Send the response
    res.status(200).json({
      status: 'ok',
      version: req.version,
      auth: req.auth,
      body: req.body,
      query: req.query,
      params: req.params
    })
  })


  // Delete
  app.delete('/posts/:post_id', function(req,res) {
    // Send the response
    res.status(200).json({
      status: 'ok',
      version: req.version,
      auth: req.auth,
      params: req.params
    })
  })


  // Default Options for CORS preflight
  app.options('/*', function(req,res) {
    res.status(200).json({})
  })



//----------------------------------------------------------------------------//
// Main router handler
//----------------------------------------------------------------------------//
module.exports.router = (event, context, callback) => {

  // !!!IMPORTANT: Set this flag to false, otherwise the lambda function
  // won't quit until all DB connections are closed, which is not good
  // if you want to freeze and reuse these connections
  context.callbackWaitsForEmptyEventLoop = false

  // Run the request
  app.run(event,context,callback)

} // end router handler

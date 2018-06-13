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
  app.use((req,res,next) => {

    // Add default CORS headers for every request
    res.cors()

    // Call next to continue processing
    next()
  })


  // Add Authorization Middleware
  app.use((req,res,next) => {

    // Check for Authorization Bearer token
    if (req.auth.type === 'Bearer') {
      // Get the Bearer token value
      let token = req.auth.value
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
  app.get('/posts', (req,res) => {
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
  app.post('/posts', (req,res) => {
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
  app.put('/posts/:post_id', (req,res) => {
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
  app.delete('/posts/:post_id', (req,res) => {
    // Send the response
    res.status(200).json({
      status: 'ok',
      version: req.version,
      auth: req.auth,
      params: req.params
    })
  })


  // Default Options for CORS preflight
  app.options('/*', (req,res) => {
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

const middleware = require('../utils/middleware')
const commentsRouter = require('express').Router()
const Comment = require('../models/comment')

// BEGIN ROUTES
commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({})
  response.json(comments)
})

// END ROUTES

module.exports = commentsRouter

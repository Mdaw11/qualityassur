const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const taskController = require('../config/issue')


// @desc    Show add page
// @route   GET /stories/add
router.get('/add', ensureAuth, taskController.issue_create)

// @desc    Process add form
// @route   POST /stories
router.post('/', ensureAuth, taskController.issue_create_post)

// @desc    Show all stories
// @route   GET /stories
router.get('/', ensureAuth, taskController.issue_show_all)

// @desc    Show single story
// @route   GET /stories/:id
router.get('/:id', ensureAuth, taskController.issue_show_one)

// @desc    Show edit page
// @route   GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, taskController.issue_edit_get)

// @desc    Update story
// @route   PUT /stories/:id
router.put('/:id', ensureAuth, taskController.issue_edit_put)

// @desc    Delete story
// @route   DELETE /stories/:id
router.delete('/:id', ensureAuth, taskController.issue_delete)

// @desc    User stories
// @route   GET /stories/user/:userId
router.get('/user/:userId', ensureAuth, taskController.issue_user)


module.exports = router

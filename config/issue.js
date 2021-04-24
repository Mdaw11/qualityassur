const Issue = require('../models/Issue');

const issue_index = async (req, res) => {
    try {
        const issues = await Issue.find({ status: 'open' })
          .populate('user')
          .sort({ createdAt: 'desc' })
          .lean()
    
        res.render('issues/index', {
          issues,
        })
      } catch (err) {
        console.error(err)
        res.render('error/500')
      }
}

const issue_create = async (req, res) => {
    res.render('issues/add');
}

const issue_create_post = async (req, res) => {
    try {
        req.body.user = req.user.id
        await Issue.create(req.body)
        res.redirect('/dashboard')
      } catch (err) {
        console.error(err)
        res.render('error/500')
      }
}

const issue_show_all = async (req, res) => {
    try {
        const issues = await Issue.find({ status: 'open' })
          .populate('user')
          .sort({ createdAt: 'desc' })
          .lean()
    
        res.render('issues/index', {
          issues,
        })
      } catch (err) {
        console.error(err)
        res.render('error/500')
      }
}

const issue_show_one = async (req, res) => {
    try {
        let issue = await Issue.findById(req.params.id).populate('user').lean()
    
        if (!issue) {
          return res.render('error/404')
        }
    
        if (issue.user._id != req.user.id && issue.status == 'close') {
          res.render('error/404')
        } else {
          res.render('issues/show', {
            issue,
          })
        }
      } catch (err) {
        console.error(err)
        res.render('error/404')
      }
}

const issue_edit_get = async (req, res) => {
    try {
        const issue = await Issue.findOne({
          _id: req.params.id,
        }).lean()
    
        if (!issue) {
          return res.render('error/404')
        }
    
        if (issue.user != req.user.id) {
          res.redirect('/issues')
        } else {
          res.render('issues/edit', {
            issue,
          })
        }
      } catch (err) {
        console.error(err)
        return res.render('error/500')
      }
}

const issue_edit_put = async (req, res) => {
    try {
        let issue = await Issue.findById(req.params.id).lean()
    
        if (!issue) {
          return res.render('error/404')
        }
    
        if (issue.user != req.user.id) {
          res.redirect('/issues')
        } else {
          issue = await Issue.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
          })
    
          res.redirect('/dashboard')
        }
      } catch (err) {
        console.error(err)
        return res.render('error/500')
      }
}

const issue_delete = async (req, res) => {
    try {
        let issue = await Issue.findById(req.params.id).lean()
    
        if (!issue) {
          return res.render('error/404')
        }
    
        if (issue.user != req.user.id) {
          res.redirect('/issues')
        } else {
          await Issue.remove({ _id: req.params.id })
          res.redirect('/dashboard')
        }
      } catch (err) {
        console.error(err)
        return res.render('error/500')
      }
}

const issue_user = async (req, res) => {
    try {
        const issues = await Issue.find({
          user: req.params.userId,
          status: 'open',
        })
          .populate('user')
          .lean()
    
        res.render('issues/index', {
          issues,
        })
      } catch (err) {
        console.error(err)
        res.render('error/500')
      }
}


module.exports = {
    issue_index,
    issue_create,
    issue_create_post,
    issue_show_all,
    issue_show_one,
    issue_edit_get,
    issue_edit_put,
    issue_delete,
    issue_user,
}
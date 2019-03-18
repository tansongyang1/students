/* 
	路由：
	首页
	新增页面
	修改页面
*/

const express = require('express')
const fs = require('fs')
const students = require('./students-m')	// 使用 mongoDB

let router = express.Router()

// 初始化列表
router.get('/students', function(req, res) {
	students.find(function(err, data) {
		res.render('index.html', {
			classes: ['前端班', 'java班', 'UI班', 'PHP班'],
			students: data
		})
	})
})

// 跳转到新增页面
router.get('/students/new', function(req, res) {
	res.render('new.html')
})

// 处理表单数据，返回列表页
router.post('/students/new', function(req, res) {
	var student = new students(req.body)
	student.save(function(err, ret) {
		if (err) {
			return res.status(500).send('Server error.')
		}
		res.redirect('/students')
	})
})

// 跳转到编辑页面，传一个id过去
router.get('/students/edit', function(req, res) {
	// 因为 req.query.id 是字符串形式的，因此要转成数值
	students.findById(req.query.id.replace(/"/g, ''), function(err, data) {
		if (err) {
			return res.status(500).send('Server error.')
		}
		res.render('edit.html', {
			student: data
		})
	})
})

// 处理表单数据，返回列表页
router.post('/students/edit', function(req, res) {
	var id = req.body.id.replace(/"/g, '')
	students.findByIdAndUpdate(id, req.body, function(err){
		if (err) {
			return res.status(500).send('Server error.')
		}
		res.redirect('/students')
	})
})

router.get('/students/del', function(req, res) {
	var id = req.query.id.replace(/"/g, '')
	students.findByIdAndRemove(id, function(err){
		if (err) {
			return res.status(500).send('Server error.')
		}
		res.redirect('/students')
	})
})

module.exports = router;

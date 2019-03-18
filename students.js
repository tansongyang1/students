
/* 
	数据操作
 */

const fs = require('fs')

let dbpath = './db.json'

// 查询数据
exports.find = function(callback){
	fs.readFile(dbpath, function(err, data) {
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data.toString()).students
		callback(null, students)
	})
}

// 新增数据
exports.save = function(option, callback){
	fs.readFile(dbpath, function(err, data) {
		if (err) {
			return callback(err)
		}
		// 取出数组
		var students = JSON.parse(data.toString()).students
		// 手动添加id
		option.id = students[students.length - 1].id + 1
		// 表单数据添加到json中
		students.push(option)
		// 转成json格式的字符串
		var newStudents = JSON.stringify({
			students: students
		})
		// 写入到json文件中
		fs.writeFile(dbpath, newStudents, function(err){
			if (err) {
				callback(err)
			}
			callback()
		})
	})
}

// 获取当前学生信息
exports.findById = function(id, callback){
	fs.readFile(dbpath, function(err, data){
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data.toString()).students
		// find方法：es6 中自带的，遍历数组，如果条件满足，返回当前项
		var stu = students.find(function(item){
			return item.id === id
		})
		callback(null, stu)
	})
}

// 修改数据
exports.updataById = function(option, callback){
	fs.readFile(dbpath, function(err, data) {
		if (err) {
			return callback(err)
		}
		// option 传过来的是个字符串，id 成员要转成数字类型
		option.id = +option.id
		var students = JSON.parse(data.toString()).students
		var stu = students.find(function(item){
			return item.id === option.id
		})
		for(var k in option){
			stu[k] = option[k]
		}
		var newStudents = JSON.stringify({
			students: students
		})
		fs.writeFile(dbpath, newStudents, function(err){
			if (err) {
				callback(err)
			}
			callback()
		})
	})
}

// 删除数据
exports.del = function(id, callback){
	fs.readFile(dbpath, function(err, data) {
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data.toString()).students
		// findIndex 是ES6中专门用来找下标
		var index = students.findIndex(function(item){
			return item.id = id
		})
		students.splice(index, 1)
		var newStudents = JSON.stringify({
			students: students
		})
		fs.writeFile(dbpath, newStudents, function(err){
			if (err) {
				callback(err)
			}
			callback()
		})
	})
}
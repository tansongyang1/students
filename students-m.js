
const mongoose = require('mongoose')
// 连接数据库
mongoose.connect("mongodb://localhost/crud", { useNewUrlParser: true })

var Schema = mongoose.Schema

// 设计表结构
var studentSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	gender: {
		type: Number,
		enum: [0, 1],
		default: 0
	},
	phone: {
		type: String,
		required: true
	}
})

// 发布表结构
module.exports = mongoose.model('Student', studentSchema)
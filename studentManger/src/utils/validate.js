

// 正则库 

export const reg = {
	phone:/^1[3|4|5|6|7|8|9][0-9]{9}$/, // 手机号码验证
	pwd:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,// 6-16位数字加字母
	pay:/^\d{6}$/,  // 6位支付密码
    code:/^\d{4}$/,  // 验证码 code
	account:/[^a-zA-Z0-9]/g,// 账号  字母数字混合
	idCard:/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,//身份证号码
	email:/^^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$$/,//邮箱正则
}
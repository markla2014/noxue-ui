import request from "./request"

export function GetCaptcha() {
  return request({
    url: '/captcha',
    method: 'get'
  })
}


export function GetCode(captcha_id, captcha_code, number) {
  return request({
    url: '/code',
    method: 'get',
    params:{
      captcha_id,
      captcha_code,
      number
    }
  })
}

/**
 * 	Nick   string // 名字
	Name   string // 账号
	Secret string // 密码
	CodeId string // 验证码Id
	Code   string // 验证码
 */

export function UserReg(nick, name, secret, codeid, code) {
  return request({
    url: '/users',
    method: 'post',
    data:{
      nick,
      name,
      secret,
      codeid,
      code
    }
  })
}

export function UserLogin(name, secret, captcha_id, captcha_code) {
  return request({
    url: '/token',
    method: 'post',
    data:{
      name,
      secret,
    },
    params:{
      captcha_id,
      captcha_code,
    }
  })
}

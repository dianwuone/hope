export function validateContactValue(contactType, contactValue) {
  const value = (contactValue || '').trim()
  if (!value) return '联系方式不能为空'

  if (contactType === 'email') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : '邮箱格式不正确'
  }

  if (contactType === 'phone') {
    return /^\+?[0-9][0-9\s-]{6,18}[0-9]$/.test(value) ? '' : '电话号码格式不正确'
  }

  if (contactType === 'wechat') {
    return /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/.test(value) ? '' : '微信号格式不正确'
  }

  return ''
}

export function contactInputType(contactType) {
  if (contactType === 'email') return 'email'
  if (contactType === 'phone') return 'tel'
  return 'text'
}

export const validatePassword = (password, password2) => {
  let valid = true
  if (password2) {
    valid = password === password2
  }
  return valid
}

export const validateUserRegister = (user) => {
  let valid = true
  valid = user.username
    ? user.password
        ? user.password2
            ? user.password === user.password2
            : false
        : false
    : false
  return valid
}

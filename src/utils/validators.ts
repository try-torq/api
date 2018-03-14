import { ValidationException } from '../exceptions'

export function validateEmail(email: string) {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    throw new ValidationException('invalid email');

  return true;
}

export function validateUsername(username: string) {
  if (!/^[a-z][a-z0-9_\-]{7,15}$/i.test(username))
    throw new ValidationException(
      'invalid username; must start with an alphabetic ' +
      'character and be 8-16 characters long consisting ' +
      'only alphanumeric characters, underscores and ' +
      'dashes.'
    );

  return true;
}

export function validatePassword(password: string) {
  const isInvalidLength = !/^.{8,16}$/.test(password)
  const doesntContainSpecChars =
    !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(password)

  if (isInvalidLength || doesntContainSpecChars)
    throw new ValidationException(
      'invalid password; must be 8-16 characters long and ' +
      'contain at least on special character.'
    );

  return true;
}

export function validatePositiveInteger(n: number) {
  return n % 1 === 0
    && n >= 0
}

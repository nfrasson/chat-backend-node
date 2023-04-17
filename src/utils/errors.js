class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class DataValidationError extends DomainError {
  constructor(message) {
    super(message);
    this.message = message;
    this.code = 400;
  }
}

class DuplicatedRegisterError extends DomainError {
  constructor(message = "User already registered") {
    super(message);
    this.message = message;
    this.code = 400;
  }
}

class UserNotFoundError extends DomainError {
  constructor(message = "User not found") {
    super(message);
    this.message = message;
    this.code = 404;
  }
}

class NotAuthorizedError extends DomainError {
  constructor(message = "Not authorized") {
    super(message);
    this.message = message;
    this.code = 401;
  }
}

module.exports = {
  DataValidationError,
  DuplicatedRegisterError,
  UserNotFoundError,
  NotAuthorizedError,
};

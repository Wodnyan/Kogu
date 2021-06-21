class AuthenticateUser
  def initialize(email, password)
    @email = email
    @password = password
  end

  # Service entry point
  def call
    JsonWebToken.encode(user_id: user.id) if user
  end

  private

  attr_reader :email, :password

  # verify user credentials
  def user
    user = User.find_by(email: email)
    if !user
      raise(ExceptionHandler::AuthenticationError, { email: 'Incorrect email' }.to_json)
    elsif !user.authenticate(password)
      raise(ExceptionHandler::BadRequest, { password: 'Incorrect password' }.to_json)
    else
      user
    end
  end
end

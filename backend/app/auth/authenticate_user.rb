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
      raise ExceptionHandler::AuthenticationError.new({ email: 'No email found' })
    elsif !user.authenticate(password)
      raise ExceptionHandler::AuthenticationError.new({ email: 'No email found' })
    else
      user
    end
  end
end

class AuthorizeApiRequest
  def initialize(headers = {})
    @headers = headers
  end

  def call
    {
      user: user
    }
  end

  private

  def user
    @user ||= User.where('id = ?', decoded_auth_token[:user_id]).select(select).first if decoded_auth_token
  rescue ActiveRecord::RecordNotFound => e
    raise(
      ExceptionHandler::InvalidToken,
      ("#{Message.invalid_token} #{e.message}")
    )
  end

  def decoded_auth_token
    is_blacklisted = JsonWebToken.is_blacklisted http_auth_header
    if is_blacklisted
      raise(ExceptionHandler::AuthenticationError, Message.unauthorized)
    else
      @decoded_auth_token ||= JsonWebToken.decode(http_auth_header)
    end
  end

  def http_auth_header
    return @headers['Authorization'].split(' ').last if @headers['Authorization'].present?

    raise(ExceptionHandler::MissingToken, Message.missing_token)
  end

  def select
    ['id', 'email', 'name', 'updated_at as updatedAt', 'created_at as createdAt']
  end
end

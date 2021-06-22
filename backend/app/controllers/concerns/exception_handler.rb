module ExceptionHandler
  # provides the more graceful `included` method
  extend ActiveSupport::Concern

  class AuthenticationError < StandardError
    attr_reader :data

    def initialize(data)
      super
      message = 'AuthenticationError'
      @data = data
    end
  end

  class MissingToken < StandardError; end

  class InvalidToken < StandardError; end

  class BadRequest < StandardError; end

  included do
    rescue_from ActiveRecord::RecordInvalid, with: :four_twenty_four
    rescue_from ExceptionHandler::AuthenticationError, with: :unauthorized_request
    rescue_from ExceptionHandler::InvalidToken, with: :four_twenty_four
    rescue_from ExceptionHandler::MissingToken, with: :four_twenty_four
    rescue_from ExceptionHandler::BadRequest, with: :bad_request

    rescue_from ActiveRecord::RecordNotFound do |e|
      json_response({ message: e.message }, :not_found)
    end
  end

  private

  def bad_request(e)
    json_response({ message: e.message }, :bad_request)
  end

  def four_twenty_four(e)
    json_response({ message: e.message }, :unprocessable_entity)
  end

  def unauthorized_request(e)
    json_response({ message: e.message }, :unauthorized)
  end
end

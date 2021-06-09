class UsersController < ApplicationController
  skip_before_action :authorize_request, only: %i[create articles]

  # Sign up
  def create
    user = User.create!(user_params)
    auth_token = AuthenticateUser.new(user.email, user.password).call
    response = { message: Message.account_created, auth_token: auth_token }
    json_response(response, :created)
  end

  # Get all articles of a user
  def articles
    article = Article.where("user_id = #{params[:user_id]}")
    json_response(article, :ok)
  end

  private

  def user_params
    params.permit(
      :name,
      :email,
      :password,
      :password_confirmation
    )
  end
end

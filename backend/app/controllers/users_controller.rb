class UsersController < ApplicationController
  skip_before_action :authorize_request, only: %i[signup show]
  before_action :set_user

  def show
    json_response(@user)
  end

  # Sign up
  def signup
    user = User.create!(user_params)
    auth_token = AuthenticateUser.new(user.email, user.password).call
    response = { message: Message.account_created, auth_token: auth_token }
    json_response(response, :created)
  end

  def me
    json_response(current_user)
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

  def select
    ['id', 'email', 'name',  'updated_at as updatedAt', 'created_at as createdAt']
  end

  def set_user
    @user = User.where('id = ?', params[:id]).select(select).first
  end
end

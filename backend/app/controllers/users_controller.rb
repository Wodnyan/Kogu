class UsersController < ApplicationController
  skip_before_action :authorize_request, only: %i[signup show]
  before_action :set_user

  def show
    json_response(@user)
  end

  # Sign up
  def signup
    user = User.create(user_params)
    user_errors = user.errors.full_messages

    # Remove password digest validation message
    user_errors.each_with_index do |error, index|
      if error.include?('Password digest')
        puts index
        user_errors.delete_at(index)
      end
    end 

    if user_errors.length > 0
      response = { message: 'Bad Request',  errors: user_errors }
      return json_response(response, :bad_request)
    else 
      auth_token = JsonWebToken.encode(user_id: user.id) if user
      response = { message: Message.account_created, auth_token: auth_token }
      json_response(response, :created)
    end
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

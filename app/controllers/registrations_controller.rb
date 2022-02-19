class RegistrationsController < ApplicationController
  def create
    if !params[:user][:email].blank? && !params[:user][:password].blank? && !params[:user][:password_confirmation].blank? 
      user = User.create(
        email: params['user']['email'],
        password: params['user']['password'],
        password_confirmation: params['user']['password_confirmation']
      )
    end

    if user
      session[:user_id] = user.id
      render json: {
        status: :created,
        user: user
      }
    else
      render json: {status: 500}
    end
    
  end

end

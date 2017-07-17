class SessionsController < ApplicationController
  skip_before_action :login_required, only: [:new, :create]
  def new
  end

  def create
    if auth_hash = request.env["omniauth.auth"]
      user = User.find_or_create_by_omniauth(auth_hash)
      session[:user_id] = user.id
      redirect_to root_path
    else
      @user = User.find_by(email: params[:email]) || @user = User.find_by(username: [params[:username]])
      if user && user.authenticate(params[:password])
        session[:user_id] = @user.id
        redirect_to root_path
      else
        render 'sessions/new'
      end
    end
  end

  def destroy
    session.destroy
    redirect_to root_path
  end

  private
    def sessions_params
      params.require(:user).permit(:email, :password, :username)
    end
end

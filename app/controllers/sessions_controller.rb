class SessionsController < ApplicationController
  skip_before_action :login_required, only: [:new, :create]
  def new
    if logged_in?
      redirect_to root_path
    end
  end

  def create
    if auth_hash = request.env["omniauth.auth"]
      user = User.find_or_create_by_omniauth(auth_hash)
      session[:user_id] = user.id
      redirect_to root_path
    else
      @email = User.find_by(email: params[:email])
      @username = User.find_by(username: [params[:username]])
      @user = @email ||= @username
      if @user && @user.authenticate(params[:password])
        flash[:notice] = ['Welcome back!']
        session[:user_id] = @user.id
        redirect_to root_path
      else
        flash[:error] = ['<strong>Not so Fast.</strong> Invalid username and/or password.']
        render :new
      end
    end
  end

  def destroy
    session.destroy
    redirect_to signin_path
  end

  private
    def sessions_params
      params.require(:user).permit(:email, :username, :password)
    end
end

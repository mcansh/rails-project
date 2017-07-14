class SessionsController < ApplicationController
  def new
  end

  def create
    if auth_hash = request.env["omniauth.auth"]
      # store user info
      oauth_user = request.env["omniauth.auth"]["info"]
      if user = User.find_by(email: oauth_user["email"])
        session[:user_id] = user.id
        redirect_to root_path
      else
        user = User.create(email: oauth_user["email"], password: SecureRandom.hex, name: oauth_user["name"], username: oauth_user["nickname"])
        if user.save
          session[:user_id] = user.id
          redirect_to root_path
        else
          render 'sessions/new'
        end
      end
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

class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by(email: params[:email]) || @user = User.find_by(username: [params[:username]])
    session[:user_id] = @user.id
    redirect_to root_path
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

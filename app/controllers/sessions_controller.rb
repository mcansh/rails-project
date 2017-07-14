class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by(email: params[:email])
    session[:user_id] = @user.id
  end

  def destroy
    session.destroy
    redirect_to root_path
  end

  private
    def sessions_params
      params.require(:user).permit(:email, :password)
    end
end

class UsersController < ApplicationController
  skip_before_action :login_required, only: [:new, :create]
  def new
    if !logged_in?
      @user = User.new
    else
      redirect_to root_path
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path
    else
      flash[:error] = @user.errors.full_messages
      render :new
    end
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password, :username)
    end
end

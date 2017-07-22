class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :login_required

  private
    def can_current_user?(action, object)
      object.send("#{action}able_by?", current_user)
    end

    def login(user)
      session[:user_id] = user.id # Logging them in as a user.
    end

    def current_user
      @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
    end

    helper_method :current_user

    def login_required
      if !logged_in?
        flash[:error] = ['Please sign in first!']
        redirect_to signin_path
      end
    end

    def logged_in?
      !!current_user
    end
    helper_method :logged_in?
end

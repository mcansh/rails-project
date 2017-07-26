class ListsController < ApplicationController
  before_action :set_list
  def index
    @list = List.new
    @lists = List.all
  end

  def show
    @list = List.find_by(id: params[:id])
    if @list.user_id === @current_user.id
      @task = Task.new
    else
      flash[:error] = ["List not found"]
      redirect_to root_path
    end
  end

  def create
    @list = List.new(list_params)
    @list.user_id = current_user.id
    if @list.save
      redirect_to @list
    else
      @lists = List.all
      render :index
    end
  end

  def edit
    if @list.user_id != current_user.id
      flash[:error] = ["You can't edit that!"]
      redirect_to @list
    end
  end

  def update
    @list.update(list_params)
    flash[:notice] = ['List updated!']
    redirect_to @list
  end

  def destroy
    if @list.user_id == current_user.id
      @list.destroy
      redirect_to root_path
    else
      flash[:error] = ["You don't have permission to delete that!"]
    end
  end

  private
    def list_params # strong params
      params.require(:list).permit(:name, :user)
    end

    def set_list
      @list = List.find_by(id: params[:id])
    end
end

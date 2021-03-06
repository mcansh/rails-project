class ListsController < ApplicationController
  before_action :set_list
  def index
    @list = List.new
    @lists = @current_user.lists
  end

  def show
    @list = List.find_by(id: params[:id])
    if @list.user_id != @current_user.id
      flash[:error] = ["List not found"]
      redirect_to root_path
    end
  end

  def todo
    @lists = @current_user.show_incomplete
    render :todo
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
      flash[:error] = ["You don't have permission to edit that!"]
      redirect_to @list
    end
  end

  def update
    @list.update(list_params)
    flash[:notice] = ["#{@list.name} updated!"]
    redirect_to @list
  end

  def destroy
    if @list.user_id === current_user.id
      @list.destroy
      redirect_to root_path
    else
      flash[:error] = ["You don't have permission to delete that!"]
    end
  end

  private
    def list_params # strong params
      params.require(:list).permit(:name, :user, tasks_attributes: [:description, :user_id])
    end

    def set_list
      @list = List.find_by(id: params[:id])
    end
end

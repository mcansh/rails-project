class ListsController < ApplicationController
  before_action :set_list
  def index
    @list = List.new
    @lists = List.all
  end

  def show
    @list = List.find_by(id: params[:id])
    if !can_current_user?(:view, @list)
      redirect_to root_path, notice: "You can't view that!"
    end
    @task = Task.new
  end

  def create
    @list = List.new(list_params)
    if @list.save
      redirect_to @list
    else
      @lists = List.all
      render :index
    end
  end

  def edit
    if !can_current_user?(:edit, @list)
      redirect_to @list, notice: "You can't edit that!"
    end
  end

  def update
    @list.update(list_params)
    redirect_to @list, notice: "#{@list.name} updated!"
  end

  def destroy
    @list.destroy
    redirect_to root_path
  end

  private
    def list_params # strong params
      params.require(:list).permit(:name)
    end

    def set_list
      @list = List.find_by(id: params[:id])
    end
end

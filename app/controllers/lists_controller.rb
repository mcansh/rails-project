class ListsController < ApplicationController
  def index
    @list = List.new
    @lists = List.all
  end

  def show
    @list = List.find_by(id: params[:id])
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

  def destroy
    @list = List.find_by(id: params[:id])
    @list.destroy
    redirect_to root_path
  end

  private
    def list_params # strong params
      params.require(:list).permit(:name)
    end
end

class ListsController < ApplicationController
  before_action :set_list
  def index
    @list = List.new
    @lists = @current_user.lists
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @lists }
    end
  end

  def show
    @list = List.find_by(id: params[:id])
    if @list.user_id === @current_user.id
      @task = Task.new
      respond_to do |format|
        format.html { render :show }
        format.json { render json: @list }
      end
    else
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
      flash[:error] = ["You can't edit that!"]
      redirect_to @list
    end
  end

  def update
    @list.update(list_params)
    flash[:notice] = ['List updated!']
  end

  # def destroy
  #   if @list.user_id == current_user.id
  #     @list.destroy
  #     flash[:notice] = ['List Deleted!']
  #     redirect_to root_path
  #   else
  #     flash[:error] = ["You don't have permission to delete that!"]
  #   end
  # end

  private
    def list_params # strong params
      params.require(:list).permit(:name, :user)
    end

    def set_list
      @list = List.find_by(id: params[:id])
    end
end

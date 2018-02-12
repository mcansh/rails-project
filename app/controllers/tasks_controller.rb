class TasksController < ApplicationController
  before_action :set_list
  before_action :set_task, only: [:update, :destroy]

  def create
    @task = @list.tasks.build(task_params)
    @task.user_id = current_user.id

    if @task.save
      redirect_to @list
    else
      flash[:error] = @task.errors.full_messages
      render "lists/show"
    end
  end

  def show
    @task = Task.find_by(id: params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @task }
    end
  end

  def update
    @task.update(task_params)
  end

  def destroy
    @task.destroy
  end

  private
    def task_params
      params.require(:task).permit(:description, :status, :user_id)
    end

    def set_list
      @list = List.find_by(id: params[:list_id])
    end

    def set_task
      @task = Task.find_by(id: params[:id])
    end
end

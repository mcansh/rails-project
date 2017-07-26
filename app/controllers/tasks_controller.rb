class TasksController < ApplicationController
  before_action :set_list
  before_action :set_task, only: [:update, :destroy]
  def create
    @task = @list.tasks.build(task_params)
    if @task.save
      redirect_to @list
    else
      render "lists/show"
    end
  end

  def update
    @task.update(task_params)
    redirect_to @task.list
  end

  def destroy
    @task.destroy
    redirect_to @list
  end

  private
    def task_params
      params.require(:task).permit(:description, :status)
    end

    def set_list
      @list = List.find_by(id: params[:list_id])
    end

    def set_task
      @task = @list.tasks.find(params[:id])
    end
end

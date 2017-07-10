class TasksController < ApplicationController
  def create
    @list = List.find(params[:list_id])
    @task = @list.tasks.build(task_params)
    if @task.save
      redirect_to @list
    else
      render "lists/show"
    end
  end

  def update
    @list = List.find_by(id: params[:list_id])
    @task = @list.tasks.find(params[:id])
    @task.update(task_params)
    redirect_to @task.list
  end

  def destroy
    @list = List.find_by(id: params[:list_id])
    @task = @list.tasks.find(params[:id])
    @task.destroy
    redirect_to @list
  end

  private
    def task_params
      params.require(:task).permit(:description, :status)
    end
end

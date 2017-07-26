class AddUsersToTask < ActiveRecord::Migration[5.1]
  def change
    add_column :tasks, :users, :text
  end
end

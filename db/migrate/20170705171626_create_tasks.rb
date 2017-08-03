class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :description
      t.integer :list_id
      t.timestamps
      t.boolean :status, default: false
      t.integer :user_id
    end
  end
end

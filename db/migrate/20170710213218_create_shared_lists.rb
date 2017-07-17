class CreateSharedLists < ActiveRecord::Migration[5.1]
  def change
    create_table :shared_lists do |t|
      t.integer :user_id
      t.integer :list_id
      t.integer :permission
    end
  end
end

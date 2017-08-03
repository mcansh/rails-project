class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.timestamps
      t.string :password_digest
      t.string :username
    end
  end
end

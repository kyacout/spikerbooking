class AddCurrentTypeToUsersTable < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :current_type, :integer
    add_index :users, :current_type
  end
end

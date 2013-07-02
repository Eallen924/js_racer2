class Players < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :player_name
    end

  add_index :players, :player_name, :unique => true, :name => :player_name_index
  end
end

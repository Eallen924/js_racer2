class Games < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :winner_id
      t.float :game_duration
    end
  end
end

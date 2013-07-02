class Racers < ActiveRecord::Migration
  def change
    create_table :racers do |t|
      t.integer :player_id
      t.integer :game_id
    end
  end
end

class Game < ActiveRecord::Base
  validates :winner_id, :presence => true
  has_many :racers
  has_many :players, :through => :racers
  has_one :winner, :class_name => 'Player'
end



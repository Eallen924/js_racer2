class Player < ActiveRecord::Base
  validates :player_name, :uniqueness => true
  has_many :racers
  has_many :games, :through => :racers
end

get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/enter_race' do
  @player1 = Player.find_or_create_by_player_name(params[:player_one])
  @player2 = Player.find_or_create_by_player_name(params[:player_two])

  if @player1.errors.any? || @player2.errors.any?
    erb :index
  else
    erb :race
  end
end

post '/game_over' do 
  @game = Game.create( { :player_ids => params[:player_ids],
                      :winner_id => params[:winner_id]
                      } ) 
  200
end

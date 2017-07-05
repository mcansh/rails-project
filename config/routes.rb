Rails.application.routes.draw do
  resources :lists
  root 'lists#index'
  get '/about' => 'site#about'
  # root 'sessions#new'
  # get '/signup' => 'users#new'
  # post '/signup' => 'users#create'
  # get '/signin' => 'sessions#new'
  # post '/signin' => 'sessions#create'
  # get '/signout' => 'sessions#destroy'
end

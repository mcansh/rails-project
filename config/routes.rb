Rails.application.routes.draw do
  root 'lists#index'
  get '/auth/:provider/callback' => 'sessions#create'
  get '/signup' => 'users#new'
  post '/users' => 'users#create'
  get '/signin' => 'sessions#new'
  post '/sessions' => 'sessions#create'
  get '/signout' => 'sessions#destroy'

  resources :users, only: [:new, :create]
  resources :sessions, only: [:new, :create]

  resources :lists do
    resources :tasks
  end
end

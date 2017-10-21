Rails.application.routes.draw do
  root 'lists#index'
  get '/auth/:provider/callback' => 'sessions#create'
  get '/signup' => 'users#new'
  get '/signin' => 'sessions#new'
  get '/signout' => 'sessions#destroy'

  get 'lists/todo' => 'lists#todo'

  resources :users, only: [:new, :create]
  resources :sessions, only: [:new, :create]

  resources :lists do
    resources :tasks
  end
end

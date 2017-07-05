Rails.application.routes.draw do
  get 'tasks/create'

  resources :lists do
    resources :tasks
  end
  root 'lists#index'
  get '/about' => 'site#about'
  # get '/signup' => 'users#new'
  # post '/signup' => 'users#create'
  # get '/signin' => 'sessions#new'
  # post '/signin' => 'sessions#create'
  # get '/signout' => 'sessions#destroy'
end

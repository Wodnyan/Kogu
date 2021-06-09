Rails.application.routes.draw do
  resources :articles

  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'

  get 'users/:user_id/articles', to: 'users#articles'
  # get 'users/:user_id', to: ''
end

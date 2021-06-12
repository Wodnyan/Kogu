Rails.application.routes.draw do
  resources :articles

  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'

  get 'me', to: 'users#me'

  get 'users/:user_id/articles', to: 'articles#user_articles'
end

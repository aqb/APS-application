Rails.application.routes.draw do  
  resources :users, param: :id

  get "/user", to: "auth#me"
  post "/signin", to: "auth#login"
end

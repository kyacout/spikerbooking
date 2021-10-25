# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'user/has_profile', to: 'users#profile?'
    end
  end
  devise_for :users, controllers: { sessions: 'sessions', registrations: 'registrations' }
  root 'app#index'
end

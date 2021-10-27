# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'user/has_profile', to: 'users#profile?'
      resource 'venue_profile', only: [:create]
    end
  end
  devise_for :users, controllers: { sessions: 'sessions', registrations: 'registrations' }
  root 'app#index'
  get '*path', to: 'app#index'
end

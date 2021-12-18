# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'user/has_profile', to: 'users#profile?'
      resources 'venue_profiles'
      resources 'artist_profiles'
    end
  end
  devise_for :users, controllers: { sessions: 'sessions', registrations: 'registrations' }
  post 'rails/active_storage/direct_uploads', to: 'direct_uploads#create'
  root 'app#index'
  get '*path', to: 'app#index'
end

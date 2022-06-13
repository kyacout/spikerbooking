# frozen_string_literal: true

class AddTwitterUrlToAertistProfiles < ActiveRecord::Migration[6.1]
  def change
    add_column :artist_profiles, :twitter_url, :text
  end
end

# frozen_string_literal: true

class AddColumnsToArtistProfiles < ActiveRecord::Migration[6.1]
  def change
    add_column :artist_profiles, :apple_music_url, :text
    add_column :artist_profiles, :tidal_url, :text
  end
end

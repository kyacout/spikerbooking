# frozen_string_literal: true

class CreateArtistProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :artist_profiles do |t|
      t.text :first_name
      t.text :last_name
      t.text :phone
      t.text :minimum_budget
      t.text :artist_name
      t.text :location
      t.text :zip_code
      t.text :genre, array: true, default: []
      t.text :unique_statement
      t.text :biography
      t.text :other_venue_plays, array: true, default: []
      t.text :website_url
      t.text :facebook_url
      t.text :instagram_url
      t.text :spotify_url
      t.text :soundcloud_url
      t.text :tiktok_url
      t.text :youtube_url
      t.references :user, index: true, foreign_key: true
      t.timestamps
      t.boolean :completed, default: false
    end
  end
end

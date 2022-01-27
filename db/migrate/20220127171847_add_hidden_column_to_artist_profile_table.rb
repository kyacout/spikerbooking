# frozen_string_literal: true

class AddHiddenColumnToArtistProfileTable < ActiveRecord::Migration[6.1]
  def change
    add_column :artist_profiles, :hidden, :boolean
    add_index :artist_profiles, :hidden
  end
end

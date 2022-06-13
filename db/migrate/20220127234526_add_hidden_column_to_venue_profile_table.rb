# frozen_string_literal: true

class AddHiddenColumnToVenueProfileTable < ActiveRecord::Migration[6.1]
  def change
    add_column :venue_profiles, :hidden, :boolean
    add_index :venue_profiles, :hidden
  end
end

# frozen_string_literal: true

class AddZipCodeToVenueProfileTable < ActiveRecord::Migration[6.1]
  def change
    add_column :venue_profiles, :zip_code, :text
  end
end

# frozen_string_literal: true

class RenameTypeToVenueType < ActiveRecord::Migration[6.1]
  def change
    rename_column :venue_profiles, :type, :venue_type
  end
end

# frozen_string_literal: true

class AddHiddenDataToVenueProfiles < ActiveRecord::Migration[6.1]
  def up
    VenueProfile.update_all(hidden: false)
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end

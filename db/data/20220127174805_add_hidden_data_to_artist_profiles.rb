# frozen_string_literal: true

class AddHiddenDataToArtistProfiles < ActiveRecord::Migration[6.1]
  def up
    ArtistProfile.update_all(hidden: false)
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end

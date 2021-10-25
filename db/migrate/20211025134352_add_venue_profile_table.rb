class AddVenueProfileTable < ActiveRecord::Migration[6.1]
  def change
    create_table :venue_profiles do |t|
      t.text :name
      t.text :location
      t.text :type
      t.text :website
      t.text :capacity
      t.text :sound_equipment
      t.text :host_music_frequency
      t.text :description
      t.timestamps
      t.references :user, index: true, foreign_key: true
    end
  end
end

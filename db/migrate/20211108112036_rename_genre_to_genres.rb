class RenameGenreToGenres < ActiveRecord::Migration[6.1]
  def change
    rename_column :artist_profiles, :genre, :genres
  end
end

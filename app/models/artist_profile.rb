# frozen_string_literal: true

class ArtistProfile < ApplicationRecord
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  belongs_to :user
  has_one_attached :profile_photo
  has_many_attached :photos
  has_one_attached :logo
  has_one_attached :press_sheet
  validates_presence_of :user

  settings do
    mapping dynamic: false do
      indexes :location, type: :text, analyzer: 'keyword'
      indexes :zip_code, analyzer: 'keywords'
      indexes :name, analyzer: 'keywords'
      indexes :artist_name, analyzer: 'keywords'
      indexes :genres, analyzer: 'keywords'
      indexes :biography, analyzer: 'english'
      indexes :unique_statement, analyzer: 'english'
    end
  end

  def self.search(query)
    __elasticsearch__.search(
      {
        query: {
          bool: {
            must: [
              {
                multi_match: {
                  query: query,
                  fields: %i[location zip_code name artist_name genres biography unique_statement]
                }
              }
            ]
          }
        }
      }
    )
  end
end

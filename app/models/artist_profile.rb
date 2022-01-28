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
      indexes :location, type: :text
      indexes :zip_code, type: :keyword
      indexes :name, type: :text
      indexes :artist_name, type: :text
      indexes :genres, type: :text
      indexes :biography, type: :text, analyzer: 'english'
      indexes :unique_statement, type: :text, analyzer: 'english'
    end
  end

  # TODO: filter hidden artists from elasticsearch results
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

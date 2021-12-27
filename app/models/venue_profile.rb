# frozen_string_literal: true

class VenueProfile < ApplicationRecord
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  belongs_to :user
  validates_presence_of :name, :location, :user
  has_one_attached :photo

  settings do
    mapping dynamic: false do
      indexes :name, analyzer: 'keywords'
      indexes :location, type: :text, analyzer: 'keyword'
      indexes :venue_type, analyzer: 'keywords'
      indexes :zip_code, analyzer: 'keywords'
      indexes :description, analyzer: 'english'
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
                  fields: %i[name location venue_type zip_code description]
                }
              }
            ]
          }
        }
      }
    )
  end
end

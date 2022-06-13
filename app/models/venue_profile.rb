# frozen_string_literal: true

class VenueProfile < ApplicationRecord
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  belongs_to :user
  validates_presence_of :name, :location, :user
  has_one_attached :photo

  settings do
    mapping dynamic: false do
      indexes :name, type: :text
      indexes :location, type: :text
      indexes :venue_type, type: :keyword
      indexes :zip_code, type: :keyword
      indexes :description, type: :text, analyzer: 'english'
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

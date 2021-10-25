# frozen_string_literal: true

class VenueProfile < ApplicationRecord
  belongs_to :user
  validates_presence_of :user
end
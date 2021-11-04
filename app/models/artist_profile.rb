# frozen_string_literal: true

class ArtistProfile < ApplicationRecord
  belongs_to :user
  has_one_attached :profile_photo
  has_many_attached :photos
  has_one_attached :logo
  has_one_attached :press_sheet
  validates_presence_of :user
end

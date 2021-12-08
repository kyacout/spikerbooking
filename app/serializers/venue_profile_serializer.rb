# frozen_string_literal: true

class VenueProfileSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :photo, :location, :type, :website, :capacity, :sound_equipment, :host_music_frequency,
             :description, :zip_code

  def photo
    return unless object.photo.attached?

    Cloudinary::Utils.cloudinary_url(
      "#{Rails.application.credentials.dig(:cloudinary, :folder)}/#{object.photo.key}"
    )
  end
end

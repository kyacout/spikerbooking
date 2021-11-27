# frozen_string_literal: true

class VenueProfileSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :name, :photo

  def photo
    return unless object.profile_photo.attached?

    Cloudinary::Utils.cloudinary_url(
      "#{Rails.application.credentials.dig(:cloudinary, :folder)}/#{object.profile_photo.key}"
    )
  end
end

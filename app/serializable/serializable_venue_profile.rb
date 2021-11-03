# frozen_string_literal: true

class SerializableVenueProfile < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :name, :photo

  def photo
    return unless object.photo.attached?

    object.photo.blob.attributes
          .slice('filename', 'byte_size')
          .merge(url: photo_url)
          .tap { |attrs| attrs['name'] = attrs.delete('filename') }
  end

  def photo_url
    url_for(object.photo)
  end
end

# frozen_string_literal: true

class ArtistProfileSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :first_name, :last_name, :phone, :minimum_budget, :artist_name, :location, :zip_code,
             :genres, :unique_statement, :biography, :other_venue_plays, :website_url, :facebook_url, :instagram_url,
             :spotify_url, :soundcloud_url, :tiktok_url, :youtube_url, :profile_photo, :photos, :hidden, :twitter_url,
             :apple_music_url, :tidal_url

  def profile_photo
    return unless object.profile_photo.attached?

    Cloudinary::Utils.cloudinary_url(
      "#{Rails.application.credentials.dig(:cloudinary, :folder)}/#{object.profile_photo.key}"
    )
  end

  def photos
    return unless object.photos.count.positive?

    object.photos.map do |p|
      Cloudinary::Utils.cloudinary_url(
        "#{Rails.application.credentials.dig(:cloudinary, :folder)}/#{p.key}"
      )
    end
  end
end

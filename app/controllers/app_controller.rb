# frozen_string_literal: true

class AppController < ApplicationController
  def index
    return unless current_user

    @user = current_user.slice(:id, :email, :current_type)
    if current_user.artist? && current_user.artist_profile && current_user.artist_profile.profile_photo.attached?
      @user[:profile_photo] =
        Cloudinary::Utils.cloudinary_url("#{Rails.application.credentials.dig(
          :cloudinary, :folder
        )}/#{current_user.artist_profile.profile_photo.key}")
    elsif current_user.venue? && current_user.venue_profile && current_user.venue_profile.photo.attached?
      @user[:profile_photo] =
        Cloudinary::Utils.cloudinary_url("#{Rails.application.credentials.dig(
          :cloudinary, :folder
        )}/#{current_user.venue_profile.photo.key}")
    end
  end
end

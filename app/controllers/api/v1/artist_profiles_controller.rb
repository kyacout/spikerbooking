# frozen_string_literal: true

module Api
  module V1
    class ArtistProfilesController < BaseApiController
      # POST /api/v1/artist_profiles or api/v1/artist_profiles.json
      def create
        if current_user.artist_profile.present?
          render json: {
            errors: [{ title: 'Create profile failed', detail: 'This user already has an artist profile' }], status: 401
          }
        else
          artist_profile = ArtistProfile.new(artist_profile_params)
          artist_profile.user = current_user
          artist_profile.save
          render json: artist_profile
        end
      end

      # GET /api/v1/artist_profiles or api/v1/artist_profiles.json
      def index
        artists = ArtistProfile.all
        render json: artists
      end

      private

      # Only allow a list of trusted parameters through.
      def artist_profile_params
        params.permit(:first_name, :last_name, :phone, :minimum_budget, :artist_name, :location, :zip_code,
                      :genres, :unique_statement, :biography, :other_venue_plays, :website_url, :facebook_url,
                      :instagram_url, :spotify_url, :soundcloud_url, :tiktok_url, :youtube_url, :profile_photo)
      end
    end
  end
end

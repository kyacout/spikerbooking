# frozen_string_literal: true

module Api
  module V1
    class ArtistProfilesController < BaseApiController
      before_action :user_authenticated?, except: %i[index search]

      # POST /api/v1/artist_profiles or api/v1/artist_profiles.json
      def create
        if current_user.artist_profile.present?
          render json: { errors: [{ title: 'Create profile failed', detail: 'This user already has a Venue profile' }],
                         status: 401 }
        else
          artist_profile = ArtistProfile.new(artist_profile_params)
          artist_profile.user = current_user
          artist_profile.save
          render json: artist_profile
        end
      end

      # PUT /api/v1/artist_profiles or api/v1/artist_profiles.json
      def update
        artist = ArtistProfile.find_by(id: params[:id])
        artist.update(artist_profile_params)
        render json: artist
      end

      # GET /api/v1/artist_profiles or api/v1/artist_profiles.json
      def index
        artists = ArtistProfile.where(hidden: false)
        render json: artists
      end

      # GET /api/v1/artist_profile/{id} or api/v1/artist_profile/{id}.json
      def show
        artist = ArtistProfile.find_by(id: params[:id])
        render json: artist
      end

      # GET /api/v1/artist_profiles/search or api/v1/artist_profiles/search.json
      def search
        query = params[:search_artists_query]
        if query == ''
          artists = ArtistProfile.where(hidden: false)
        else
          artists = ArtistProfile.search(query).records.to_a
          artists = artists.reject(&:hidden)
        end
        render json: artists
      end

      private

      # Only allow a list of trusted parameters through.
      def artist_profile_params
        params.permit(:first_name, :last_name, :phone, :minimum_budget, :artist_name, :location, :zip_code,
                      :unique_statement, :biography, :other_venue_plays, :website_url, :facebook_url, :instagram_url,
                      :spotify_url, :soundcloud_url, :tiktok_url, :youtube_url, :profile_photo, :hidden, genres: [])
      end
    end
  end
end

# frozen_string_literal: true

module Api
  module V1
    class VenueProfilesController < BaseApiController
      before_action :user_authenticated?, except: %i[index search]

      # POST /api/v1/venue_profiles or api/v1/venue_profiles.json
      def create
        if current_user.venue_profile.present?
          render json: { errors: [{ title: 'Create profile failed', detail: 'This user already has a Venue profile' }],
                         status: 401 }
        else
          venue_profile = VenueProfile.new(venue_profile_params)
          venue_profile.user = current_user
          venue_profile.save
          render json: venue_profile
        end
      end

      # GET /api/v1/venue_profiles/search or api/v1/venue_profiles/search.json
      def search
        query = params[:search_venues_query]
        venues = query == '' ? VenueProfile.all : VenueProfile.search(query).records.to_a
        if query == ''
          venues = VenueProfile.where(hidden: false)
        else
          venues = VenueProfile.search(query).records.to_a
          venues = venues.reject(&:hidden)
        end
        render json: venues
      end

      # PUT /api/v1/venue_profiles or api/v1/venue_profiles.json
      def update
        venue = VenueProfile.find_by(id: params[:id])
        venue.update(venue_profile_params)
        render json: venue
      end

      # GET /api/v1/venue_profiles or api/v1/venue_profiles.json
      def index
        venues = VenueProfile.where(hidden: false)
        render json: venues
      end

      # GET /api/v1/venue_profiles/{id} or api/v1/venue_profiles/{id}.json
      def show
        venue = VenueProfile.find_by(id: params[:id])
        render json: venue
      end

      private

      # Only allow a list of trusted parameters through.
      def venue_profile_params
        params.permit(:name, :location, :venue_type, :website, :capacity, :sound_equipment, :host_music_frequency,
                      :description, :photo, :hidden)
      end
    end
  end
end

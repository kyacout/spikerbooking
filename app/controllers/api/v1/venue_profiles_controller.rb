# frozen_string_literal: true

module Api
  module V1
    class VenueProfilesController < BaseApiController
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

      # GET /api/v1/venue_profiles or api/v1/venue_profiles.json
      def index
        venues = VenueProfile.all
        render json: venues
      end

      # GET /api/v1/venue_profiles/{id} or api/v1/venue_profiles/{id}.json
      def show
        venue = VenueProfile.find(params[:id])
        render json: venue
      end

      private

      # Only allow a list of trusted parameters through.
      def venue_profile_params
        params.permit(:name, :location, :venue_type, :website, :capacity, :sound_equipment, :music_host_frequency,
                      :description, :photo, :venue_profile)
      end
    end
  end
end

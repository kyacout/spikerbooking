# frozen_string_literal: true

module Api
  module V1
    class UsersController < BaseApiController
      before_action :user_authenticated?

      def profile?
        profile_exists =
          if current_user.artist?
            current_user.artist_profile.present?
          else
            current_user.venue_profile.present?
          end
        render json: { profile_exists: profile_exists }
      end
    end
  end
end

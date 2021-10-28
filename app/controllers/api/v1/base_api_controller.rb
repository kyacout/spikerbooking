# frozen_string_literal: true

module Api
  module V1
    class BaseApiController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :user_authenticated?
      include ErrorSerializer

      protected

      def user_authenticated?
        return if user_signed_in?

        render json: { errors: [{ title: 'Unauthenticated access', detail: 'Please login first.' }],
                       status: 403 }
      end
    end
  end
end

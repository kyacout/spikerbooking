# frozen_string_literal: true

class SessionsController < Devise::SessionsController
  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate(auth_options)

    if resource.present?
      sign_in(resource_name, resource)
      render json: resource
    else
      render json: { errors: [{ title: 'Login failed', detail: 'Please check your email and password.' }], status: 401 }
    end
  end
end

# frozen_string_literal: true

class PasswordsController < Devise::PasswordsController
  def create
    
    if !User.find_by(email: resource_params[:email])
      
      render json: {status: 401, user_found: false}

    else
      self.resource = resource_class.send_reset_password_instructions(resource_params)
      yield resource if block_given?

      if successfully_sent?(resource)
        respond_with({}, location: after_sending_reset_password_instructions_path_for(resource_name))
      else
        respond_with(resource)
      end
    end
  end

  def update
    self.resource = resource_class.reset_password_by_token(resource_params)
    yield resource if block_given?

    if resource.errors.empty?
      resource.unlock_access! if unlockable?(resource)
      if Devise.sign_in_after_reset_password
        flash_message = resource.active_for_authentication? ? :updated : :updated_not_active
        set_flash_message!(:notice, flash_message)
        resource.after_database_authentication
        sign_in(resource_name, resource)
      else
        set_flash_message!(:notice, :updated_not_active)
      end

      if resource.artist?
        artist_profile = ArtistProfile.find_by(user_id: resource.id)
        return render json: {profile_type: "artist_profile", id: artist_profile.id} if artist_profile
        return render json: {profile_type: "no_type"}
      elsif resource.venue?
        venue_profile = VenueProfile.find_by(user_id: resource.id)
        return render json: {profile_type: "venue_profile", id: venue_profile.id} if venue_profile
        return render json: {profile_type: "no_type"}
      end
    else
      set_minimum_password_length
      respond_with resource
    end
  end

end

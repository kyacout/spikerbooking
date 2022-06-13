# frozen_string_literal: true

class SpikerMailer < ApplicationMailer
  default from: 'notifications@example.com'

  def user_registered_email
    @user = params[:user]
    @user_profile_name = params[:user_profile_name]
    @profile_type = params[:profile_type]

    mail(to: 'info@spikerbooking.com',
         subject: 'New user has registered!')
  end
end

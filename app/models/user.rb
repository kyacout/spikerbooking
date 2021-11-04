# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable # :confirmable
  has_one :venue_profile
  enum current_type: %i[artist venue]
end

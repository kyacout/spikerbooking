# frozen_string_literal: true

class SerializableUser < JSONAPI::Serializable::Resource
  type 'users'

  attributes :email, :current_type
end

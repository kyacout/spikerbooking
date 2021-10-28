# frozen_string_literal: true

class SerializableUser < ActiveModel::Serializer
  attributes :email, :current_type
end

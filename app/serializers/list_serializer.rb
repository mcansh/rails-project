class ListSerializer < ActiveModel::Serializer
  attributes :name, :id, :tasks
end

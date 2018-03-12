class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :created_at, :list_id, :status
end

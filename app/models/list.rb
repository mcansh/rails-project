class List < ApplicationRecord
  validates :name, presence: true

  has_many :tasks

  accepts_nested_attributes_for :tasks
end

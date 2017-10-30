class List < ApplicationRecord
  validates :name, presence: true

  has_many :tasks, dependent: :destroy

  accepts_nested_attributes_for :tasks
end

class List < ApplicationRecord
  validates :name, presence: true

  has_many :tasks, :dependent => :destroy
  has_many :users, through: :lists

  accepts_nested_attributes_for :tasks
end

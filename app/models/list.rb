class List < ApplicationRecord
  validates :name, presence: true

  has_many :tasks, :dependent => :delete_all
  has_many :users, through: :lists, dependent: :destroy

  accepts_nested_attributes_for :tasks
end

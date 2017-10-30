class Task < ApplicationRecord
  belongs_to :list
  belongs_to :user
  validates :description, presence: true

  def complete?
    self.status == true
  end
end

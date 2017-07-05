class Task < ApplicationRecord
  belongs_to :list
  validates :description, presence: true

  def complete?
    self.status == true
  end
end

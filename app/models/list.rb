class List < ApplicationRecord
  validates :name, presence: true

  has_many :tasks, dependent: :destroy

  def tasks_attributes=(tasks_attributes)
    tasks_attributes.values.each do |task_attribute|
      self.tasks.build(task_attribute)
    end
  end
end

class List < ApplicationRecord
  validates :name, presence: true

  has_many :tasks
  has_many :shared_lists
  has_many :users, through: :shared_lists

  # accepts_nested_attributes_for :items

  def editable_by?(user)
    shared_list = self.shared_lists.find_by(user: user)
    if !shared_list
      return false
    else
      shared_list.editable?
    end
  end

  def viewable_by?(user)
    shared_list = self.shared_lists.find_by(user: user)
    if !shared_list
      return false
    else
      shared_list.viewable?
    end
  end
end

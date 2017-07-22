class List < ApplicationRecord
  validates :name, presence: true

  has_many :tasks
  has_many :shared_lists
  has_many :users, through: :shared_lists

  accepts_nested_attributes_for :tasks

  def self.permissions_for(*args)
    association = args[0]
    methods = args[1..-1]
    methods.each do |method_name|
      define_method "#{method_name}able_by?" do |user|
        assoc = self.send(association).find_by(user: user)
        if !assoc
          return false
        else
          assoc.send("#{method_name}able?")
        end
      end
    end
  end
  # dynamic definition
  permissions_for :shared_lists, :edit, :view, :destroy
end

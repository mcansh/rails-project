class User < ApplicationRecord
  has_secure_password
  validates :name, presence: true
  validates :username, presence: true
  validates :email, presence: true
  validates :password, presence: true
  validates :username, uniqueness: true
  validates :email, uniqueness: true

  def self.find_or_create_by_omniauth(auth_hash)
    oauth_user = auth_hash["info"]
    self.where(email: oauth_user["email"]).first_or_create do |user|
      user.email = oauth_user["email"] || SecureRandom.hex
      user.password = SecureRandom.hex
      user.username = oauth_user["nickname"]
      user.name = oauth_user["name"]
    end
  end

  has_many :lists
  has_many :tasks, :through => :lists

  def show_incomplete
    tasks = User.find_by(id: id).tasks
    tasks = tasks.where.not(status: true)
  end
end

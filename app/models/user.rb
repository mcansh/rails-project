class User < ApplicationRecord
  has_secure_password
  validates :name, presence: true
  validates :username, presence: true
  validates :email, presence: true
  validates :password, presence: true
  validates :username, uniqueness: true
  validates :email, uniqueness: true
end

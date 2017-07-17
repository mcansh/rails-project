class SharedList < ApplicationRecord
  belongs_to :user
  belongs_to :list

  PERMISSIONS = {
    owner: 0,
    editor: 10,
    viewer: 100
  }

  def viewable?
    self.permission <= PERMISSIONS[:viewer]
  end
  def editable?
    self.permission <= PERMISSIONS[:editor]
  end
  def destroyable?
    self.permission <= PERMISSIONS[:owner]
  end
end

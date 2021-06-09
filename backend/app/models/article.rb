class Article < ApplicationRecord
  validates_presence_of :title, :description, :text

  belongs_to :users, optional: true
end

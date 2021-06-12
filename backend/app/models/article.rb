class Article < ApplicationRecord
  validates_presence_of :title, :description, :text

  belongs_to :user, optional: true
end

class Article < ApplicationRecord
  per_page = 10

  validates_presence_of :title, :description, :text

  belongs_to :user, optional: true
end

class CreateArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :articles do |t|
      t.string :title
      t.string :description
      t.string :text

      t.timestamps
      # add_foreign_key :articles, :users
    end
  end
end

class ArticlesController < ApplicationController
  skip_before_action :authorize_request, only: %i[show index user_articles]
  before_action :set_article, only: %i[show update destroy]

  def index
    articles = Article.joins(:user).select(select)
    mapped_articles = []

    articles.each do |article|
      structured = structure_article(article)
      mapped_articles.push(structured)
    end

    json_response(mapped_articles)
  end

  # Get all articles of a user
  def user_articles
    articles = Article.where("user_id = #{params[:user_id]}").joins(:user).select(select)

    mapped_articles = []

    articles.each do |article|
      structured = structure_article(article)
      mapped_articles.push(structured)
    end

    json_response(mapped_articles)
  end

  def create
    article_info = { title: article_params[:title], description: article_params[:description],
                     text: article_params[:text], user_id: current_user[:id] }
    @article = Article.create!(article_info)
    json_response(@article, :created)
  end

  def show
    json_response(@article)
  end

  def destroy
    @article.destroy
    head :no_content
  end

  private

  def set_article
    @article = Article.find(params[:id])
  end

  def article_params
    params.permit(:title, :description, :text)
  end

  def structure_article(article)
    structuredArticle = {
      id: article[:id],
      title: article[:title],
      description: article[:description],
      text: article[:text],
      updatedAt: article[:updated_at],
      createdAt: article[:created_at],
      author: {
        id: article[:user_id],
        name: article[:name],
        email: article[:email]
      }
    }
  end

  def select
    %w[id title description text created_at updated_at name user_id email]
  end
end

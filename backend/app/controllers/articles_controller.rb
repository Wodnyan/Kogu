class ArticlesController < ApplicationController
  skip_before_action :authorize_request, only: %i[show index user_articles]
  before_action :set_article, only: %i[update destroy show]

  # TODO: PAGINATION, ORDERING

  def index
    articles = Article.joins(:user).order('articles.id DESC').select(select)
    mapped_articles = []

    articles.each do |article|
      structured = structure_article(article)
      mapped_articles.push(structured)
    end

    json_response(mapped_articles)
  end

  # Get all articles of a user
  def user_articles
    articles = Article.where('user_id = ?', params[:user_id]).joins(:user).select(select)

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
    createdArticle = Article.create!(article_info)
    @article = Article.where('articles.id = ?', createdArticle[:id]).joins(:user).select(select).first

    json_response(structure_article(@article), :created)
  end

  def show
    if !@article
      json_response({
                      message: 'Not found'
                    }, :not_found)
    else
      json_response(structure_article(@article))
    end
  end

  def destroy
    # Check if article belongs to user
    if @article && (current_user[:id] != @article[:user_id])
      raise(ExceptionHandler::AuthenticationError, Message.unauthorized)
    else
      @article.destroy if @article
      head :no_content
    end
  end

  private

  def set_article
    @article = Article.where('articles.id = ?', params[:id]).joins(:user).select(select).first
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
      updatedAt: article[:updatedAt],
      createdAt: article[:createdAt],
      author: {
        id: article[:user_id],
        name: article[:name],
        email: article[:email],
        createdAt: article[:userCreatedAt],
        updatedAt: article[:userUpdatedAt]
      }
    }
  end

  def select
    ['articles.id', 'title', 'description', 'text', 'articles.created_at as createdAt', 'articles.updated_at as updatedAt',
     'name', 'user_id', 'email', 'users.created_at as userCreatedAt', 'users.updated_at as userUpdatedAt']
  end
end

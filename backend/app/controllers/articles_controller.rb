class ArticlesController < ApplicationController
  skip_before_action :authorize_request, only: %i[create show index]
  before_action :set_article, only: %i[show update destroy]

  def index
    @article = Article.all
    json_response(@article)
  end

  def create
    article_info = {
      title: article_params[:title],
      description: article_params[:description],
      text: article_params[:text],
      user_id: current_user[:id]
    }
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
    params.permit(:title, :description, :text, :user_id)
  end
end

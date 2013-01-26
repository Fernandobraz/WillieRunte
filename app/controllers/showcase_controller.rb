class ShowcaseController < ApplicationController
  # skip_before_filter :require_login
  # skip_before_filter :session_expiry
  before_filter :find_book
  layout 'willie_runte'

  def index
    ### @photos = @book.photos

  end

  private
  def find_book
    @book = Book.find(params[:id]) if params[:id]
  end

end

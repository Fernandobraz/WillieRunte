module ApplicationHelper

  protected
  def open_books
    @open_books ||= Book.all
  end

end

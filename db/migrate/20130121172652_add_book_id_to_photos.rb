class AddBookIdToPhotos < ActiveRecord::Migration
  def change
    change_table :photos do |t|
      t.integer :book_id
    end
  end
end

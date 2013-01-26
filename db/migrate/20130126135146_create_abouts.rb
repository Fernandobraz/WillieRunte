class CreateAbouts < ActiveRecord::Migration
  def change
    create_table :abouts do |t|
      t.string :email
      t.string :mobile_number
      t.string :main_info

      t.timestamps
    end
  end
end

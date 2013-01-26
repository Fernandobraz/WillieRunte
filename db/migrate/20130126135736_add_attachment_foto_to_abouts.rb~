class AddAttachmentFotoToAbouts < ActiveRecord::Migration
  def self.up
    change_table :abouts do |t|
      t.attachment :foto
    end
  end

  def self.down
    drop_attached_file :abouts, :foto
  end
end

class Widget
  include Mongoid::Document
  embedded_in :layout
  embeds_many :frames
  
  types = %w(DEFAULT, NEWS, STOKS, BIRTHDAY)
  
  def self.createDefaultWidget(parentLayout)
    Widget.new
  end  
end
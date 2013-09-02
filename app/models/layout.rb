class Layout
  include Mongoid::Document
  
  @@types = %w(layout1 layout2 layout3)
  def self.types
    @@types
  end
  
  field :type, type: String
  field :name, type: String
  
  embedded_in :dashboard
  embeds_many :widgets
  
end
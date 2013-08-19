class Layout
  include Mongoid::Document
  
  embedded_in :dashboard
  embeds_one :templete
  embeds_many :widgets
end
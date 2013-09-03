class Frame
  include Mongoid::Document
  embedded_in :widget
  
end  
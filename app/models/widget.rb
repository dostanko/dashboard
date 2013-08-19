class Widget
  include Mongoid::Document
  embedded_in :layout
end
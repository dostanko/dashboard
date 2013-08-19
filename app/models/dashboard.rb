class Dashboard
  include Mongoid::Document
 
  field :name,    type: String
  
  has_and_belongs_to_many :users
  embeds_many :layouts

end
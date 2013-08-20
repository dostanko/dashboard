class Dash
  include Mongoid::Document
 
  field :name, type: String
  
  has_and_belongs_to_many :users
  embeds_many :layouts

  validates_uniqueness_of :name
  validates_format_of :name, with: /\A\w+\Z/

end

class User
 include MongoMapper::Document

 key :email,     String

 validates_presence_of :email
end
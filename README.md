**[mongoDB,nodeJS,express]**:: Using geospatial indices to locate potential matches of a particular user

**Apis:**

POST: /users/ 
request body:
{ "latitude": 28.6832093, "longitude": 77.3164626 }
GET: /users/filter?latitude=28.6832092&longitude=78.3164628&radius=500&genderPreference=male

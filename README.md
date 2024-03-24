**[mongoDB,nodeJS,express]**:: Using geospatial indices to locate potential matches of a particular user

**Apis:**

**POST: /users**

curl --location --request POST 'localhost/users/'

**GET: /users/filter**

curl --location --request GET 'localhost/users/filter?latitude=28.624867217936135&longitude=77.25960805366923&radius=5&genderPreference=male' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Piyush Mathpal",
    "gender": "male",
    "age": 30,
    "latitude": 28.7832092,
    "longitude": 77.2164628,
    "preferences": {
        "minAge": 25,
        "maxAge": 35,
        "gender": ["female","male"]
    }
}'

![image](https://github.com/pcm708/tinder_backend/assets/52307892/abb6dc99-ea62-4389-b53e-04520b993c47)




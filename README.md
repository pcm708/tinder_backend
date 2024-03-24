**[mongoDB,nodeJS,express]**:: Using geospatial indices to locate potential matches of a particular user

**High level Design:**

![image](https://github.com/pcm708/tinder_backend/assets/52307892/abb6dc99-ea62-4389-b53e-04520b993c47)

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

**Nginx commands**

By default nginx runs on 8080
- sudo nginx: to start nginx
- sudo nginx -s reload: to reload the configs
- sudo nginx -s stop: to stop nginx server 
- location of nginx.config: open /Users/piyush/homebrew/etc/nginx/nginx.config


  **nginx.config:**

  _to access logs_: tail -f /var/log/nginx/access.log
  
  events {
    # Define event parameters here
}

http {
    
    log_format custom_format '$remote_addr - $remote_user [$time_local] ' '"$request" $status $body_bytes_sent ' '"$http_referer" "$http_user_agent" ' 'upstream_addr: $upstream_addr';

    upstream backend {
	least_conn;
        server localhost:8080;
        server localhost:8081;
        server localhost:8082;
        # Add more servers if needed
    }

    server {
        listen 80;
        server_name localhost;
	access_log /var/log/nginx/access.log custom_format;

        location / {
            # Apply the request rate limit

            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}



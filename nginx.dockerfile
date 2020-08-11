FROM node:latest as node
LABEL author="Omar Jimenez"
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --prod

### Stage 2
FROM nginx:alpine
VOLUME /var/cache/nginx
#COPY ./dist/personal-site /usr/share/nginx/html
#COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/personal-site /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /etc




# Use the following commands to build the image and run the container (run from the root folder)
# 1. You'll first need to build the project using `ng build`

# 2. Now build the Docker image:
# docker build -t nginx-angular -f nginx.dockerfile .

#3. Run the Docker container:
# To run the container we'll create a volume to point to our local source code. On Mac
# you can use $(pwd) to reference your local folder where your running Docker commands from.
# If you're on Windows there are several options to point to the folder. See my following post:
# https://blog.codewithdan.com/2017/10/25/docker-volumes-and-print-working-directory-pwd/

# docker run -p 8080:80 -v $(pwd)/dist:/usr/share/nginx/html nginx-angular

#for PROD:

##### Stage 1
#FROM node:latest as node
#LABEL author="Dan Wahlin"
#WORKDIR /app
#COPY package.json package-lock.json ./
#RUN npm install
#COPY . .
#RUN npm run build -- --prod

##### Stage 2
#FROM nginx:alpine
#VOLUME /var/cache/nginx
#COPY --from=node /app/dist /usr/share/nginx/html
#COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# docker build -t nginx-angular -f nginx.prod.dockerfile .
# docker run -p 8080:80 nginx-angular
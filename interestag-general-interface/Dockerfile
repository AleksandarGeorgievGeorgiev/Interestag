FROM node

WORKDIR /usr/webapp

COPY ./build .

RUN apt-get update && apt-get install \
  -y --no-install-recommends

# Install dependencies:
RUN npm install -g serve

CMD serve -s

EXPOSE 5000
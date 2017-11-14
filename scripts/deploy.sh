#!/bin/sh

# Setup settings
SSH_PORT='22'
BRANCH='master'
CODE_SERVERS=("optionscafe@web3.cloudmanic.com")
DOCKER_SERVERS=("spicer@web3.cloudmanic.com")
DOCKER_IMAGE="options.cafe/nginx-php70"
REMOTE_DIR="/sites/optionscafe/options.cafe"

# Loop through the different servers deploy the code.
for server in "${CODE_SERVERS[@]}" 
do
  
  echo "## Deploying Code to $server ##"
  
  ssh -t -p $SSH_PORT $server "cd $REMOTE_DIR/www && git pull origin $branch"
                            
done

# Loop through the different servers and configure the code
for server in "${DOCKER_SERVERS[@]}" 
do
  
  echo "## Running Docker Commands on $server ##"
  
  ssh -t -p $SSH_PORT $server "cd $REMOTE_DIR/docker && docker-compose build"
  ssh -t -p $SSH_PORT $server "cd $REMOTE_DIR/docker && docker run --rm -it -v $REMOTE_DIR/www:/www --network=shared $DOCKER_IMAGE composer install"                               
  ssh -t -p $SSH_PORT $server "cd $REMOTE_DIR/docker && docker-compose down"
  ssh -t -p $SSH_PORT $server "cd $REMOTE_DIR/docker && docker-compose up -d"
                            
done

# Rebuilt site cache.
echo "## Rebuilding site cache ##"

curl -H "Content-Type: application/json" -X POST -d '{"token": "FMHpSGP52WcrKZOvAkx2","sitemap": "https://options.cafe/sitemap.xml"}' https://cache-warm.cloudmanic.com
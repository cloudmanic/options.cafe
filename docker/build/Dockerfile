FROM cloudmanic/nginx-php70

MAINTAINER Spicer Mathtews <spicer@cloudmanic.com>

ARG P_UID=0
ARG P_GID=0

# Gots to go Root to make some changes
USER root

# Reset Password and group files
RUN set -x \
      && echo "root:x:0:0:root:/root:/bin/ash" > /etc/passwd \
      && echo "root:::0:::::" > /etc/shadow \
      && echo "root:x:0:root" > /etc/group 
      
# Ensure www-data user exists (as our local user)
RUN set -x \ 
  && addgroup -g ${P_GID} -S www-data \
  && adduser -u ${P_UID} -D -S -G www-data www-data 
   
# Setup directory and Set perms for document root.
RUN set -x \
  && chmod 755 /start.sh \
  && chown -R www-data:www-data /www \
  && chown -R www-data:www-data /logs \
  && chown -R www-data:www-data /nginx-cache  

# Copy nginx config
COPY default.conf /etc/nginx/conf.d/default.conf

# This needs to be at the bottom. (back from root)
USER www-data

# Workint directory
WORKDIR /www   

# Start the server
CMD ["/start.sh"]
###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

# Creating app directory
WORKDIR /usr/src/app

# Copying application dependency manifests to the container image.
COPY --chown=node:node package*.json ./

# Installing app dependencies
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

# Use node user from the image (instead of root user)
USER node
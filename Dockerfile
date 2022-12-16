ARG NODE_VERSION=19.1.0-alpine3.16
ARG BASE_IMAGE=node:$NODE_VERSION
FROM $BASE_IMAGE AS BUILD

# Install node modules (keep as separate layer so it doesn't get executed if wasn't changed)
COPY package.json ./
RUN npm i && npm audit fix || true

# Copy source code
COPY . .

# Bundle app source
RUN npm run build


FROM $BASE_IMAGE

# Create app directories
RUN mkdir -p /usr/src/app/dist

# Change user
# USER node
WORKDIR /usr/src/app

# Copy dependency files
COPY --from=BUILD loadEnv.js package.json /usr/src/app/
COPY --from=BUILD /dist /usr/src/app/dist
COPY --from=BUILD /node_modules /usr/src/app/node_modules

# Start the service
CMD ["exec node -r ./loadEnv ./dist/index.js"]
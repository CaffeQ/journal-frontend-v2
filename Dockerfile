# Use the base image that suits your application
FROM --platform=$BUILDPLATFORM node:lts AS development

WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm ci
COPY . /code

# Expose the port your application runs on
EXPOSE 3000 

# Set environment variables for startup probe configuration
#ENV STARTUP_PROBE_PATH=/healthz
#ENV STARTUP_PROBE_PORT=3000  
#ENV STARTUP_PROBE_FAILURE_THRESHOLD=45
#ENV STARTUP_PROBE_PERIOD_SECONDS=30
#ENV STARTUP_PROBE_RETRIES=20

# Health check configuration using startup probe settings
#HEALTHCHECK --interval=30s --timeout=45s --retries=20 \
#  CMD curl -f http://localhost:3000/healthz || exit 1

ENV CI=true

CMD [ "npm", "start" ]

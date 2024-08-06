
# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:latest AS base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/install
COPY package.json /temp/install/
RUN cd /temp/install && bun install 

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/install/node_modules node_modules
COPY . .
# [optional] tests & build
# ENV NODE_ENV=production
# RUN bun test
RUN bun run build

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/install/node_modules node_modules
COPY dist ./dist
COPY --from=prerelease /usr/src/app/package.json .
COPY [.env] .
# run the app
USER bun
EXPOSE 3001/tcp
ENTRYPOINT [ "bun", "run", "./dist/main.js" ]
FROM node:18.14.2-alpine3.17

COPY . /opt/ex-Blablacar-clone
WORKDIR /opt/ex-Blablacar-clone
RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "start"]
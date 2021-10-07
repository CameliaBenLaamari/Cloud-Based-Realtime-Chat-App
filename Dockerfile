FROM node:14.17.6

RUN npm install -g serve

COPY package.json package.json

RUN npm install --no-package-lock

COPY . .

RUN npm run build

CMD serve -p $PORT -s build
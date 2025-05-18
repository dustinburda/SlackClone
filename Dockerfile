FROM node:18-alpine

WORKDIR /app

COPY ./start.sh ./
COPY ./frontend ./frontend
COPY ./backend/ ./backend


RUN chmod +x ./start.sh
RUN cd ./backend \
    && rm -fr ./node_modules \
    && npm install

EXPOSE 3000

CMD ["sh", "start.sh"]
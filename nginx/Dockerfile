FROM nginx

# delete the defautl nginx web page
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.frontend.conf /etc/nginx/conf.d/

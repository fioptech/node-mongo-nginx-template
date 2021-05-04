# Message service

Prepare first only before start:

1. Replace "template" with your suitable name

2. Run `docker network create template-net` command

Steps to run this project in development:

3. Run `sh cmd.run.dev.sh` command

Steps to run this project in production:

4. Run `sh cmd.run.prod.sh` command

## Secure Nginx with Let's Encrypt on Ubuntu
Access to your server computer.
If you are running nginx container of Docker please stop it.
If your server is not installed nginx, please install it and public ports, then restart nginx as below commands:
```
$ sudo apt update
$ sudo apt install nginx
$ sudo ufw allow 'Nginx HTTP'
$ sudo ufw allow 80/tcp
$ sudo ufw allow 443/tcp
$ sudo systemctl restart nginx
```
Installing Certbot
```
$ sudo add-apt-repository ppa:certbot/certbot
$ sudo apt install python-certbot-nginx
```
Obtaining an SSL Certificate
```
$ sudo certbot --nginx -d registry.hanhchinhcong.cf --duplicate
```
Then copy Obtained Certificate to file cert.pem and key.pem in nginx confiuration(template-gateway)

Final, Setup nginx template conf to use ssl

Renew certificate (because Certificate of Letscript is expired after 90 days. Normaly Letscript auto generate a new cert and key after 90 days, so don't wory)
```
$ sudo certbot renew --dry-run
```

### Kill Port
```
sudo kill -9 `sudo lsof -t -i:9001`
```

### Run seperate service
```
docker-compose -f docker-compose.yml -f docker-compose.local.yml up service_name
```

### Run without gateway
```
docker-compose -f docker-compose.yml -f docker-compose.local.yml up template-nodejs template-mongo
```

### Run image bash
```
docker run -it image_id bash
```
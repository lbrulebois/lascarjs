FROM php:apache
# On active les modules nécessaires pour l'application ...
RUN apt-get update && apt-get install -y apt-utils \ 
    && a2enmod rewrite
# On met en place le paramétrage spécifique pour
# faire fonctionner l'application ...
RUN echo 'date.timezone = Europe/Paris' >> /usr/local/etc/php/conf.d/default.ini && \ 
    echo 'memory_limit = 512M' >> /usr/local/etc/php/conf.d/default.ini && \ 
    echo 'upload_max_filesize = 15Mo' >> /usr/local/etc/php/conf.d/default.ini && \ 
    echo 'max_execution_time  = 240s' >> /usr/local/etc/php/conf.d/default.ini
# Puis on redémarre Apache ...
RUN service apache2 restart
# -----
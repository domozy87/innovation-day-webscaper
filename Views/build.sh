#!/bin/bash

############################
### Variable you can use ###
############################

# ${PROJECT_NAME}     -> Value set to the same as your project directory name
# ${PROJECT_USER}     -> Value set to "innovation"
# ${PROJECT_PATH}     -> Value set to "/home/innovation/public_html/projects/YOUR_PROJECT_NAME"
# ${MYSQL_HOST}       -> Value set to "10.10.10.22"
# ${PROJECT_DB_USER}  -> Value set to the same as your project name
# ${PROJECT_DB_PASS}  -> Value set to the same as your project name
# ${FLOW_CONTEXT}     -> Value set to "Production" in Joel and "Development" in your local vagrant box
# ${SITE_PACKAGE_KEY} -> Value set to "WE.SitePackage"
# ${PHP_PATH}         -> Value set to "/opt/php-versions/php55/bin/php"
#
#######################################################################
exit 0
# Copy Configuration file
cp /home/${PROJECT_USER}/public_html/templates/Settings.yaml ${PROJECT_PATH}/Configuration/${FLOW_CONTEXT}/

echo ${PROJECT_DB_USER} | sed -i -e "s/PROJECT_DB_USER/${PROJECT_DB_USER}/g" ${PROJECT_PATH}/Configuration/${FLOW_CONTEXT}/Settings.yaml
echo ${PROJECT_DB_PASS} | sed -i -e "s/PROJECT_DB_PASS/${PROJECT_DB_PASS}/g" ${PROJECT_PATH}/Configuration/${FLOW_CONTEXT}/Settings.yaml
echo ${MYSQL_HOST} | sed -i -e "s/MYSQL_HOST/${MYSQL_HOST}/g" ${PROJECT_PATH}/Configuration/${FLOW_CONTEXT}/Settings.yaml

chown ${PROJECT_USER}:${PROJECT_USER} ${PROJECT_PATH}/Configuration/${FLOW_CONTEXT}/Settings.yaml

echo "Execute FLOW commands for initializing project"
cd ${PROJECT_PATH} && FLOW_CONTEXT=${FLOW_CONTEXT} ${PHP_PATH} ./flow flow:cache:flush --force
cd ${PROJECT_PATH} && FLOW_CONTEXT=${FLOW_CONTEXT} ${PHP_PATH} ./flow doctrine:migrate
cd ${PROJECT_PATH} && FLOW_CONTEXT=${FLOW_CONTEXT} ${PHP_PATH} ./flow cache:warmup

echo "Execute grunt"
cd ${PROJECT_PATH} && npm install
cd ${PROJECT_PATH} && bower install
cd ${PROJECT_PATH} && grunt build

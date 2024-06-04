#!/bin/dash
# nginx setup and run script
#

# input files
CONFIG_TEMPLATE=${NGINX_CONFIG_TEMPLATE:-/opt/frontend/nginx.template.conf}
#SERVER_ENV_FILE=${SERVER_ENV_FILE:-/opt/frontend/.env}
SERVER_ENV=${SERVER_ENV_FILE:-/tmp/env.fifo}

# output files
NGINX_CONFIG=${NGINX_CONFIG_FILE:-/etc/nginx/conf.d/default.conf}
ENV_JS=${ENV_JS_FILE:=/usr/share/nginx/html/config.js}

################
# DEFAULT VALUES

export NGINX_PORT=${NGINX_PORT:-80}

export NGINX_MAX_FILES_UPLOAD=${NGINX_MAX_FILES_UPLOAD:-256m}
#'

############################################
# list all ENV from system if no file proven
[ ! -f "${SERVER_ENV_FILE}" ] && set | grep '^VITE_APP' > "${SERVER_ENV}"

#############################
# Recreate NGINX config file

nginx_envs=$(set | awk -F= '/^NGINX_/ { print $1}')


for varName in ${nginx_envs}
do
  nginx_vars="\$${varName} ${nginx_vars}";
  printf "NGINX ENVS: ${varName}=%s\\n" "$(eval echo '$'{$varName})"
done

if [ -f "${CONFIG_TEMPLATE}" ]
then
  envsubst "${nginx_vars}" < "$CONFIG_TEMPLATE" > "$NGINX_CONFIG"
fi

###########################
# Recreate ENV config file

[ -f "${SERVER_ENV}" ] || echo "WARNING! No ENV file found (${SERVER_ENV})"

rm -rf "${ENV_JS}"
touch "${ENV_JS}"

# Add assignment
echo "window.SERVER_ENV = {" >> "${ENV_JS}"

# Read each line in .env file
# Each line represents key=value pairs
while IFS= read -r line
do

  # Split env variables by character `=` and skip comments
  if printf '%s\n' "$line" | grep -v -e '^#' | grep -q -e '='; then
    varName=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varValue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  [ -z "$varName" ] && continue

  # Read envValue of current variable if exists as Environment variable
  envValue=$(printf '%s\n' "$(eval echo '$'{$varName})")

#  echo varName=\"$varName\"
#  echo varValue=\"$varValue\"
#  echo envValue=\"$envValue\"

  # Otherwise use value from .env file
#  [[ -z $envValue ]] && envValue=${varValue}

  # Append non empty configuration property to JS file
  if [ -n "$envValue" ]
  then
    echo "OVERRIDDEN ENV: $varName='$envValue'"
    echo "  ${varName}: '${envValue}'," >> "${ENV_JS}"
  fi

done < "${SERVER_ENV}"

echo "}" >> "${ENV_JS}"

#cat ${ENV_JS}

############
# Run nginx

echo Starting nginx...
nginx -g 'daemon off;'

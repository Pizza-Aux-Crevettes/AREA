ARGS=$1

if [ $ARGS == "FrontApp" ]; then
    docker-compose up backend frontend-web
elif [ $ARGS == "FrontWeb" ]; then
    docker-compose up backend frontend-app
fi
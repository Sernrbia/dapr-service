set -o allexport; source .env; set +o allexport

dapr run --app-id DaprService --app-port $APP_SERVICE_HTTP_PORT --dapr-http-port $APP_DAPR_HTTP_PORT --dapr-grpc-port $APP_DAPR_GRPC_PORT npm run dev

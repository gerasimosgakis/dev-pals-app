export default {
  s3: {
    REGION: "us-east-2",
    BUCKET: "devpals-uploads"
  },
  apiGateway: {
    REGION: "us-east-2",
    // URL: "https://jy0m3zwhid.execute-api.us-east-2.amazonaws.com/prod"
    URL: "https://ae97r6nr05.execute-api.us-east-2.amazonaws.com/prod"
    // URL: "http://localhost:3000"
  },
  cognito: {
    // REGION: "us-east-2",
    // USER_POOL_ID: "us-east-2_JlrTegOzT",
    // APP_CLIENT_ID: "78q83b3rjhkfe8t9m74ibrsnq2",
    // IDENTITY_POOL_ID: "us-east-2:cad5f440-1dc2-41b9-aa6c-b092df44633f"
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_57HsQAjOY",
    APP_CLIENT_ID: "6arcftm8654se3quvk97dl5kt9",
    IDENTITY_POOL_ID: "us-east-2:4fcd52fd-205f-4b79-a58a-3e524ffaba26"
  }
};

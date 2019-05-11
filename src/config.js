// export default {
//   apiGateway: {
//     REGION: "us-east-1",
//     // URL: "https://1fhqicbc50.execute-api.us-east-1.amazonaws.com/prod"
//     URL: "https://j1saro5t70.execute-api.us-east-1.amazonaws.com/prod"
//     // URL: "http://localhost:3000"
//   },
//   cognito: {
//     REGION: "us-east-1",
//     USER_POOL_ID: "us-east-1_pd1tzSkLJ",
//     APP_CLIENT_ID: "16ov1ajg64q39nnkmjl044ufek",
//     IDENTITY_POOL_ID: "us-east-1:478e46f1-2fd1-4f00-87bd-685307261c25"
//   }
// };

export default {
  s3: {
    REGION: "us-east-1",
    BUCKET: "may-devpals-uploads"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://j1saro5t70.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_QsQ9bNee8",
    APP_CLIENT_ID: "3pl21u12575tsa8oaqjfsu69fi",
    IDENTITY_POOL_ID: "us-east-1:2cf76d33-d471-460d-8468-ec9fc00aaacf"
  }
};

import { CognitoUserPool } from "amazon-cognito-identity-js"

const poolData = {
    //can be access dun sa aws
    UserPoolId: "ap-southeast-1_pTleWL36d",
    ClientId: "2m8o327joob9ptovinbmdpj4o4"
}

export default new CognitoUserPool(poolData);
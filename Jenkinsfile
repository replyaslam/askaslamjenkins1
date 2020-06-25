#!groovy
import groovy.json.JsonSlurperClassic
node {

def BUILD_NUMBER=env.BUILD_NUMBER
def RUN_ARTIFACT_DIR="tests/${BUILD_NUMBER}"
def SFDC_USERNAME

def HUB_ORG=env.HUB_ORG_DH
def SFDC_HOST = env.SFDC_HOST_DH
def JWT_KEY_CRED_ID = env.JWT_CRED_ID_DH
def CONNECTED_APP_CONSUMER_KEY=env.CONNECTED_APP_CONSUMER_KEY_DH

println 'KEY IS' 
println JWT_KEY_CRED_ID
println HUB_ORG
println SFDC_HOST
println CONNECTED_APP_CONSUMER_KEY
def toolbelt = tool 'toolbelt'
def branchname

stage('checkout source') {
//echo 'Pulling...' + env.BRANCH_NAME
echo 'Pulling... ' + env.GIT_BRANCH
    // when running in multi-branch job, one must issue this command
echo '------------------------------'
echo scm.branches[0].name
    checkout scm
    echo scm.branches[0].name
    branchname=scm.branches[0].name
}


//JENKINS CREDENTIALS LAPTOP1 AND LAPTOP2-------------------------
JWT_KEY_CRED_ID='52e8269f-50fa-4054-a1b0-49448351c53f'  //this uses server.key from Laptop1
//JWT_KEY_CRED_ID='5c813bda-f7d3-4c35-9edf-26076d1673e4'  //this uses server.key from Laptop2

//org1 	
//SFDC_HOST='https://login.salesforce.com'
//HUB_ORG='replyamijenkins1@yahoo.com'
//CONNECTED_APP_CONSUMER_KEY='3MVG9xB_D1giir9ouqdpx6TLReZGNLSvnQPrlIUhn9d3LpPkwPmslUu8PjsPVAO6myXIqyttMQdpBi4ehe7yH'


//org2
//SFDC_HOST='https://login.salesforce.com'
//HUB_ORG='replyamijenkins2@yahoo.com'
//CONNECTED_APP_CONSUMER_KEY='3MVG9xB_D1giir9rQ28.ZSOZMNzgZfh656KIRFlQOEp9Beiq2xm8ue4dInQ0XlHUOfWnghEK1jcDtNTGyCG9y' //this uses server.crt from Laptop1
//CONNECTED_APP_CONSUMER_KEY='3MVG9xB_D1giir9rQ28.ZSOZMNwTMu9ioZWVzaHgYS4m9IgZSU_8f5K2KD0REdjYN3tQBs2EE6G3rxToF7ztY'  //this uses server.crt from Laptop2


//org3
//SFDC_HOST='https://login.salesforce.com'
//HUB_ORG='replyamijenkins3@yahoo.com' 
//CONNECTED_APP_CONSUMER_KEY='3MVG9sh10GGnD4Dt2J6frnovQpib7_3a4OqWLfDNeK_DeZUDBCc7t28hpBqObv38In8w2p3MKdD2xa9u8f7F0'  //this uses server.crt from Laptop1
//CONNECTED_APP_CONSUMER_KEY='3MVG9sh10GGnD4Dt2J6frnovQphUDU7pg3OZsQBvAgFCZgwkSqDkh4WOQ6mwGue9rTQeQ24554C9.tdjqiPKp'  //this uses server.crt from Laptop2
    
if(branchname.contains('develop')) { 
    //org1
    echo 'Develop branch here---------------------'
    SFDC_HOST='https://login.salesforce.com'
    HUB_ORG='replyamijenkins1@yahoo.com'
    CONNECTED_APP_CONSUMER_KEY='3MVG9xB_D1giir9ouqdpx6TLReZGNLSvnQPrlIUhn9d3LpPkwPmslUu8PjsPVAO6myXIqyttMQdpBi4ehe7yH'        
} 
else if(branchname.contains('UAT')) { 
    //org2
    echo 'UAT branch here---------------------'    
    SFDC_HOST='https://login.salesforce.com'
    HUB_ORG='replyamijenkins2@yahoo.com'
    CONNECTED_APP_CONSUMER_KEY='3MVG9xB_D1giir9rQ28.ZSOZMNzgZfh656KIRFlQOEp9Beiq2xm8ue4dInQ0XlHUOfWnghEK1jcDtNTGyCG9y' //this uses server.crt from Laptop1
} 
else if(branchname.toLowerCase().contains('sat')) { 
    //org3
    echo 'SAT branch here---------------------'    
    SFDC_HOST='https://login.salesforce.com'
    HUB_ORG='replyamijenkins3@yahoo.com' 
    CONNECTED_APP_CONSUMER_KEY='3MVG9sh10GGnD4Dt2J6frnovQpib7_3a4OqWLfDNeK_DeZUDBCc7t28hpBqObv38In8w2p3MKdD2xa9u8f7F0'  //this uses server.crt from Laptop1
} 

withCredentials([file(credentialsId: JWT_KEY_CRED_ID, variable: 'jwt_key_file')]) {
    stage('Deploye Code') {		
    println "${toolbelt}"
    println "${env.BRANCH_NAME}"
    
    //println "\"${toolbelt}\" force:auth:jwt:grant --clientid ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwtkeyfile \"${jwt_key_file}\" --setdefaultdevhubusername --instanceurl ${SFDC_HOST}"
    
    //Logout
    rc = bat returnStatus: true, script: "\"${toolbelt}\" force:auth:logout --targetusername ${HUB_ORG}  -p"
    
    //Login
    rc = bat returnStatus: true, script: "\"${toolbelt}\" force:auth:jwt:grant --clientid ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwtkeyfile \"${jwt_key_file}\" --setdefaultdevhubusername --instanceurl ${SFDC_HOST}"
    

    if (rc != 0) { 
        error 'hub org authorization failed' 
        }
    println rc
    
    //println "\"${toolbelt}\" force:source:deploy --sourcepath manifest/. -u ${HUB_ORG}"            
    //println "\"${toolbelt}\" force:source:deploy --manifest manifest/. -u ${HUB_ORG}"

    //Deploy using sfdx
    rmsg = bat returnStdout: true, script: "\"${toolbelt}\" force:source:deploy --manifest manifest/package.xml -u ${HUB_ORG}"
    //rmsg = bat returnStdout: true, script: "\"${toolbelt}\" force:mdapi:deploy -d manifest/. -u ${HUB_ORG}"           
    println('Hello Job DSL script job was successfull!------------------')

    }
}
}

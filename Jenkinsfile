node {
  stage: 'Environment Variables'
  sh "env"

  stage 'Checkout Repository'
  git url: 'https://github.com/stackroute/Penny-Chat-Bot.git', branch: "master"

  stage 'Installing Dependencies'
  	sh "cd server"
    sh "npm install"
    sh 'echo pwd'

  stage 'Testing'
  sh "npm test"

}
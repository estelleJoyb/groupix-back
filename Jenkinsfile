pipeline {

    agent any
    
    environment {
        SONARCLOUD_TOKEN = credentials('sonarcloud') 
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'jenkins', url: 'https://github.com/estelleJoyb/groupix-back.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Tests unitaires') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('SonarCloud Analysis') {
            steps {
                script {
                    sh '''
                        sonar-scanner \
                        -Dsonar.organization=groupix \
                        -Dsonar.projectKey=groupix_groupix \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=https://sonarcloud.io
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline terminé.'
            cleanWs()
        }
    }
}

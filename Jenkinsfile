pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'develop', url: 'https://gitlab.com/esgi666/groupix.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Lint') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        sh 'npm run lint'
                    }
                }
            }
        }

        stage('Tests unitaires') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        sh 'npm run test'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        sh 'npm run build'
                    }
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

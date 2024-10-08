pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'feat/jenkins', url: 'https://gitlab.com/esgi666/groupix.git'
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
    }

    post {
        always {
            echo 'Pipeline terminé.'
            cleanWs()
        }
    }
}

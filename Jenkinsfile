pipeline {
    agent any

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
    }

    post {
        always {
            echo 'Pipeline terminé.'
            cleanWs()
        }
    }
}

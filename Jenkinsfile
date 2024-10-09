pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'develop', url: 'https://github.com/estelleJoyb/groupix-back.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        sh '''
                            # Charger les variables d'environnement
                            if [ -f .env ]; then
                                source .env
                            fi
                            npm install
                        '''
                    }
                }
            }
        }

        stage('Lint') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        sh '''
                            # Charger les variables d'environnement
                            if [ -f .env ]; then
                                source .env
                            fi
                            npm run lint
                        '''
                    }
                }
            }
        }

        stage('Tests unitaires') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        sh '''
                            # Charger les variables d'environnement
                            if [ -f .env ]; then
                                source .env
                            fi
                            npm run test
                        '''
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        sh '''
                            # Charger les variables d'environnement
                            if [ -f .env ]; then
                                source .env
                            fi
                            npm run build
                        '''
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

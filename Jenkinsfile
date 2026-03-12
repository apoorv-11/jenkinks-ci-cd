pipeline {
    agent any

    environment {
        IMAGE_NAME = "dockerhubuser/docker-compose-app"
        COMMIT_HASH = "${env.GIT_COMMIT}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                bat "docker build -t %IMAGE_NAME%-backend:%COMMIT_HASH% backend"
                bat "docker build -t %IMAGE_NAME%-frontend:%COMMIT_HASH% frontend"
            }
        }

        stage('Security Scan') {
            steps {
                bat "trivy image %IMAGE_NAME%-backend:%COMMIT_HASH%"
            }
        }

        stage('Deploy') {
            steps {
                bat "docker-compose down"
                bat "docker-compose up -d --build"
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}
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
                sh "docker build -t $IMAGE_NAME-backend:$COMMIT_HASH ./backend"
                sh "docker build -t $IMAGE_NAME-frontend:$COMMIT_HASH ./frontend"
            }
        }

        stage('Security Scan') {
            steps {
                sh "trivy image $IMAGE_NAME-backend:$COMMIT_HASH"
            }
        }

        stage('Deploy') {
            steps {
                sh "docker-compose down"
                sh "docker-compose up -d"
            }
        }
    }
}
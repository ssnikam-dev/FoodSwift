pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('DOCKER_HUB_CREDENTIAL')
        VERSION               = "${env.BUILD_ID}"
        IMAGE_NAME            = "sushant2040/user-service"
        GIT_REPO              = "food-delivery-app-org/deployment-folder"
        MANIFEST_FILE         = "aws/user-manifest.yml"
    }

    tools {
        maven 'Maven'
    }

    stages {
        stage('Maven Build & Test') {
            steps {
                sh 'mvn clean verify'
            }
        }

        stage('Docker Build & Push') {
            steps {
                sh '''
                    echo "$DOCKERHUB_CREDENTIALS_PSW" | docker login -u "$DOCKERHUB_CREDENTIALS_USR" --password-stdin
                    docker build -t ${IMAGE_NAME}:${VERSION} .
                    docker push ${IMAGE_NAME}:${VERSION}
                    docker tag ${IMAGE_NAME}:${VERSION} ${IMAGE_NAME}:latest
                    docker push ${IMAGE_NAME}:latest
                '''
            }
        }
    }

    post {
        always { deleteDir() }
        success { echo "Pipeline SUCCEEDED! Deployed ${IMAGE_NAME}:${VERSION}" }
        failure { echo "Pipeline FAILED" }
    }
}
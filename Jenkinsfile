pipeline {
    agent any
    tools {
        jdk 'jdk17'
        nodejs 'node18'
    }
    environment {
        SCANNER_HOME = tool 'sonar-server'
    }
    stages {
        stage('Repo Clone') {
            steps {
                git url: 'https://github.com/roohmeiy/todo-app-nodejs', branch: 'main'
            }
        }

        stage("Sonarqube Analysis") {
            steps {
                withSonarQubeEnv('sonar-server') {
                    sh "${SCANNER_HOME}/bin/sonar-scanner -Dsonar.projectName=todo-app -Dsonar.projectKey=todo-app -X"
                }
            }
        }

        stage("Quality Gate") {
            steps {
                script {
                    waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh "npm install"
            }
        }

        // stage('OWASP FS SCAN') {
        //     steps {
        //         dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'DP-Check'
        //         dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
        //     }
        // }

        stage("Docker Build & Push") {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker', toolName: 'docker') {
                        sh "docker build -t roohmeiy/todo-app-nodejs ."
                        sh "docker tag roohmeiy/todo-app-nodejs:latest"
                        sh "docker push roohmeiy/todo-app-nodejs:latest"
                    }
                }
            }
        }

        stage('Trivy Image Scan') {
            steps {
                script {
                    try {
                        sh 'trivy image roohmeiy/todo-app-nodejs:latest --exit-code 1 --severity HIGH,CRITICAL'
                    } catch (err) {
                        echo "Trivy Image scan found vulnerabilities: ${err}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }

        stage('Update Tag in Helm Chart') {
            steps {
                script {
                    def newTag = env.BUILD_ID
                    sh """
                        sed -i 's/tag: .*/tag: "${newTag}"/' helm/todo-app-chart/values.yaml
                    """
                }
            }
        }

        stage('Commit & Push Changes') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'git-credentials', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
                    sh '''
                        git config --global user.email "roohmeiy@gmail.com"
                        git config --global user.name "Payal Sharma"
                        git add helm/todo-app-chart/values.yaml
                        git commit -m "Update tag in Helm chart" || echo "No changes to commit"
                        git remote set-url origin https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/roohmeiy/todo-app-nodejs.git
                        git push origin main
                    '''
                }
            }
        }
    }
}

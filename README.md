# Node.js Todo App with CI/CD Pipeline

A complete CI/CD implementation for a Node.js Todo application using GitHub Actions, Docker, Helm, and Kubernetes (Kind). The pipeline automates testing, building, and deployment processes with email notifications for success and failure events.

## Prerequisites

- kind cluster
- helm installed
- kubectl installed
- docker installed
  
## 📋 Features

- Automated CI/CD pipeline using GitHub Actions
- Docker containerization
- Kubernetes deployment using Kind cluster
- Helm chart for managing Kubernetes resources
- Automated testing and code quality checks
- Email notifications for deployment status
- Automated Docker image tagging and Helm chart updates

## 🏗️ Architecture

```
GitHub Repository
       ↓
GitHub Actions CI/CD Pipeline
       ↓
Docker Image Build & Push to DockerHub
       ↓
Helm Chart Update
       ↓
Deployment to Kind Cluster
       ↓
Email Notifications
```

## 🚀 CI/CD Pipeline Stages

1. **Sonarqube Stage**
  for code quality check
```bash
docker run -itd --name SonarQube-Server -p 9000:9000 sonarqube:lts-community
```
3. **Build & Push Stage**
   - Docker image build
   - Push to DockerHub registry

4. **Helm Update Stage**
   - Update image tag in Helm chart
   - Commit and push changes

5. **Deployment Stage**
   - Deploy to Kind cluster
   - Health check
   - Port forwarding setup

6. **Notification Stage**
   - Success/Failure email notifications


## 🔑 Required Secrets

Configure these secrets in your GitHub repository:

```
DOCKER_PERSONAL_ACCESS_TOKEN  # DockerHub access token
SONAR_TOKEN
SONAR_HOST_URL
EMAIL_USERNAME              # SMTP email username
EMAIL_PASSWORD              # SMTP email password
NOTIFY_EMAIL               # Notification recipient email
TOKEN                      # GitHub personal access token
```
---

Generate ssh key

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
The command generates:
- Private key: Default location is ~/.ssh/id_rsa.
- Public key: Default location is ~/.ssh/id_rsa.pub.
Copy paste the public key in ~/.ssh/authorized_keys and give appropriate permissions

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

Then add the privare rsa key in secrets in github.

---



## 🔄 Workflow Triggers

The pipeline triggers on:
- Pull requests to main branch
- Push events to main branch

Paths ignored:
- helm/**
- k8s/**
- README.md

## 📦 Deployment

The application automatically deploys when:
- A pull request is merged to main
- Code is pushed directly to main

Manual deployment:
```bash
cd todo-app-nodejs/helm
helm upgrade --install todo-app-nodejs helm/todo-app-chart --namespace todo-app-ns --create-namespace
```

## 🔍 Monitoring

- Check deployment status in GitHub Actions tab
- Monitor pods:
```bash
kubectl get pods -n todo-app-ns
```
- Access logs:
```bash
kubectl logs -f <pod-name> -n todo-app-ns
```

## 💡 Troubleshooting

1. **Pipeline Failures**
   - Check GitHub Actions logs
   - Verify secret configurations
   - Ensure DockerHub credentials are valid

2. **Deployment Issues**
   - Verify Kind cluster is running
   - Check Helm chart values
   - Validate Kubernetes resources

3. **Email Notifications**
   - Verify SMTP configurations
   - Check email credentials
   - Confirm recipient email address


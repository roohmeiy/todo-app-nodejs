# Node.js Todo App with CI/CD Pipeline

A complete CI/CD implementation for a Node.js Todo application using GitHub Actions, Docker, Helm, and Kubernetes (Kind). The pipeline automates testing, building, and deployment processes with email notifications for success and failure events.

## Prerequisites

- kind clsuter
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

1. **Test Stage**
   - Code checkout
   - Node.js setup
   - Dependencies installation
   - Code quality checks (ESLint)
   - Security audit
   - Unit tests execution

2. **Build & Push Stage**
   - Docker image build
   - Push to DockerHub registry

3. **Helm Update Stage**
   - Update image tag in Helm chart
   - Commit and push changes

4. **Deployment Stage**
   - Deploy to Kind cluster
   - Health check
   - Port forwarding setup

5. **Notification Stage**
   - Success/Failure email notifications

## ⚙️ Prerequisites

- Node.js 18.x
- Docker
- Kubernetes Kind cluster
- Helm 3.x
- GitHub account
- DockerHub account

## 🔑 Required Secrets

Configure these secrets in your GitHub repository:

```
DOCKER_PERSONAL_ACCESS_TOKEN  # DockerHub access token
LOCAL_HOST                   # Kind cluster host
LOCAL_USER                   # SSH username
LOCAL_SSH_KEY               # SSH private key
EMAIL_USERNAME              # SMTP email username
EMAIL_PASSWORD              # SMTP email password
NOTIFY_EMAIL               # Notification recipient email
TOKEN                      # GitHub personal access token
```

## 📥 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/todo-app-nodejs.git
cd todo-app-nodejs
```

2. Install dependencies:
```bash
npm install
```

3. Setup Kind cluster:
```bash
kind create cluster --name my-cluster
```

4. Add Helm repository:
```bash
helm repo add todo-app-nodejs ./helm/todo-app-chart
helm repo update
```

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

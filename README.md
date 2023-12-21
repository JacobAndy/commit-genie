# Commit Genie

The Commit Genie is a cron job designed to run in an AWS Lambda environment. Its primary function is to communicate with the GitHub GraphQL API and make daily commits to a specified repository.

## Overview

The Commit Genie automates the process of making daily commits to your GitHub repository. This can be useful for maintaining a consistent commit history, testing workflows, or simply to keep your contribution graph active.

## Features

- **Automated Daily Commits:** The Commit Genie runs as a cron job in an AWS Lambda function, ensuring daily commits to your GitHub repository.
- **GitHub GraphQL API Integration:** Utilizes the GitHub GraphQL API to interact with the repository for seamless commit creation.

## Getting Started

### Prerequisites

1. AWS Lambda: Ensure you have an AWS Lambda environment set up.
2. GitHub Repository: Have a GitHub repository where you want the daily commits to be made.

### Installation

1. Clone this repository.
2. Configure AWS Lambda: Set up the Lambda function with the necessary permissions.
3. Configure GitHub Token: Obtain a GitHub personal access token and set it as an environment variable in your Lambda function.

## Usage

The Commit Genie is configured to run daily. Once deployed in AWS Lambda, it will automatically make commits to your specified GitHub repository every day.

## Contributing

Feel free to contribute by opening issues or submitting pull requests. Your feedback and suggestions are highly appreciated!

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Thanks to GitHub for providing a robust GraphQL API for seamless integration.

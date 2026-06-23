# Integration Platform

A backend workflow orchestration platform designed to connect, automate, and monitor communication between third-party systems.

This project simulates real-world integration and automation scenarios commonly found in enterprise environments, such as CRM synchronization, ERP integrations, webhook-driven workflows, and asynchronous background processing.

Its primary goal is to demonstrate backend engineering practices, distributed system design, authentication and authorization, workflow execution engines, and scalable architecture patterns.

---

## Core Concepts

### Organizations & Multi-Tenancy

The platform is multi-tenant. All resources (workflows, connections, executions) belong to an organization.

Users are associated with organizations through role-based membership:

* OWNER
* ADMIN
* MEMBER

---

### Authentication & Authorization

* JWT-based authentication
* Role-based access control (RBAC)
* Secure password hashing (bcrypt)
* Organization-scoped authorization

---

### Third-Party Systems

Represents external services that can be integrated into workflows.

Examples:

* SaaS APIs (GitHub, Stripe, etc.)
* Databases
* ERP systems
* Social platforms

Each system defines:

* Authentication type (OAuth2, API Key, Basic, None)
* Base URL
* Integration metadata

---

### Connections

A connection represents an authenticated link between an organization and a third-party system.

Features:

* Encrypted credential storage
* OAuth2 / API Key / Basic authentication support
* Optional expiration handling

---

## Workflow Engine

The core of the platform is a workflow execution engine.

### Workflow Structure

A workflow is composed of ordered steps:

Workflow → WorkflowSteps → Execution

Each workflow defines:

* Trigger type (Webhook, Schedule, Manual)
* Trigger configuration (cron, endpoint, etc.)
* Status (DRAFT, ACTIVE, PAUSED)

---

### Workflow Steps

Each step represents a single execution unit:

* API call (external system)
* Transformation step
* Conditional logic step
* Connection to a third-party system
* Retry policies

---

### Execution Model

When a workflow runs:

1. A WorkflowRun is created
2. Steps are executed in order (or future DAG mode)
3. Each step produces an ExecutionStep record
4. Logs are stored in EventLog

---

### Runtime Context

The engine maintains an in-memory execution context to pass data between steps:

* Step outputs are stored by step ID
* Later steps can reference previous outputs
* Enables step chaining and fan-out logic

---

## Execution Architecture

```text
API Request / Trigger
        ↓
   Bull Queue (Redis)
        ↓
   Worker Process
        ↓
Load Workflow + Steps
        ↓
Create WorkflowRun
        ↓
Execute Steps
        ↓
Call External APIs (Axios / HttpService)
        ↓
Store ExecutionStep + Logs
        ↓
Update WorkflowRun status
```

---

## Execution Tracking

### WorkflowRun

Represents a single execution of a workflow.

* status: RUNNING | SUCCESS | FAILED
* timestamps
* workflow reference

### ExecutionStep

Tracks execution of each workflow step:

* input data
* output data
* execution status
* timing information

### EventLog

Stores detailed logs per step execution:

* INFO / WARN / ERROR / DEBUG
* debugging payloads
* error stack traces

---

## Security

* Encrypted credential storage for connections
* Environment-based secrets management
* JWT authentication
* Role-based access control
* Organization-level isolation

---

## Tech Stack

### Backend

* NestJS
* TypeScript
* TypeORM
* PostgreSQL

### Messaging / Workers

* BullMQ
* Redis (Cloud)

### Authentication

* JWT
* bcrypt

---

## Database Design

Main entities:

* Organization
* User
* OrganizationUser
* Workflow
* WorkflowStep
* WorkflowRun
* ExecutionStep
* EventLog
* Connection
* ThirdPartySystem

Relationships follow a multi-tenant workflow execution model.

---

## Current Features

### Implemented

* Multi-tenant organizations
* Authentication & RBAC
* Third-party system registry
* Connection management
* Encrypted credential storage
* Workflow definition system
* Workflow execution engine (sequential)
* Background workers (BullMQ)
* Execution tracking (runs, steps, logs)

### In Progress

* Step-to-step data mapping
* Retry engine improvements
* Error recovery strategies

### Planned

* DAG-based workflow execution
* Webhook triggers
* Scheduled workflows (cron)
* Observability dashboard
* Metrics & monitoring
* Horizontal scaling improvements

---

## Example Workflow Execution

A workflow that syncs a GitHub user into another system:

1. Trigger: Manual execution
2. Step 1: Fetch user from GitHub API
3. Step 2: Transform response
4. Step 3: Send to external ERP system
5. Step 4: Log result

---

## What This Project Demonstrates

* Backend system design
* Workflow orchestration engine design
* Distributed task processing
* Multi-tenant architecture
* Secure credential handling
* API integration patterns
* Scalable backend design
* Event-driven processing

---

## Author

Mateus Mattos

GitHub: https://github.com/MMattoss
LinkedIn: https://linkedin.com/in/mateusmattosbarreto

Backend Engineer focused on distributed systems, integrations, and scalable backend architectures.

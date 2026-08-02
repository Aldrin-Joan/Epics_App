# LexAI

AI-powered legal technology platform built to connect people with legal help, legal resources, and modern digital workflows across mobile, web, and backend services.

It combines a Flutter mobile experience, a React/Vite web workspace, and a FastAPI service layer with hybrid retrieval, WebSockets, and voice-enabled capabilities. The repository is laid out to support product development, experimentation, and future scaling in one place.

## 🚀 Live Deployments

* **Web Application Workspace**: [https://lexai-3fd1a.web.app](https://lexai-3fd1a.web.app) (Deployed via Firebase Hosting, featuring Google Sign-In and real-time legal consultation queries)
* **Production RAG API Backend**: [https://core-api-584212158273.asia-south1.run.app](https://core-api-584212158273.asia-south1.run.app) (FastAPI containerized service running on Google Cloud Run with 4GB RAM to load dense FAISS indices & sentence-transformers under full CORS authorization)

## 👥 Development Team

* **Ayush Agarwal** - **Team Lead & Core AI Developer**
  * **Role:** AI Software Engineer & Full-Stack AI Developer
  * **Contribution:** Designed & developed production-grade AI systems powering LexAI (80%+ core codebase), including Hybrid RAG retrieval pipeline, FastAPI backend, Cloud Run deployment, and AI workflow orchestration.
  * **Links:** [GitHub](https://github.com/Ayush99392003) | [LinkedIn](https://www.linkedin.com/in/ayush20039939) | [Portfolio](https://portfolio-bkco-1u0gliofd-ayush99392003s-projects.vercel.app/) | Email: [ayush20039939@gmail.com](mailto:ayush20039939@gmail.com)

* **Nyasa Singh** - **AI Engineer & NLP Developer**
  * **Role:** AI Engineer & NLP Developer
  * **Contribution:** Artificial Intelligence, NLP, Speech Recognition, Retrieval-Augmented Systems, and Knowledge Graphs for legal technologies.
  * **Links:** [GitHub](https://github.com/Nyasa11) | [LinkedIn](https://www.linkedin.com/in/nyasa-singh-29260a229/) | Email: [nyasasingh11@gmail.com](mailto:nyasasingh11@gmail.com)

* **Vartika Vashishtha** - **Frontend & Flutter Developer**
  * **Role:** Frontend & Flutter Developer
  * **Contribution:** Developed chatbot interface, authentication flows, and client/lawyer dashboards across Flutter mobile app and web.
  * **Links:** [GitHub](https://github.com/Vartika1612) | [LinkedIn](https://www.linkedin.com/in/vartika-vashishtha-721704330/) | Email: [vartikavashishtha48@gmail.com](mailto:vartikavashishtha48@gmail.com)

* **Aldrin Joan Pandian W** - **AI & Multi-Agent Systems Engineer**
  * **Role:** AI & Multi-Agent Systems Engineer
  * **Contribution:** NLP, Machine Learning, Generative AI (LLM fine-tuning), Multi-Agent Systems, LangChain/LangGraph, and full-stack mobile & web integration.
  * **Links:** [GitHub](https://github.com/Aldrin-Joan) | [LinkedIn](http://www.linkedin.com/in/aldrin-joan-pandian-w-08215028a) | Email: [aldrinjoan6@gmail.com](mailto:aldrinjoan6@gmail.com)

* **Anushka Sarviya** - **AI & Backend Developer**
  * **Role:** AI & Backend Developer
  * **Contribution:** Intelligent retrieval-augmented systems, backend APIs, document intelligence solutions, LLM integration, and semantic search.
  * **Links:** [GitHub](https://github.com/AnushkaSarviya) | [LinkedIn](https://www.linkedin.com/in/anushkasarviya/) | Email: [anushkasarviya@gmail.com](mailto:anushkasarviya@gmail.com)

## Why this project stands out

This codebase is more than a demo app. It presents a full-stack product direction with a recruiter-friendly story: a real-world problem space, a multi-platform UI layer, a Python backend, AI-assisted legal interaction, and a research-backed retrieval pipeline.

Highlights:

- Multi-platform client strategy with Flutter for mobile and React/Vite for web experimentation.
- FastAPI backend designed for production-style API delivery, real-time communication, and service orchestration.
- Hybrid legal search layer that combines sparse, dense, and graph-based retrieval ideas.
- Voice-oriented workflows that support transcription and conversational legal assistance.
- Research and documentation folders that show product thinking, evaluation, and technical depth.

## Core product capabilities

The current project direction supports several practical legal-tech workflows:

- AI legal chat for guided legal support, query routing (database search vs. general chat), and question answering with citations.
- Lawyer discovery, real-time peer-to-peer (P2P) WebSocket communication, case status workflows, and interactive advocate-client feeds.
- Document upload and review-oriented interactions.
- Voice capture, Whisper-based transcription, and spoken gTTS feedback pipelines for hands-free input.
- User and lawyer dashboards with localized mobile UX and dynamic data integration.
- Authentication (Firebase token-based auth), auto-provisioning Firestore/SQLite user profile management, notifications, help, and account-related app flows.

## Architecture

The repository is organized as a monorepo so each layer can evolve independently while still fitting into one product vision.

```mermaid
graph TD
    subgraph Clients [Client Layer]
        MobileApp[apps/mobile_app <br> Flutter Mobile]
        WebApp[apps/web_app <br> React/Vite Dashboard]
    end

    subgraph Services [Service Layer]
        FastAPI[services/core_api <br> FastAPI Production API]
        Streamlit[services/core_api <br> Streamlit Research UI]
        HybridSearch[services/core_api/hybrid_search <br> Sparse + Dense + Graph]
    end

    subgraph Research [Research Layer]
        Benchmarks[research/benchmarks]
        Papers[research/research_paper]
    end

    MobileApp -->|HTTP / WebSockets| FastAPI
    WebApp -->|HTTP / WebSockets| FastAPI
    Streamlit -->|Internal Import / REST| HybridSearch
    FastAPI -->|Internal Import| HybridSearch

    HybridSearch -.->|Evaluation Data| Benchmarks
```

### Detailed Pipeline & Message Flows

#### 1. Hybrid Retrieval & Intelligent Query Routing
The RAG pipeline doesn't just run database lookups on every query. It employs an intent-based router to classify queries:
- **Conversational Queries:** Handled directly via a Zero-Shot Generator for fast responses.
- **Ambiguous Queries:** Trigger a Clarification Request back to the client.
- **Search Queries:** Route to the Sparse-Dense-Graph hybrid retrieval engine.

```mermaid
flowchart TD
    UserQuery[User Query / Voice Input] --> Router{Query Router / Intent Classifier}
    
    Router -->|Conversational / General| ZeroShot[Plain Explanation Generator]
    Router -->|Ambiguous Request| Clarify[Clarification Request Prompt]
    Router -->|Case Law Query| Ingestion[Hybrid Retrieval Engine]
    
    subgraph Retrieval [Sparse + Dense + Graph Search]
        Ingestion --> Sparse[BM25 Sparse Keyword Search <br> SQLite FTS5]
        Ingestion --> Dense[Dense Vector Search <br> FAISS + MPNet Embeddings]
        Ingestion --> Graph[Graph Citation Weighting <br> PageRank Algorithm]
    end

    Sparse --> Fusion[Reciprocal Rank Fusion - RRF]
    Dense --> Fusion
    Graph --> Fusion

    Fusion --> Hydrator[Context Hydration <br> Top-5 Cases Persisted in DB]
    Hydrator --> LLM[Google Gemini Synthesis Engine]
    LLM --> Response[Structured Legal opinion with Citations]
    
    ZeroShot --> FinalResponse[Final Response]
    Clarify --> FinalResponse
    Response --> FinalResponse
```

#### 2. Real-Time Peer-to-Peer Chat Flow
Messaging between clients and advocates utilizes token-authenticated WebSockets with a fallback REST API for robustness:

```mermaid
sequenceDiagram
    autonumber
    actor Client as Client App (Web/Mobile)
    participant API as FastAPI Gateway
    participant DB as SQLite (WAL Mode)
    actor Advocate as Advocate Client

    Client->>API: WS Connection to /ws/chat/{uid}?token=...
    API->>API: Cryptographically verify Firebase Token
    API-->>Client: Connection Accepted (Authenticated)
    
    Client->>API: WS Send Message (Receiver UID, Content, Idempotency ID)
    API->>DB: Persist Message (Idempotent check)
    alt Recipient is Online
        API->>Advocate: Push message via WebSocket connection
    else Recipient is Offline
        API-->>Client: Message Persisted (REST Fallback mode ready)
    end
```

---

## ⚡ Core Technical Features & Optimizations

- **SQLite WAL (Write-Ahead Logging) Mode:** Built-in automatic WAL mode configuration on local SQLite databases to handle high-throughput, concurrent reads and writes. This eliminates database locking issues during active peer-to-peer messaging.
- **Cryptographic Security & Verification:** Every WebSocket connection and REST mutation is authenticated using Firebase User Tokens. Cross-user data access (such as chat histories) is prevented using ownership-gated route dependencies (IDOR protection).
- **PageRank-Corrected Retrieval:** Incorporates PageRank centrality weights of Indian Supreme Court case networks to boost landmark rulings, preventing vector retrieval from getting lost in local semantic noise.
- **Seamless Localized Translation & Voice Pipeline:** Converts voice audio from clients (Hindi, Tamil, etc.) using Whisper STT, translates to English for vector search/Gemini synthesis, translates the legal advice back to the client's language, and outputs high-fidelity gTTS audio with smart language fallbacks.


## Repository structure

```text
LexAI/
├── apps/
│   ├── mobile_app/        # Flutter mobile client
│   └── web_app/           # React/Vite web workspace
├── services/
│   └── core_api/          # FastAPI backend, hybrid search, and voice services
├── research/
│   ├── benchmarks/        # Experimental results and evaluation artifacts
│   ├── docs/              # Architecture and deployment documentation
│   ├── research_paper/    # Research-paper style documentation
│   └── wireframes/        # UI/UX drafts and layout exploration
└── README.md
```

## Tech stack

- Flutter for the mobile client.
- React, Vite, and Axios for the web workspace.
- Python, FastAPI, and Streamlit for backend and research interfaces.
- Riverpod, GoRouter, and localization support in the Flutter app.
- WebSockets, voice recording, and audio playback packages for real-time interaction.
- Hybrid search components for retrieval-driven legal assistance.

## Getting started

### Backend

The backend lives in `services/core_api` and is managed with `uv`.

```bash
cd services/core_api
uv sync
uv run app/main.py
```

The API is available at `http://localhost:8001`, with interactive docs at `http://localhost:8001/docs`.

To launch the research UI:

```bash
uv run streamlit run streamlit_app.py
```

### Mobile app

The Flutter client lives in `apps/mobile_app`.

```bash
cd apps/mobile_app
flutter pub get
flutter gen-l10n
flutter run
```

### Web workspace

The web app lives in `apps/web_app`.

```bash
cd apps/web_app
npm install
npm run dev
```

## Testing

Run backend tests from the core API service:

```bash
cd services/core_api
uv run pytest
```

## 🔍 Notes for Reviewers

This repository functions as a full-stack product-and-engineering portfolio. It is designed to demonstrate technical depth, product thinking, and clean systems architecture:

### 🏛️ Engineering & Architecture Depth
- **Monorepo Structure:** Clean division of responsibilities across the Flutter mobile app, React/Vite dashboard, and FastAPI backend layer.
- **Database Concurrency:** Leverages SQLite **Write-Ahead Logging (WAL)** and normal synchronization mode to support high-throughput, concurrent reads and writes for messaging without database locking issues.
- **Production-Ready Deployment:** Containerized backend running on **Google Cloud Run** using a startup streaming utility to dynamically load large search databases from Google Cloud Storage, keeping the Docker image footprint lightweight.

### 🧠 Advanced RAG & AI Orchestration
- **Hybrid Search Engine:** Combines sparse (BM25 FTS5), dense (FAISS with MPNet embeddings), and graph (PageRank citation centrality) modalities using **Reciprocal Rank Fusion (RRF)** to prevent retrieval drift.
- **Intent Classifier Router:** Integrates structured JSON query classification to route traffic between RAG search pipelines, clarification loops, and zero-shot plain explanations.
- **Multilingual Speech Loop:** Merges Whisper Speech-to-Text (STT) and Google Text-to-Speech (gTTS) with automatic language translations (Hindi, Tamil, Spanish, etc.) and fallback routes.

### 🔒 Security & Verification
- **Cryptographic Authentication:** Cryptographically validates Firebase ID user tokens on REST requests and WebSocket handshakes.
- **IDOR Protection Gates:** Route dependencies perform strict verification matching user UIDs with database message/case resource ownership.
- **Integration Testing:** Verified via a comprehensive test suite (`tests/test_security_and_cases.py`) checking state machines, ownership guards, and rate limits.

### 🔬 Academic Rigor
- **Evaluation Benchmarks:** Standardized metrics (Recall@10, NDCG) compiled across a batch of 5,255 baseline case evaluations and 10,000-case noise floor ablation runs.
- **Academic Writing:** Modular draft sections for research paper submissions covering methodology, experimental setups, and critiques.

---
*Developed for the Advanced Agentic Coding initiative.*

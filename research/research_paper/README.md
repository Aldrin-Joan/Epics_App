# 📄 Academic Research Paper: Hybrid Legal Retrieval

This directory contains the modularized research paper for the **Hybrid Legal Retrieval (Sparse + Dense + Graph)** system. The content is structured for submission to an applied NLP or Legal AI workshop (e.g., NLLP, JURIX, or ASAIL).

## 🗂️ Paper Modules

| File Name | Section | Key Highlights |
| :--- | :--- | :--- |
| [`01_abstract.md`](./01_abstract.md) | Abstract | Executive summary of the Hybrid RAG approach and accuracy gains. |
| [`02_introduction.md`](./02_introduction.md) | Introduction | Motivation, problem statement, and goals in the Indian legal tech space. |
| [`02b_related_work.md`](./02b_related_work.md) | Related Work | Analysis of existing legal NLP and general RAG systems. |
| [`03_methodology_overview.md`](./03_methodology_overview.md) | Methodology | Description of the core RRF-Fusion, intent routing, and graph integration. |
| [`04_sparse_retrieval.md`](./04_sparse_retrieval.md) | Sparse Retrieval | BM25 search mechanism details. |
| [`05_dense_retrieval.md`](./05_dense_retrieval.md) | Dense Retrieval | InLegalBERT and MPNet-based FAISS vector indexing. |
| [`06_graph_retrieval.md`](./06_graph_retrieval.md) | Graph Retrieval | PageRank-based landmark citation weighting. |
| [`07_weighted_rrf_fusion.md`](./07_weighted_rrf_fusion.md) | Weighted RRF Fusion | Reciprocal Rank Fusion implementation parameters. |
| [`08_experimental_setup.md`](./08_experimental_setup.md) | Experimental Setup | Description of dataset baseline and hardware details. |
| [`09_results_analysis.md`](./09_results_analysis.md) | Results & Analysis | Performance tables on N=5,255 and latency findings. |
| [`10_conclusion.md`](./10_conclusion.md) | Conclusion | Future research, limits, and concluding insights. |
| [`critique_resolution.md`](./critique_resolution.md) | Audit Report | Auditing Supreme Court jurisdictional bias and corrections. |
| [`FULL_RESEARCH_PAPER.md`](./FULL_RESEARCH_PAPER.md) | Combined Paper | The complete merged markdown version of all sections. |

---

## 🔬 Experimental Setup

Our research used the following parameters:
- **Baseline Dataset**: 5,255 Supreme Court of India precedents.
- **Retriever**: MPNet-based vector search + BM25 keyword matching.
- **Benchmarking Tools**: Normalized Discounted Cumulative Gain (NDCG) and MRR.
- **Ablation Study**: Tested on a 10,000-case noise floor to verify "Graph-Importance Correction".

---

## 🚩 Publication Recommendations

Based on the **Critique Resolution**, it is highly recommended to mention:
1.  **Supreme Court Jurisdictional Bias**: Explicitly state that higher accuracy on landmark cases is partly due to the "Identity-Grounded" nature of Supreme Court precedents.
2.  **Tier 2 Capability**: Positions the system as a Tier 2 tool for "Identity-Grounded" legal analysis rather than a Tier 1 global generalizer.
3.  **Future Scope**: Stratified testing across High Courts and District Courts is essential for Global State-of-the-Art (SOTA) claims.

---

## 🛠️ Usage
To compile the full paper, simply read the files in numerical order or use a markdown compiler (e.g., Pandoc) to merge them for PDF export.

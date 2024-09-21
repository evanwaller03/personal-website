from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from wallergpt import semantic_search, generate_response, df
import pandas as pd

import sys
print(sys.path)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React dev server runs on port 3000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define a request model
class QueryRequest(BaseModel):
    question: str

# Endpoint to handle queries
@app.post("/query/")
async def handle_query(request: QueryRequest):
    question = request.question

    # Perform semantic search to get relevant facts
    try:
        results = semantic_search(question, df)
        context_facts = "\n".join(results['fact'].tolist())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # Generate response
    try:
        answer = generate_response(question, context_facts)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"answer": answer}
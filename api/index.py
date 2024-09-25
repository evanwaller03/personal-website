from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from wallygpt import semantic_search, generate_response, df

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://evanwaller.com", "https://www.evanwaller.com", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    question: str

@app.post("/query/")
async def handle_query(request: Request):
    print("Received request:", request)
    body = await request.json()
    question = body.get('question')

    if not question:
        return JSONResponse({"detail": "Question not provided."}, status_code=400)

    # Perform semantic search and generate response
    try:
        results = semantic_search(question, df)
        context_facts = "\n".join(results['fact'].tolist())
        answer = generate_response(question, context_facts)
    except Exception as e:
        return JSONResponse({"detail": str(e)}, status_code=500)

    return {"answer": answer}

# Add the handler for Vercel
from mangum import Mangum

handler = Mangum(app)

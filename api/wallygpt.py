import json
from openai import OpenAI
import numpy as np
import pandas as pd
import os
from numpy.linalg import norm
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
)

# Load the DataFrame with precomputed embeddings
embeddings_path = os.path.join(os.path.dirname(__file__), 'embeddings.pkl')
df = pd.read_pickle(embeddings_path)

# Function to get embeddings for the user's query
def get_embedding(text, model="text-embedding-ada-002"):
    response = client.embeddings.create(
        input=[text],
        model=model
    )
    embedding = response.data[0].embedding
    return embedding

# Semantic search function
def semantic_search(query, df, top_n=3):
    query_embedding = get_embedding(query)
    df['similarity'] = df['embedding'].apply(
        lambda x: np.dot(x, query_embedding) / (norm(x) * norm(query_embedding))
    )
    results = df.sort_values('similarity', ascending=False).head(top_n)
    return results

# Updated function to generate response using GPT-3.5-turbo or GPT-4
def generate_response(query, context_facts):
    prompt = f"""
You are WallerGPT, an AI assistant that provides accurate information about Evan Waller based on the provided facts.

Facts:
{context_facts}

Question:
{query}

Answer:
"""
    response = client.chat.completions.create(
        model="gpt-4o-2024-08-06",  # You can switch to "gpt-4" if your account supports it
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=250,
        temperature=0.4,
        n=1
    )
    answer = response.choices[0].message.content
    return answer
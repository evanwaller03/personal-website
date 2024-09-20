import json
import openai
import numpy as np
import pandas as pd
from dotenv import load_dotenv
import os

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

with open('/Users/evanwaller/Desktop/GitHub Projects/WallerGPT_09_24/backend/corpus.json', 'r') as f:
    corpus = json.load(f)

df = pd.DataFrame(corpus)

def get_embedding(text, model="text-embedding-ada-002"):
    try:
        response = openai.embeddings.create(
            input=[text],  # The new API expects a list of inputs
            model=model
        )
        # Access the embedding from the response object
        embedding = response.data[0].embedding
        return embedding
    except Exception as e:
        print(f"Error retrieving embedding for text: {text}. Error: {e}")
        return None

# Apply the embedding function to each 'fact' and store the embeddings
df['embedding'] = df['fact'].apply(lambda x: get_embedding(x))

# Save the embeddings to a pickle file
df.to_pickle('embeddings.pkl')
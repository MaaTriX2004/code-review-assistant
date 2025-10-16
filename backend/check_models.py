# check_models.py
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load your API key
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

print("Available models that support 'generateContent':")
print("-" * 50)

# List all available models
for m in genai.list_models():
    # Check if the 'generateContent' method is supported
    if 'generateContent' in m.supported_generation_methods:
        print(f" - {m.name}")

print("-" * 50)
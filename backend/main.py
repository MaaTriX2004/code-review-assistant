import os
import google.generativeai as genai
from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile, Response, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from sqlalchemy.orm import Session
import models
from typing import List
import schemas
from database import SessionLocal, engine

# Create the database tables
models.Base.metadata.create_all(bind=engine)

# Load environment variables from the .env file
load_dotenv()

# Configure the Gemini API key
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("No GOOGLE_API_KEY found. Please add it to your .env file.")
genai.configure(api_key=GOOGLE_API_KEY)

app = FastAPI(
    title="Code Review Assistant",
    description="An API to automatically review code files using the Gemini LLM.",
    version="1.0.0"
)

# Configure CORS to allow the frontend React app to communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, you can restrict this in production
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Dependency to manage database sessions for each request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/review/", response_model=schemas.Review)
async def review_code(db: Session = Depends(get_db), file: UploadFile = File(...)):
    """
    Receives a code file, analyzes it with an LLM, and saves the review report.
    - **Input**: A source code file (e.g., .py, .js, .html).
    - **Output**: A JSON object containing the review report and database record.
    """
    try:
        contents = await file.read()
        code_to_review = contents.decode("utf-8")

        if not code_to_review.strip():
            raise HTTPException(status_code=400, detail="The uploaded file is empty.")

        # Initialize the generative model
        model = genai.GenerativeModel('gemini-pro-latest')

        # This detailed prompt guides the LLM to act as an expert reviewer
        prompt = f"""
        Act as an expert senior software developer and code reviewer.
        Your task is to provide a comprehensive, constructive, and professional code review.
        Review the following code for readability, modularity, maintainability, performance, security vulnerabilities, and potential bugs.
        
        Please structure your response in Markdown format with the following sections:
        - ## Overall Assessment: A brief summary of the code's quality.
        - ## Readability: Comments on naming, formatting, and documentation.
        - ## Modularity & Maintainability: Comments on code structure, separation of concerns, and ease of future changes.
        - ## Potential Bugs or Issues: Identify any logical errors or edge cases that might fail.
        - ## Suggested Refactored Code: Provide a complete, improved version of the code that incorporates your suggestions.

        Code to review:
        ```{file.filename}
        {code_to_review}
        ```
        """
        
        # Generate the review from the model
        response = model.generate_content(prompt)
        review_report = response.text

        # Create a new review record for the database
        db_review = models.Review(filename=file.filename, report=review_report)
        db.add(db_review)
        db.commit()
        db.refresh(db_review)
        
        return db_review

    except Exception as e:
        #  error handler
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

@app.get("/reviews/", response_model=List[schemas.Review])
def get_all_reviews(db: Session = Depends(get_db)):
    """
    Retrieves a list of all past reviews from the database, ordered by most recent.
    This is used by the frontend to populate the history sidebar.
    """
    reviews = db.query(models.Review).order_by(models.Review.created_at.desc()).all()
    return reviews

@app.get("/reviews/{review_id}", response_model=schemas.Review)
def get_review(review_id: int, db: Session = Depends(get_db)):
    """
    Retrieves a single, specific review from the database by its ID.
    """
    db_review = db.query(models.Review).filter(models.Review.id == review_id).first()
    if db_review is None:
        raise HTTPException(status_code=404, detail="Review not found")
    return db_review

@app.delete("/reviews/{review_id}", status_code=204)
def delete_review(review_id: int, db: Session = Depends(get_db)):
    """
    Deletes a specific review from the database.
    """
    db_review = db.query(models.Review).filter(models.Review.id == review_id).first()
    if db_review is None:
        raise HTTPException(status_code=404, detail="Review not found")
    
    db.delete(db_review)
    db.commit()
    
    return Response(status_code=204)

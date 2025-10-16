# schemas.py
from pydantic import BaseModel
from datetime import datetime

class ReviewBase(BaseModel):
    filename: str
    report: str

class ReviewCreate(ReviewBase):
    pass

# schemas.py
class Review(ReviewBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True 
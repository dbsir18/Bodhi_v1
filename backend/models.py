from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid


# Base model with common fields
class BaseDocument(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


# Thoughts - Long form thesis content
class ThoughtCreate(BaseModel):
    title: str
    excerpt: str
    content: str
    cover_image: Optional[str] = None
    tags: List[str] = []


class Thought(BaseDocument):
    title: str
    excerpt: str
    content: str
    cover_image: Optional[str] = None
    tags: List[str] = []


# Learnings - Short form content
class LearningCreate(BaseModel):
    title: str
    content: str
    category: str  # Work, Life, Relationships, Observation


class Learning(BaseDocument):
    title: str
    content: str
    category: str


# Projects
class ProjectCreate(BaseModel):
    title: str
    description: str
    url: str
    company: Optional[str] = None
    tags: List[str] = []


class Project(BaseDocument):
    title: str
    description: str
    url: str
    company: Optional[str] = None
    tags: List[str] = []


# Events
class EventCreate(BaseModel):
    title: str
    date: str
    poster: str
    luma_url: str
    status: str = "upcoming"  # upcoming, past


class Event(BaseDocument):
    title: str
    date: str
    poster: str
    luma_url: str
    status: str = "upcoming"


# Recommendations - Places (Geographic)
class PlaceRecommendationCreate(BaseModel):
    name: str
    description: str
    type: str  # Restaurant, Bar, Cafe, Activity, etc.
    city: str
    country: str
    coordinates: List[float]  # [longitude, latitude]
    url: Optional[str] = None


class PlaceRecommendation(BaseDocument):
    name: str
    description: str
    type: str
    city: str
    country: str
    coordinates: List[float]
    url: Optional[str] = None


# Recommendations - People
class PersonRecommendationCreate(BaseModel):
    name: str
    expertise: str  # e.g., "Fitness", "Travel Advisory"
    description: str
    profile_url: str
    avatar_url: Optional[str] = None


class PersonRecommendation(BaseDocument):
    name: str
    expertise: str
    description: str
    profile_url: str
    avatar_url: Optional[str] = None


# Recommendations - Products & Apps
class ProductRecommendationCreate(BaseModel):
    name: str
    description: str
    category: str  # App, Product, Tool
    url: Optional[str] = None
    image_url: Optional[str] = None


class ProductRecommendation(BaseDocument):
    name: str
    description: str
    category: str
    url: Optional[str] = None
    image_url: Optional[str] = None

from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List
from datetime import datetime

from models import (
    Thought, ThoughtCreate,
    Learning, LearningCreate,
    Project, ProjectCreate,
    Event, EventCreate,
    PlaceRecommendation, PlaceRecommendationCreate,
    PersonRecommendation, PersonRecommendationCreate,
    ProductRecommendation, ProductRecommendationCreate
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'portfolio')]

# Create the main app
app = FastAPI(title="Dhruv Bhargava Portfolio API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# ============ THOUGHTS ============
@api_router.get("/thoughts", response_model=List[Thought])
async def get_thoughts():
    thoughts = await db.thoughts.find().sort("created_at", -1).to_list(100)
    return [Thought(**t) for t in thoughts]


@api_router.get("/thoughts/{thought_id}", response_model=Thought)
async def get_thought(thought_id: str):
    thought = await db.thoughts.find_one({"id": thought_id})
    if not thought:
        raise HTTPException(status_code=404, detail="Thought not found")
    return Thought(**thought)


@api_router.post("/thoughts", response_model=Thought)
async def create_thought(thought: ThoughtCreate):
    thought_obj = Thought(**thought.dict())
    await db.thoughts.insert_one(thought_obj.dict())
    return thought_obj


@api_router.put("/thoughts/{thought_id}", response_model=Thought)
async def update_thought(thought_id: str, thought: ThoughtCreate):
    existing = await db.thoughts.find_one({"id": thought_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Thought not found")
    
    update_data = thought.dict()
    update_data["updated_at"] = datetime.utcnow()
    await db.thoughts.update_one({"id": thought_id}, {"$set": update_data})
    
    updated = await db.thoughts.find_one({"id": thought_id})
    return Thought(**updated)


@api_router.delete("/thoughts/{thought_id}")
async def delete_thought(thought_id: str):
    result = await db.thoughts.delete_one({"id": thought_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Thought not found")
    return {"message": "Thought deleted"}


# ============ LEARNINGS ============
@api_router.get("/learnings", response_model=List[Learning])
async def get_learnings():
    learnings = await db.learnings.find().sort("created_at", -1).to_list(100)
    return [Learning(**l) for l in learnings]


@api_router.post("/learnings", response_model=Learning)
async def create_learning(learning: LearningCreate):
    learning_obj = Learning(**learning.dict())
    await db.learnings.insert_one(learning_obj.dict())
    return learning_obj


@api_router.put("/learnings/{learning_id}", response_model=Learning)
async def update_learning(learning_id: str, learning: LearningCreate):
    existing = await db.learnings.find_one({"id": learning_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Learning not found")
    
    update_data = learning.dict()
    update_data["updated_at"] = datetime.utcnow()
    await db.learnings.update_one({"id": learning_id}, {"$set": update_data})
    
    updated = await db.learnings.find_one({"id": learning_id})
    return Learning(**updated)


@api_router.delete("/learnings/{learning_id}")
async def delete_learning(learning_id: str):
    result = await db.learnings.delete_one({"id": learning_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Learning not found")
    return {"message": "Learning deleted"}


# ============ PROJECTS ============
@api_router.get("/projects", response_model=List[Project])
async def get_projects():
    projects = await db.projects.find().sort("created_at", -1).to_list(100)
    return [Project(**p) for p in projects]


@api_router.post("/projects", response_model=Project)
async def create_project(project: ProjectCreate):
    project_obj = Project(**project.dict())
    await db.projects.insert_one(project_obj.dict())
    return project_obj


@api_router.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, project: ProjectCreate):
    existing = await db.projects.find_one({"id": project_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Project not found")
    
    update_data = project.dict()
    update_data["updated_at"] = datetime.utcnow()
    await db.projects.update_one({"id": project_id}, {"$set": update_data})
    
    updated = await db.projects.find_one({"id": project_id})
    return Project(**updated)


@api_router.delete("/projects/{project_id}")
async def delete_project(project_id: str):
    result = await db.projects.delete_one({"id": project_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted"}


# ============ EVENTS ============
@api_router.get("/events", response_model=List[Event])
async def get_events():
    events = await db.events.find().sort("created_at", -1).to_list(100)
    return [Event(**e) for e in events]


@api_router.post("/events", response_model=Event)
async def create_event(event: EventCreate):
    event_obj = Event(**event.dict())
    await db.events.insert_one(event_obj.dict())
    return event_obj


@api_router.put("/events/{event_id}", response_model=Event)
async def update_event(event_id: str, event: EventCreate):
    existing = await db.events.find_one({"id": event_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Event not found")
    
    update_data = event.dict()
    update_data["updated_at"] = datetime.utcnow()
    await db.events.update_one({"id": event_id}, {"$set": update_data})
    
    updated = await db.events.find_one({"id": event_id})
    return Event(**updated)


@api_router.delete("/events/{event_id}")
async def delete_event(event_id: str):
    result = await db.events.delete_one({"id": event_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted"}


# ============ PLACE RECOMMENDATIONS ============
@api_router.get("/recommendations/places", response_model=List[PlaceRecommendation])
async def get_place_recommendations():
    places = await db.place_recommendations.find().to_list(100)
    return [PlaceRecommendation(**p) for p in places]


@api_router.post("/recommendations/places", response_model=PlaceRecommendation)
async def create_place_recommendation(place: PlaceRecommendationCreate):
    place_obj = PlaceRecommendation(**place.dict())
    await db.place_recommendations.insert_one(place_obj.dict())
    return place_obj


@api_router.put("/recommendations/places/{place_id}", response_model=PlaceRecommendation)
async def update_place_recommendation(place_id: str, place: PlaceRecommendationCreate):
    existing = await db.place_recommendations.find_one({"id": place_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Place not found")
    
    update_data = place.dict()
    update_data["updated_at"] = datetime.utcnow()
    await db.place_recommendations.update_one({"id": place_id}, {"$set": update_data})
    
    updated = await db.place_recommendations.find_one({"id": place_id})
    return PlaceRecommendation(**updated)


@api_router.delete("/recommendations/places/{place_id}")
async def delete_place_recommendation(place_id: str):
    result = await db.place_recommendations.delete_one({"id": place_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Place not found")
    return {"message": "Place deleted"}


# ============ PEOPLE RECOMMENDATIONS ============
@api_router.get("/recommendations/people", response_model=List[PersonRecommendation])
async def get_person_recommendations():
    people = await db.person_recommendations.find().to_list(100)
    return [PersonRecommendation(**p) for p in people]


@api_router.post("/recommendations/people", response_model=PersonRecommendation)
async def create_person_recommendation(person: PersonRecommendationCreate):
    person_obj = PersonRecommendation(**person.dict())
    await db.person_recommendations.insert_one(person_obj.dict())
    return person_obj


@api_router.put("/recommendations/people/{person_id}", response_model=PersonRecommendation)
async def update_person_recommendation(person_id: str, person: PersonRecommendationCreate):
    existing = await db.person_recommendations.find_one({"id": person_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Person not found")
    
    update_data = person.dict()
    update_data["updated_at"] = datetime.utcnow()
    await db.person_recommendations.update_one({"id": person_id}, {"$set": update_data})
    
    updated = await db.person_recommendations.find_one({"id": person_id})
    return PersonRecommendation(**updated)


@api_router.delete("/recommendations/people/{person_id}")
async def delete_person_recommendation(person_id: str):
    result = await db.person_recommendations.delete_one({"id": person_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Person not found")
    return {"message": "Person deleted"}


# ============ PRODUCT RECOMMENDATIONS ============
@api_router.get("/recommendations/products", response_model=List[ProductRecommendation])
async def get_product_recommendations():
    products = await db.product_recommendations.find().to_list(100)
    return [ProductRecommendation(**p) for p in products]


@api_router.post("/recommendations/products", response_model=ProductRecommendation)
async def create_product_recommendation(product: ProductRecommendationCreate):
    product_obj = ProductRecommendation(**product.dict())
    await db.product_recommendations.insert_one(product_obj.dict())
    return product_obj


@api_router.put("/recommendations/products/{product_id}", response_model=ProductRecommendation)
async def update_product_recommendation(product_id: str, product: ProductRecommendationCreate):
    existing = await db.product_recommendations.find_one({"id": product_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = product.dict()
    update_data["updated_at"] = datetime.utcnow()
    await db.product_recommendations.update_one({"id": product_id}, {"$set": update_data})
    
    updated = await db.product_recommendations.find_one({"id": product_id})
    return ProductRecommendation(**updated)


@api_router.delete("/recommendations/products/{product_id}")
async def delete_product_recommendation(product_id: str):
    result = await db.product_recommendations.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted"}


# ============ HEALTH CHECK ============
@api_router.get("/")
async def root():
    return {"message": "Dhruv Bhargava Portfolio API", "status": "healthy"}


# Include the router
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

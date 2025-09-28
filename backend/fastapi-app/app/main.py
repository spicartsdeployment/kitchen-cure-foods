from fastapi import FastAPI
from app.routers import users, products
from app.core.logger import logger
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FastAPI Async Boilerplate with JWT & Roles")

# Allow requests from your frontend
origins = [
    "http://localhost:5173",  # Vite dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(users.router)
app.include_router(products.router)

@app.get("/")
async def root():
    logger.info("FastAPI application has started")
    return {"message": "FastAPI Async Boilerplate Running 🚀"}

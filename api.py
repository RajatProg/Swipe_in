from datetime import datetime, timedelta
from typing import Optional, List
import os
import hashlib
import uvicorn
import jwt
from fastapi import FastAPI, HTTPException, Depends, status, Security
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials
from jwt import PyJWTError, decode
from sqlalchemy.orm import Session
from database import engine, SessionLocal
from models import (
    User,
    Base,
    Menu,
    Transactions,
    Dining_Menu,
    Swipes,
)
from pydantic import BaseModel


SECRET_KEY = os.environ.get("SECRET_KEY", "default_secret_key")
ALGORITHM = "HS256"


app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------- Pydantic Models --------------------
class UserBase(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: str
    password: str
    role: str

class UserResponseModel(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class TransactionModel(BaseModel):
    username: str
    transaction_date: datetime
    transaction_mode: str
    transaction_id: str
    is_successful: bool
    Location: str
    Total_Amount: float
    MNumber: str
    first_name: str

class PaymentRequest(BaseModel):
    mnumber: str
    method: str
    total: Optional[float] = None

class Config:
    orm_mode = True
    json_encoders = {datetime: lambda dt: dt.isoformat()}


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)

@app.post("/register/", response_model=UserResponseModel, status_code=status.HTTP_201_CREATED)
async def create_user(user: UserBase, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    hashed_password = hashlib.sha256(user.password.encode('utf-8')).hexdigest()
    new_user = User(
        username=user.username,
        first_name=user.first_name,
        last_name=user.last_name,
        role=user.role,
        email=user.email,
        password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@app.post("/login/")
async def login(user_creds: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == user_creds.username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )

    hashed_input = hashlib.sha256(user_creds.password.encode('utf-8')).hexdigest()
    if hashed_input != user.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )

    access_token = create_access_token(
        data={"username": user.username, "role": user.role},
        expires_delta=timedelta(minutes=30)
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "firstname": user.first_name,
        "username": user.username,
        "role": user.role
    }

async def get_current_user(credentials: HTTPAuthorizationCredentials = Security(...)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        token = credentials.credentials
        payload = decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("username")
        role: str = payload.get("role")
        if username is None or role is None:
            raise credentials_exception
    except PyJWTError as e:
        raise credentials_exception from e
    return {"username": username, "role": role}

@app.get("/CFA_Menu/")
def read_menu(db: Session = Depends(get_db)):
    cfa_menu = db.query(Menu).all()
    if not cfa_menu:
        return JSONResponse(
            content={"message": "No items found"}, 
            status_code=404
        )
    else:
        return [
            {
                "menu_id": item.menu_id,
                "item_title": item.item_title,
                "item_description": item.item_description,
                "calories": item.calories,
                "price": item.price,
                "category_id": item.category_id
            }
            for item in cfa_menu
        ]

@app.get("/Dinig_Menu/")
def read_menu(db: Session = Depends(get_db)):
    dinig_menu = db.query(Dining_Menu).all()
    if not dinig_menu:
        return JSONResponse(
            content={"message": "No items found"}, 
            status_code=404
        )
    else:
        return [
            {
                "menu_id": items.menu_id,
                "item_title": items.item_title,
                "item_detail": items.item_detail,
                "portion": items.portion,
                "diet": items.diet,
                "date": items.date,
                "calories": items.calories,
                "main_category": (
                    items.dining_category.dining_categories_main.main_category_name
                ),
                "subcategory": items.dining_category.category_name,
            }
            for items in dinig_menu
        ]

@app.post("/payments/")
async def process_payment(payment: PaymentRequest, db: Session = Depends(get_db)):
    swipe = db.query(Swipes).filter(Swipes.username == payment.mnumber).first()
    
    if not swipe:
        raise HTTPException(status_code=404, detail="Swipes record not found for this MNumber.")

    # Process payment based on method
    if payment.method == "Meal Swipes":
        if swipe.meal_swipes_left < 1:
            raise HTTPException(status_code=400, detail="No meal swipes left.")
        swipe.meal_swipes_left -= 1

    elif payment.method == "Flex Dollars":
        if payment.total is None:
            raise HTTPException(status_code=400, detail="No total amount specified.")
        if swipe.flex_dollars_left < payment.total:
            raise HTTPException(status_code=400, detail="Insufficient flex dollars.")
        swipe.flex_dollars_left -= payment.total

    else:
        raise HTTPException(

            status_code=400, 
            detail="Unsupported payment method for this endpoint."
        )

    db.commit()
    db.refresh(swipe)
    return {
        "method": payment.method,
        "meal_swipes_left": swipe.meal_swipes_left,
        "flex_dollars_left": swipe.flex_dollars_left,
    }

@app.get("/swipe/{username}")
async def get_swipe(username: str, db: Session = Depends(get_db)):
    swipe = db.query(Swipes).filter(Swipes.username == username).first()
    if not swipe:
        raise HTTPException(status_code=404, detail="Swipe record not found.")
    return {
        "username": swipe.username,
        "meal_swipes_left": swipe.meal_swipes_left,
        "flex_dollars_left": swipe.flex_dollars_left,
    }



@app.post("/transaction/", response_model=TransactionModel)
async def create_transaction(transaction: TransactionModel, db: Session = Depends(get_db)):
    transaction_datetime = transaction.transaction_date

    # If hour & minute are zero, replace them with current time 
    if transaction_datetime.hour == 0 and transaction_datetime.minute == 0:
        now = datetime.now()
        transaction_datetime = transaction_datetime.replace(
            hour=now.hour, minute=now.minute, second=now.second
        )

    new_transaction = Transactions(
        username=transaction.username,
        transaction_date=transaction_datetime,
        transaction_mode=transaction.transaction_mode,
        transaction_id=transaction.transaction_id,
        is_successful=transaction.is_successful,
        Location=transaction.Location,
        Total_Amount=transaction.Total_Amount,
        MNumber=transaction.MNumber,
        first_name=transaction.first_name
    )
    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)
    return new_transaction


@app.get("/users/")
def read_users(db: Session = Depends(get_db)):
    users = db.query(User).filter(User.role != "ADMIN").all()
    return users    
    

@app.delete("/users/{username}")
def delete_user(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": f"User {username} deleted successfully"}


@app.put("/users/{username}", response_model=UserResponseModel)
def update_user(username: str, updated_user: UserBase, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.first_name = updated_user.first_name
    user.last_name = updated_user.last_name
    user.email = updated_user.email
    user.role = updated_user.role
    # user.password = hashlib.sha256(updated_user.password.encode('utf-8')).hexdigest()

    db.commit()
    db.refresh(user)
    return user




if __name__ == "__main__":
    uvicorn.run(
        "api:app",
        host="127.0.0.1",
        port=8081,
        reload=True
    )

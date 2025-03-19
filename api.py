from datetime import datetime, timedelta
from fastapi import security
import jwt
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uvicorn
from database import engine, SessionLocal
from pydantic import BaseModel
import hashlib
from models import User, Base , Menu, Transactions
from typing import Optional
from fastapi import FastAPI, HTTPException, Depends, status, Security
from fastapi.security import HTTPAuthorizationCredentials
from jwt import PyJWTError, decode
import os


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
    MNumber : str

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
    # This function will create all tables on application startup.
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
        role= user.role,
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
        data={
            "username": user.username,
            "role": user.role
        },
        expires_delta=timedelta(minutes=30)
    )
   
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "firstname": user.first_name,
        "username": user.username,
        "role": user.role
    }

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Security(security)
):
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
        return JSONResponse(content={"message" : "No items found"}, status_code= 404)
    else :
        return [
            {
                "menu_id": item.menu_id,
                "item_title": item.item_title,
                "item_description": item.item_description,
                "calories": item.calories,
                "price": item.price,
                "category_id" : item.category_id
            }
            for item in cfa_menu  ]
    



@app.post("/transaction/", response_model=TransactionModel)
async def create_transaction(transaction: TransactionModel, db: Session = Depends(get_db)):
    transaction_datetime = transaction.transaction_date

    # Ensure transaction_date contains time (if only date was sent)
    if transaction_datetime.hour == 0 and transaction_datetime.minute == 0:
        transaction_datetime = transaction_datetime.replace(hour=datetime.now().hour, minute=datetime.now().minute, second=datetime.now().second)

    new_transaction = Transactions(
        username=transaction.username,
        transaction_date=transaction.transaction_date,
        transaction_mode=transaction.transaction_mode,
        transaction_id=transaction.transaction_id,
        is_successful=transaction.is_successful,
        Location=transaction.Location,
        Total_Amount=transaction.Total_Amount,
        MNumber=transaction.MNumber 
    )
    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)
    return new_transaction

if __name__ == "__main__":
    uvicorn.run(
        "api:app",
        host="127.0.0.1",  
        port=8081,
        reload=True
    )

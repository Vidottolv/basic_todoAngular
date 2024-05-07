from fastapi import FastAPI, Form
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="admin",
    database="mydb"
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
async def main():
    return {"message": "Hello World"}

@app.get("/get_tasks")
def get_tasks():
    cursor=conn.cursor(dictionary=True)
    cursor.execute("Select * from todo")
    records=cursor.fetchall()
    return records

@app.post("/add_task")
def add_task(task: str=Form(...)):
    cursor=conn.cursor()
    cursor.execute("insert into todo (task) values (%s)",(task,))
    conn.commit()
    return "Added Succesfully"

@app.post("/del_task")
def del_task(id: str=Form(...)):
    cursor=conn.cursor()
    cursor.execute("delete from todo where id=%s",(id,))
    conn.commit()
    return "Deleted Succesfully"

@app.get("/get_users")
def get_users():
    cursor=conn.cursor(dictionary=True)
    cursor.execute("Select * from TBLUsers")
    records=cursor.fetchall()
    return records

@app.post("/add_user")
def add_user(name: str=Form(...), email: str=Form(...), password: str=Form(...)):
    cursor=conn.cursor()
    cursor.execute("INSERT INTO TBLUSERS (Name, Email, Password) VALUES (%s,%s,%s)", (name, email, password))
    conn.commit()
    return "Added Succesfully"

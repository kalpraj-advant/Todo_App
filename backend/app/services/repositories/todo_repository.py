from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.todo import Todo

def read_todos(db: Session, user_id: int):
    return db.query(Todo).filter(Todo.user_id == user_id).all()

def create_todo(title: str, description: str, completed: bool, db: Session, user_id: int):
    todo = Todo(
        title=title,
        description=description,
        completed=completed,
        user_id=user_id
    )
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo

def update_todo(id: int, title: str, description: str, completed: bool, db: Session, user_id: int):
    todo = db.query(Todo).filter(
        Todo.id == id,
        Todo.user_id == user_id
    ).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    if title is not None:
        todo.title = title
    if description is not None:
        todo.description = description
    if completed is not None:
        todo.completed = completed
    
    db.commit()
    db.refresh(todo)
    return todo

def delete_todo(id: int, db: Session, user_id: int):
    todo = db.query(Todo).filter(
        Todo.id == id,
        Todo.user_id == user_id
    ).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    db.delete(todo)
    db.commit()
    return {"message": "Todo deleted successfully"}
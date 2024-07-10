from pydantic import BaseModel
from typing import List

class ObjectSchema(BaseModel):
    name: str
    description: str
    samples: List[str]

class ObjectResponseSchema(BaseModel):
    status: str
    data: ObjectSchema
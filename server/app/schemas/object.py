from pydantic import BaseModel, Field
from typing import List

class ObjectSchema(BaseModel):
    id: str = Field(..., alias='_id')
    name: str
    description: str
    samples: List[str]

class ObjectResponseSchema(BaseModel):
    status: str
    data: ObjectSchema

class ObjectListResponseSchema(BaseModel):
    status: str
    data: List[ObjectSchema]